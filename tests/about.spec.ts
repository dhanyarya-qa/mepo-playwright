import { test, expect } from './fixtures';

test.describe('About Page - Text Content Validation', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/about');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1500);
  });

  test('should load the About page successfully', async ({ page }) => {
    await expect(page).toHaveURL(/\/about/);
    await expect(page).toHaveTitle(/Mepo/i);
  });

  // ==========================================
  // Headings
  // ==========================================
  test('should display "Tentang" or "About" heading', async ({ page }) => {
    // Both h4 "Tentang"/"About" heading
    await expect(page.getByText(/^Tentang$|^About$/i).first()).toBeVisible();
  });

  test('should display "Mepo Indonesia" heading', async ({ page }) => {
    await expect(page.getByText('Mepo Indonesia').first()).toBeVisible();
  });

  test('should display "Visi Kami" or "Our Vision" heading', async ({ page }) => {
    await expect(page.getByText(/Visi Kami|Our Vision/i).first()).toBeVisible();
  });

  test('should display "Misi Kami" or "Our Mission" heading', async ({ page }) => {
    await page.evaluate(() => window.scrollBy(0, 400));
    await page.waitForTimeout(500);
    await expect(page.getByText(/Misi Kami|Our Mission/i).first()).toBeVisible();
  });

  // ==========================================
  // Mission Items (EN and ID variants)
  // ==========================================
  test('should display mission: Empowering Exploration / Memberdayakan Eksplorasi', async ({ page }) => {
    await page.evaluate(() => window.scrollBy(0, 500));
    await page.waitForTimeout(500);
    await expect(page.getByText(/Memberdayakan Eksplorasi|Empowering Exploration/i).first()).toBeVisible();
  });

  test('should display mission: Curating Inspiring Content / Mengkurasi Konten', async ({ page }) => {
    await page.evaluate(() => window.scrollBy(0, 500));
    await page.waitForTimeout(500);
    await expect(page.getByText(/Mengkurasi Konten|Curating Inspiring Content/i).first()).toBeVisible();
  });

  test('should display mission: Facilitating Authentic Connections / Memfasilitasi Koneksi', async ({ page }) => {
    await page.evaluate(() => window.scrollBy(0, 600));
    await page.waitForTimeout(500);
    await expect(page.getByText(/Memfasilitasi Koneksi|Facilitating Authentic Connections/i).first()).toBeVisible();
  });

  test('should display mission: Enabling Sustainable Travel / Mendukung Perjalanan Berkelanjutan', async ({ page }) => {
    await page.evaluate(() => window.scrollBy(0, 600));
    await page.waitForTimeout(500);
    await expect(page.getByText(/Mendukung Perjalanan Berkelanjutan|Enabling Sustainable Travel/i).first()).toBeVisible();
  });

  test('should display mission: Promoting Cultural Exchange / Mendorong Pertukaran Budaya', async ({ page }) => {
    await page.evaluate(() => window.scrollBy(0, 700));
    await page.waitForTimeout(500);
    await expect(page.getByText(/Mendorong Pertukaran Budaya|Promoting Cultural Exchange/i).first()).toBeVisible();
  });

  test('should display mission: Embracing Innovation / Mengedepankan Inovasi', async ({ page }) => {
    await page.evaluate(() => window.scrollBy(0, 700));
    await page.waitForTimeout(500);
    await expect(page.getByText(/Mengedepankan Inovasi|Embracing Innovation/i).first()).toBeVisible();
  });

  // ==========================================
  // Navbar on About page
  // ==========================================
  test('should maintain navbar on About page', async ({ page }) => {
    const nav = page.getByRole('navigation');
    await expect(nav).toBeVisible();
    await expect(nav.getByRole('link', { name: /Tentang Mepo|Our Story|About/i })).toBeVisible();
  });

  // ==========================================
  // Footer on About page
  // ==========================================
  test('should display footer on About page', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });
});
