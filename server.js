const express = require('express');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Store active test process
let activeProcess = null;
let testHistory = [];

// Serve static files
app.use(express.static(path.join(__dirname)));
app.use(express.json());

// Available test suites mapped to npm scripts
const TEST_SUITES = {
  'test': 'Full Suite (Chromium)',
  'test:smoke': 'Smoke Tests (Critical Flows)',
  'test:a11y': 'Accessibility Tests',
  'test:visual': 'Visual Regression Tests',
  'test:api': 'API Monitoring Tests',
  'test:critical': 'Critical Tests (@critical)',
  'test:chrome': 'Chrome Browser',
  'test:firefox': 'Firefox Browser',
  'test:webkit': 'WebKit Browser',
  'test:all-browsers': 'All Browsers',
  'test:devices': 'Device Emulation',
  'test:regression': 'Regression Suite',
};

// GET /api/suites - List available test suites
app.get('/api/suites', (req, res) => {
  res.json(TEST_SUITES);
});

// GET /api/status - Check if tests are running
app.get('/api/status', (req, res) => {
  res.json({
    running: activeProcess !== null,
    history: testHistory.slice(-20),
  });
});

// POST /api/run - Run a test suite
app.post('/api/run', (req, res) => {
  const { suite } = req.body || {};

  if (!suite || !TEST_SUITES[suite]) {
    return res.status(400).json({ error: `Unknown test suite: ${suite || '(empty)'}` });
  }

  if (activeProcess) {
    return res.status(409).json({ error: 'A test is already running. Stop it first.' });
  }

  // Set up SSE headers for streaming
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');

  const startTime = Date.now();
  const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';

  let child;
  try {
    child = spawn(npmCmd, ['run', suite], {
      cwd: __dirname,
      env: { ...process.env, FORCE_COLOR: '0' },
      shell: true,
    });
  } catch (spawnErr) {
    res.status(500).json({ error: `Failed to spawn process: ${spawnErr.message}` });
    return;
  }

  activeProcess = child;

  const sendEvent = (type, data) => {
    if (!res.writableEnded) {
      res.write(`event: ${type}\ndata: ${JSON.stringify(data)}\n\n`);
    }
  };

  sendEvent('started', {
    suite,
    label: TEST_SUITES[suite],
    startTime: new Date().toISOString(),
  });

  child.stdout.on('data', (chunk) => {
    const lines = chunk.toString().split('\n').filter(l => l.trim());
    lines.forEach(line => {
      sendEvent('log', { line, stream: 'stdout', timestamp: new Date().toISOString() });
    });
  });

  child.stderr.on('data', (chunk) => {
    const lines = chunk.toString().split('\n').filter(l => l.trim());
    lines.forEach(line => {
      sendEvent('log', { line, stream: 'stderr', timestamp: new Date().toISOString() });
    });
  });

  child.on('close', (code) => {
    const duration = ((Date.now() - startTime) / 1000).toFixed(1);
    const result = {
      suite,
      label: TEST_SUITES[suite],
      exitCode: code,
      duration,
      timestamp: new Date().toISOString(),
    };

    testHistory.push(result);
    activeProcess = null;

    sendEvent('finished', result);

    // Try to parse playwright-report for detailed results
    parsePlaywrightResults().then(details => {
      if (details) {
        sendEvent('results', details);
      }
      if (!res.writableEnded) res.end();
    });
  });

  child.on('error', (err) => {
    sendEvent('error', { message: err.message });
    activeProcess = null;
    if (!res.writableEnded) res.end();
  });

  req.on('close', () => {
    // Client disconnected — let the process finish but stop sending
  });
});

// POST /api/stop - Kill active test
app.post('/api/stop', (req, res) => {
  if (activeProcess) {
    activeProcess.kill('SIGTERM');
    activeProcess = null;
    res.json({ message: 'Test process terminated.' });
  } else {
    res.status(404).json({ error: 'No active test process.' });
  }
});

// GET /api/results - Get latest playwright report data
app.get('/api/results', async (req, res) => {
  const details = await parsePlaywrightResults();
  res.json(details || { error: 'No results available yet.' });
});

// GET /api/screenshots - List failure screenshots
app.get('/api/screenshots', (req, res) => {
  const testResultsDir = path.join(__dirname, 'test-results');
  const screenshots = [];

  function findScreenshots(dir) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        findScreenshots(fullPath);
      } else if (entry.name.endsWith('.png') || entry.name.endsWith('.jpg')) {
        const relative = path.relative(__dirname, fullPath);
        screenshots.push({
          name: entry.name,
          path: '/' + relative.replace(/\\/g, '/'),
          dir: path.basename(path.dirname(fullPath)),
        });
      }
    }
  }

  findScreenshots(testResultsDir);
  res.json(screenshots);
});

// Serve test-results screenshots
app.use('/test-results', express.static(path.join(__dirname, 'test-results')));

// Parse playwright HTML report for test results
async function parsePlaywrightResults() {
  const reportDir = path.join(__dirname, 'playwright-report', 'data');
  if (!fs.existsSync(reportDir)) return null;

  try {
    const files = fs.readdirSync(reportDir).filter(f => f.endsWith('.json'));
    let allTests = [];

    for (const file of files) {
      const content = fs.readFileSync(path.join(reportDir, file), 'utf-8');
      try {
        const data = JSON.parse(content);
        if (data && data.suites) {
          extractTests(data.suites, allTests);
        }
      } catch { /* skip non-test json files */ }
    }

    const passed = allTests.filter(t => t.status === 'expected' || t.status === 'flaky').length;
    const failed = allTests.filter(t => t.status === 'unexpected').length;
    const skipped = allTests.filter(t => t.status === 'skipped').length;
    const totalDuration = allTests.reduce((sum, t) => sum + (t.duration || 0), 0);

    const failures = allTests
      .filter(t => t.status === 'unexpected')
      .map(t => ({
        title: t.title,
        file: t.file || '',
        error: t.error || 'Test failed',
        duration: t.duration || 0,
      }));

    return {
      total: allTests.length,
      passed,
      failed,
      skipped,
      duration: (totalDuration / 1000).toFixed(1),
      tests: allTests.map(t => ({
        title: t.title,
        status: t.status,
        duration: t.duration,
        file: t.file,
      })),
      failures,
    };
  } catch {
    return null;
  }
}

function extractTests(suites, results) {
  for (const suite of suites) {
    if (suite.specs) {
      for (const spec of suite.specs) {
        for (const test of (spec.tests || [])) {
          const lastResult = test.results?.[test.results.length - 1];
          results.push({
            title: spec.title,
            file: suite.file || spec.file || '',
            status: test.status,
            duration: lastResult?.duration || 0,
            error: lastResult?.error?.message || lastResult?.error?.stack || '',
          });
        }
      }
    }
    if (suite.suites) {
      extractTests(suite.suites, results);
    }
  }
}

// Global error handler
app.use((err, req, res, next) => {
  console.error('[Server Error]', err.message);
  if (!res.headersSent) {
    res.status(500).json({ error: 'Internal server error: ' + err.message });
  }
});

app.listen(PORT, () => {
  console.log(`\n🐛 Bug Hunter AI Dashboard`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`  Server: http://localhost:${PORT}`);
  console.log(`  Open the URL above in your browser.\n`);
});
