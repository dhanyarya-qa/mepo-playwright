import { test, expect } from './fixtures';

/**
 * Article Detail Page Tests
 * 
 * Tests that click into each article from the Activities page,
 * verify the article detail content, then navigate back.
 * 
 * Run with: npx playwright test tests/article-detail.spec.ts --project=chromium
 */

// All known articles on the Activities page
const articles = [
  {
    slug: 'itinerary-hidden-gem-indonesia',
    title: 'Itinerary Hidden Gem Indonesia',
  },
  {
    slug: 'itinerary-liburan-keluarga-singkat-2-hari',
    title: 'Itinerary Liburan Keluarga Singkat 2 Hari',
  },
  {
    slug: 'itinerary-solo-travel-indonesia-untuk-pemula',
    title: 'Itinerary Solo Travel Indonesia',
  },
  {
    slug: 'itinerary-backpacker-petualangan-alam-indonesia',
    title: 'Itinerary Backpacker Petualangan Alam Indonesia',
  },
  {
    slug: 'itinerary-wisata-alam-berkelanjutan-indonesia',
    title: 'Itinerary Wisata Alam Berkelanjutan Indonesia',
  },
  {
    slug: 'itinerary-wisata-wellness-indonesia',
    title: 'Itinerary Wisata Wellness Indonesia',
  },
  {
    slug: 'itinerary-workation-indonesia-terbaik',
    title: 'Itinerary Workation Indonesia',
  },
  {
    slug: 'itinerary-slow-travel-indonesia',
    title: 'Itinerary Slow Travel Indonesia',
  },
  {
    slug: 'cara-membuat-itinerary-liburan-biar-nggak-berantakan',
    title: 'Cara Membuat Itinerary Liburan',
  },
  {
    slug: 'itinerary-jogja-3-hari-2-malam-biar-liburan-nggak-capek',
    title: 'Itinerary Jogja 3 Hari 2 Malam',
  },
  {
    slug: 'desa-wisata-berkelanjutan-indonesia-liburan-bermakna-yang-ramah-lingkungan',
    title: 'Desa Wisata Berkelanjutan Indonesia',
  },
  {
    slug: 'tips-travel-hemat-indonesia-2026',
    title: 'Tips Travel Hemat Indonesia 2026',
  },
  {
    slug: 'itinerary-bali-3-hari-2-malam-untuk-liburan-keluarga',
    title: 'Itinerary Bali 3 Hari 2 Malam',
  },
  {
    slug: 'innova-community-rayakan-hut-ke19-di-yogyakarta-dengan-kopdar-akbar-jawa-2025',
    title: 'Innova Community Rayakan HUT ke-19',
  },
  {
    slug: 'itinerary-lombok-5-hari-4-malam-pantai-gili-rinjani',
    title: 'Itinerary Lombok 5 Hari 4 Malam',
  },
  {
    slug: 'itinerary-labuan-bajo-4-hari-3-malam-komodo-laut-flores',
    title: 'Itinerary Labuan Bajo 4 Hari 3 Malam',
  },
  {
    slug: 'itinerary-bali-3-hari-2-malam-untuk-pasangan',
    title: 'Itinerary Bali 3 Hari 2 Malam untuk Pasangan',
  },
  {
    slug: '15-weekend-getaway-dekat-jakarta-2026',
    title: '15 Weekend Getaway Dekat Jakarta 2026',
  },
  {
    slug: 'bleisure-travel-indonesia-2026-gabungkan-perjalanan-bisnis-dan-wisata',
    title: 'Bleisure Travel Indonesia 2026',
  },
  {
    slug: 'wisata-kuliner-nusantara-10-kota-makanan-terenak-indonesia-2026',
    title: 'Wisata Kuliner Nusantara',
  },
];

test.describe('Article Detail Pages - Click & Verify Content', () => {

  // ==========================================
  // Individual Article Detail Tests
  // ==========================================
  for (const article of articles) {
    test.describe(`Article: ${article.title}`, () => {

      test(`should load article detail page`, async ({ page }) => {
        await page.goto(`/activities/${article.slug}`, { timeout: 60000 });
        await page.waitForLoadState('domcontentloaded');
        await expect(page).toHaveURL(new RegExp(article.slug));
        await expect(page).toHaveTitle(/Mepo/i);
      });

      test(`should display article heading`, async ({ page }) => {
        await page.goto(`/activities/${article.slug}`, { timeout: 60000 });
        await page.waitForLoadState('domcontentloaded');

        // Article title should be visible as a heading
        const titleRegex = new RegExp(article.title.split(' ').slice(0, 3).join('.*'), 'i');
        await expect(page.getByText(titleRegex).first()).toBeVisible();
      });

      test(`should display article body content`, async ({ page }) => {
        await page.goto(`/activities/${article.slug}`, { timeout: 60000 });
        await page.waitForLoadState('domcontentloaded');

        // Article should have substantial body text (paragraphs)
        const paragraphs = page.locator('p');
        const count = await paragraphs.count();
        expect(count).toBeGreaterThan(0);
      });

      test(`should display images`, async ({ page }) => {
        await page.goto(`/activities/${article.slug}`, { timeout: 60000 });
        await page.waitForLoadState('domcontentloaded');

        const images = page.locator('img');
        const count = await images.count();
        expect(count).toBeGreaterThan(0);
      });

      test(`should maintain navbar`, async ({ page }) => {
        await page.goto(`/activities/${article.slug}`, { timeout: 60000 });
        await page.waitForLoadState('domcontentloaded');

        // Use .first() because article pages have 2 nav elements (main nav + breadcrumb)
        const nav = page.getByRole('navigation').first();
        await expect(nav).toBeVisible();
      });
    });
  }

  // ==========================================
  // Navigate from Activities → Article → Back
  // ==========================================
  test.describe('Navigation Flow', () => {

    test('should click Innova Community article from Activities page and navigate back', async ({ page }) => {
      await page.goto('/activities');
      await page.waitForLoadState('domcontentloaded');

      // Click the Innova Community article
      const articleLink = page.locator('a[href*="innova-community"]').first();
      await expect(articleLink).toBeVisible();
      await articleLink.click();
      await page.waitForLoadState('domcontentloaded');

      // Verify article detail page loaded
      await expect(page).toHaveURL(/innova-community/);
      await expect(page.getByText(/Innova Community Rayakan HUT ke-19/i).first()).toBeVisible();

      // Navigate back to Activities page
      await page.getByRole('navigation').first().getByRole('link', { name: /Aktivitas|Explore/i }).click();
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(/\/activities/);
      await expect(page.getByText(/Aktivitas Kami|Our Activities/i).first()).toBeVisible();
    });

    test('should click Itinerary Bali article from Activities page and navigate back', async ({ page }) => {
      await page.goto('/activities');
      await page.waitForLoadState('domcontentloaded');

      // Click the Itinerary Bali article
      const articleLink = page.locator('a[href*="itinerary-bali"]').first();
      await expect(articleLink).toBeVisible();
      await articleLink.click();
      await page.waitForLoadState('domcontentloaded');

      // Verify article detail page loaded
      await expect(page).toHaveURL(/itinerary-bali/);
      await expect(page.getByText(/Itinerary Bali 3 Hari 2 Malam/i).first()).toBeVisible();

      // Navigate back to Activities page
      await page.getByRole('navigation').first().getByRole('link', { name: /Aktivitas|Explore/i }).click();
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(/\/activities/);
    });

    test('should navigate through articles and return to homepage', async ({ page }) => {
      // Start at Activities page
      await page.goto('/activities');
      await page.waitForLoadState('domcontentloaded');

      // Click first article (Innova Community)
      const firstArticle = page.locator('a[href*="innova-community"]').first();
      if (await firstArticle.isVisible()) {
        await firstArticle.click();
        await page.waitForLoadState('domcontentloaded');
        await expect(page).toHaveURL(/innova-community/);
        await expect(page.getByText(/Innova Community/i).first()).toBeVisible();
      }

      // Navigate back to Activities
      await page.getByRole('navigation').first().getByRole('link', { name: /Aktivitas|Explore/i }).click();
      await page.waitForLoadState('domcontentloaded');

      // Click second article (Itinerary Bali)
      const secondArticle = page.locator('a[href*="itinerary-bali"]').first();
      if (await secondArticle.isVisible()) {
        await secondArticle.click();
        await page.waitForLoadState('domcontentloaded');
        await expect(page).toHaveURL(/itinerary-bali/);
        await expect(page.getByText(/Itinerary Bali/i).first()).toBeVisible();
      }

      // Navigate to Homepage to complete the flow
      await page.getByRole('navigation').first().getByRole('link', { name: /Beranda|Home/i }).click();
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(/\/$/);
      await expect(page.getByText(/Every Journey Starts Here|Semua Perjalanan Bisa Dimulai/i).first()).toBeVisible();
    });
  });

  // ==========================================
  // Article Content Structure Validation
  // ==========================================
  test.describe('Content Structure', () => {

    test('all article pages should have consistent structure', async ({ page }) => {
      // Sample 3 articles to verify consistent structure
      const sampleSlugs = [
        'innova-community-rayakan-hut-ke19-di-yogyakarta-dengan-kopdar-akbar-jawa-2025',
        'itinerary-bali-3-hari-2-malam-untuk-liburan-keluarga',
        'cara-membuat-itinerary-liburan-biar-nggak-berantakan',
      ];

      for (const slug of sampleSlugs) {
        await page.goto(`/activities/${slug}`, { timeout: 60000 });
        await page.waitForLoadState('domcontentloaded');

        // Should have navbar (first nav = main navbar)
        await expect(page.getByRole('navigation').first()).toBeVisible();

        // Should have at least 1 image
        const images = page.locator('img');
        expect(await images.count()).toBeGreaterThan(0);

        // Should have body paragraphs
        const paragraphs = page.locator('p');
        expect(await paragraphs.count()).toBeGreaterThan(0);

        // Should have footer
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.waitForTimeout(500);
        await expect(page.locator('footer')).toBeVisible();
      }
    });

    test('article pages should not have server errors', async ({ page }) => {
      const serverErrors: string[] = [];

      page.on('response', (response) => {
        if (response.status() >= 500) {
          serverErrors.push(`${response.status()} - ${response.url()}`);
        }
      });

      // Test a sample of article pages
      const sampleSlugs = [
        'itinerary-hidden-gem-indonesia',
        'itinerary-jogja-3-hari-2-malam-biar-liburan-nggak-capek',
        'desa-wisata-berkelanjutan-indonesia-liburan-bermakna-yang-ramah-lingkungan',
      ];

      for (const slug of sampleSlugs) {
        await page.goto(`/activities/${slug}`, { timeout: 60000 });
        await page.waitForLoadState('domcontentloaded');
      }

      expect(serverErrors, `Server errors found: ${serverErrors.join(', ')}`).toHaveLength(0);
    });
  });

  // ==========================================
  // Full E2E Flow: Activities → Article → Homepage
  // ==========================================
  test('E2E: visit Activities page, click article, return to homepage', async ({ page }) => {
    // 1. Go to Activities page
    await page.goto('/activities');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.getByText(/Aktivitas Kami|Our Activities/i).first()).toBeVisible();

    // 2. Verify at least 2 article cards exist
    await page.evaluate(() => window.scrollBy(0, 400));
    await page.waitForTimeout(500);
    const articleLinks = page.locator('a[href*="/activities/"]');
    const count = await articleLinks.count();
    expect(count).toBeGreaterThanOrEqual(2);

    // 3. Click first article
    await articleLinks.first().click();
    await page.waitForLoadState('domcontentloaded');

    // 4. Verify article detail loaded (has images, body, navbar)
    const images = page.locator('img');
    expect(await images.count()).toBeGreaterThan(0);
    const paragraphs = page.locator('p');
    expect(await paragraphs.count()).toBeGreaterThan(0);
    await expect(page.getByRole('navigation').first()).toBeVisible();

    // 5. Navigate back to Homepage
    await page.getByRole('navigation').first().getByRole('link', { name: /Beranda|Home/i }).click();
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByText(/Every Journey Starts Here|Semua Perjalanan Bisa Dimulai/i).first()).toBeVisible();
  });
});
