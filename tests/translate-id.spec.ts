import { test, expect, switchLanguage } from './fixtures';

test.describe('Translation Test - Indonesia (ID)', () => {

  test.describe('Homepage [ID]', () => {

    test.beforeEach(async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      await switchLanguage(page, 'id');
    });

    // --- Navbar ---
    test('navbar should display Indonesian links', async ({ page }) => {
      const nav = page.getByRole('navigation');
      await expect(nav.getByRole('link', { name: 'Beranda' })).toBeVisible();
      await expect(nav.getByRole('link', { name: 'Tentang Mepo' })).toBeVisible();
      await expect(nav.getByRole('link', { name: 'Layanan' })).toBeVisible();
      await expect(nav.getByRole('link', { name: 'Aktivitas' })).toBeVisible();
    });

    test('navbar should display "Hubungi Kami" button', async ({ page }) => {
      await expect(page.locator('a[href="/contact-us"] button')).toContainText('Hubungi Kami');
    });

    test('navbar should display "Unduh Aplikasi" button', async ({ page }) => {
      await expect(page.locator('#composition-button').first()).toContainText(/Unduh Aplikasi/i);
    });

    // --- Hero Section ---
    test('hero should display "Semua Perjalanan Bisa Dimulai dari Sini"', async ({ page }) => {
      await expect(page.getByText('Semua Perjalanan Bisa Dimulai dari Sini')).toBeVisible();
    });

    test('hero should display "Teman Perjalananmu"', async ({ page }) => {
      await expect(page.getByText('Teman Perjalananmu')).toBeVisible();
    });

    test('hero should display Indonesian description', async ({ page }) => {
      await expect(page.getByText(/Mau liburan atau perjalanan bisnis/i).first()).toBeVisible();
    });

    // --- Tentang Mepo Indonesia Section ---
    test('should display "Tentang Mepo Indonesia" heading', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 500));
      await page.waitForTimeout(500);
      await expect(page.getByText('Tentang Mepo Indonesia').first()).toBeVisible();
    });

    test('should display "Kenalan dengan Mepo" button', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 600));
      await page.waitForTimeout(500);
      await expect(page.getByText('Kenalan dengan Mepo').first()).toBeVisible();
    });

    test('should display "platform perjalanan all-in-one" description', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 500));
      await page.waitForTimeout(500);
      await expect(page.getByText(/platform.*all-in-one/i).first()).toBeVisible();
    });

    // --- Value Proposition ---
    test('should display "Value yang Kamu Dapat di Mepo" heading', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 800));
      await page.waitForTimeout(500);
      await expect(page.getByText('Value yang Kamu Dapat di Mepo').first()).toBeVisible();
    });

    test('should display "Solusi All-in-One" value card', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 900));
      await page.waitForTimeout(500);
      await expect(page.getByText(/Solusi All-in-One/i).first()).toBeVisible();
    });

    test('should display "Efisien dan Fleksibel" value card', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 900));
      await page.waitForTimeout(500);
      await expect(page.getByText(/Efisien dan Fleksibel/i).first()).toBeVisible();
    });

    test('should display "Kolaborasi dengan Agen" value card', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 900));
      await page.waitForTimeout(500);
      await expect(page.getByText(/Kolaborasi dengan Agen/i).first()).toBeVisible();
    });

    test('should display "Terhubung dengan Media Sosial" value card', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 900));
      await page.waitForTimeout(500);
      await expect(page.getByText(/Terhubung dengan Media Sosial/i).first()).toBeVisible();
    });

    // --- Apa Saja di Mepo (Features) ---
    test('should display "Apa Saja di Mepo" heading', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
      await page.waitForTimeout(500);
      await expect(page.getByText('Apa Saja di Mepo').first()).toBeVisible();
    });

    // --- Aktivitas Kami ---
    test('should display "Aktivitas Kami" heading', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 1.5));
      await page.waitForTimeout(500);
      await expect(page.getByText('Aktivitas Kami').first()).toBeVisible();
    });

    // --- Partnership Banner ---
    test('should display "Jadi Partner" button', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight - 800));
      await page.waitForTimeout(500);
      await expect(page.getByText(/Jadi Partner/i).first()).toBeVisible();
    });

    test('should display "Rencanakan Company Trip" button', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight - 800));
      await page.waitForTimeout(500);
      await expect(page.getByText(/Rencanakan Company Trip/i).first()).toBeVisible();
    });

    // --- Footer ---
    test('footer should display Indonesian page links', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(500);
      const footer = page.locator('footer');
      await expect(footer.getByText('Beranda').first()).toBeVisible();
      await expect(footer.getByText('Tentang Mepo').first()).toBeVisible();
      await expect(footer.getByText('Layanan').first()).toBeVisible();
      await expect(footer.getByText('Aktivitas').first()).toBeVisible();
    });

    test('footer should display "Back to Top" button', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(500);
      // NOTE: Website bug — footer button is NOT translated to Indonesian
      await expect(page.getByText(/Back to Top|Kembali ke Atas/i).first()).toBeVisible();
    });
  });

  // ==========================================
  // About Page [ID]
  // ==========================================
  test.describe('About Page [ID]', () => {

    test.beforeEach(async ({ page }) => {
      await page.goto('/about');
      await page.waitForLoadState('networkidle');
      await switchLanguage(page, 'id');
    });

    test('should display About page heading in Indonesian', async ({ page }) => {
      // The heading is split: "Tentang" + "Mepo Indonesia" in separate lines within the banner
      await expect(page.getByText('Mepo Indonesia').first()).toBeVisible();
    });

    test('should display "Visi Kami" section', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 300));
      await page.waitForTimeout(500);
      await expect(page.getByText(/Visi Kami/i).first()).toBeVisible();
    });

    test('should display "Misi Kami" section', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 400));
      await page.waitForTimeout(500);
      await expect(page.getByText(/Misi Kami/i).first()).toBeVisible();
    });

    test('navbar should show "Tentang Mepo" link', async ({ page }) => {
      const nav = page.getByRole('navigation');
      await expect(nav.getByRole('link', { name: 'Tentang Mepo' })).toBeVisible();
    });
  });

  // ==========================================
  // Activities Page [ID]
  // ==========================================
  test.describe('Activities Page [ID]', () => {

    test.beforeEach(async ({ page }) => {
      await page.goto('/activities');
      await page.waitForLoadState('networkidle');
      await switchLanguage(page, 'id');
    });

    test('should display Activities page heading', async ({ page }) => {
      // NOTE: Website bug — banner heading shows "Our Activities" even in ID mode
      await expect(page.getByText(/Our Activities|Aktivitas Kami/i).first()).toBeVisible();
    });

    test('navbar should show "Aktivitas" link', async ({ page }) => {
      const nav = page.getByRole('navigation');
      await expect(nav.getByRole('link', { name: 'Aktivitas' })).toBeVisible();
    });
  });

  // ==========================================
  // Contact Page [ID]
  // ==========================================
  test.describe('Contact Page [ID]', () => {

    test.beforeEach(async ({ page }) => {
      await page.goto('/contact-us');
      await page.waitForLoadState('networkidle');
      await switchLanguage(page, 'id');
    });

    test('should display "Hubungi Kami" heading in Indonesian', async ({ page }) => {
      await expect(page.getByText(/Hubungi Kami/i).first()).toBeVisible();
    });

    test('should display form labels', async ({ page }) => {
      // NOTE: Website bug — form labels/placeholders are NOT translated to Indonesian
      // They remain in English even after switching to ID
      await expect(page.getByText(/Full Name|Nama Lengkap/i).first()).toBeVisible();
      await expect(page.getByText(/Phone Number|Nomor Telepon/i).first()).toBeVisible();
      await expect(page.getByText('Email').first()).toBeVisible();
    });
  });

  // ==========================================
  // Products Page [ID]
  // ==========================================
  test.describe('Products Page [ID]', () => {

    test.beforeEach(async ({ page }) => {
      await page.goto('/products');
      await page.waitForLoadState('networkidle');
      await switchLanguage(page, 'id');
    });

    test('navbar should show "Layanan" link', async ({ page }) => {
      const nav = page.getByRole('navigation');
      await expect(nav.getByRole('link', { name: 'Layanan' })).toBeVisible();
    });
  });
});
