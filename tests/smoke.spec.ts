import { test, expect } from './fixtures';

/**
 * Smoke Test Suite @smoke
 * 
 * Quick sanity checks for the most critical flows.
 * Run with: npm run test:smoke
 */
test.describe('Smoke Tests @smoke @critical', () => {

  test('all pages should load successfully', async ({ page }) => {
    const pages = ['/', '/about', '/products', '/activities', '/contact-us'];

    for (const path of pages) {
      const response = await page.goto(path);
      expect(response?.status()).toBeLessThan(400);
      await expect(page).toHaveTitle(/Mepo/i);
    }
  });

  test('navbar should be functional', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1500);

    // Logo visible
    await expect(page.locator('a[href="/"] img').first()).toBeVisible();

    // Nav links visible (EN: Home, Our Story, Services, Explore / ID: Beranda, Tentang Mepo, Layanan, Aktivitas)
    const nav = page.getByRole('navigation');
    await expect(nav.getByRole('link', { name: /^Home$|^Beranda$/i })).toBeVisible();
    await expect(nav.getByRole('link', { name: /Our Story|Tentang Mepo|About/i })).toBeVisible();
    await expect(nav.getByRole('link', { name: /^Services$|^Layanan$|^Products$/i })).toBeVisible();
    await expect(nav.getByRole('link', { name: /^Explore$|^Aktivitas$|^Activities$/i })).toBeVisible();

    // Contact Us button
    await expect(page.locator('a[href="/contact-us"] button')).toBeVisible();

    // Download button
    await expect(page.locator('#composition-button').first()).toBeVisible();
  });

  test('navigation should work between all pages', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1500);

    // Navigate to About
    await page.getByRole('navigation').getByRole('link', { name: /Our Story|Tentang Mepo|About/i }).click();
    await expect(page).toHaveURL(/\/about/);

    // Navigate to Products
    await page.getByRole('navigation').getByRole('link', { name: /^Services$|^Layanan$|^Products$/i }).click();
    await expect(page).toHaveURL(/\/products/);

    // Navigate to Activities
    await page.getByRole('navigation').getByRole('link', { name: /^Explore$|^Aktivitas$|^Activities$/i }).click();
    await expect(page).toHaveURL(/\/activities/);

    // Navigate to Contact Us
    await page.locator('a[href="/contact-us"] button').click();
    await expect(page).toHaveURL(/\/contact-us/);

    // Navigate back to Home
    await page.getByRole('navigation').getByRole('link', { name: /^Home$|^Beranda$/i }).click();
    await expect(page).toHaveURL(/\/$/);
  });

  test('contact form should be submittable with valid data', async ({ page }) => {
    await page.goto('/contact-us');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1500);

    // Fill form with valid data (support both EN and ID placeholders)
    const nameInput = page.locator('input[placeholder*="name"], input[placeholder*="nama"], input[placeholder*="Name"], input[placeholder*="Nama"]').first();
    const phoneInput = page.locator('input[placeholder*="phone"], input[placeholder*="telepon"], input[placeholder*="Phone"], input[placeholder*="HP"]').first();
    const emailInput = page.locator('input[placeholder*="email"], input[placeholder*="Email"]').first();
    const messageInput = page.locator('input[placeholder*="message"], input[placeholder*="pesan"], input[placeholder*="Message"], input[placeholder*="Pesan"]').first();

    await nameInput.fill('Smoke Test User');
    await phoneInput.fill('081234567890');
    await emailInput.fill('smoke@test.com');
    await messageInput.fill('Automated smoke test.');

    // Submit
    const submitBtn = page.locator('button[type="submit"], button:has-text("Submit"), button:has-text("Kirim")').first();
    await expect(submitBtn).toBeVisible();
    await submitBtn.click();
    await page.waitForTimeout(1500);
  });

  test('hero section should be visible on homepage', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1500);

    // EN: "Every Journey Starts Here" / ID: "Semua Perjalanan Bisa Dimulai dari Sini"
    await expect(page.getByText(/Every Journey Starts Here|Semua Perjalanan Bisa Dimulai/i).first()).toBeVisible();
    // EN: "Your Travel Companion" / ID: "Teman Perjalananmu"
    await expect(page.getByText(/Your Travel Companion|Teman Perjalananmu/i).first()).toBeVisible();
  });

  test('footer should be visible and contain key info', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    await expect(footer.getByText('social@mepo.travel')).toBeVisible();
  });
});
