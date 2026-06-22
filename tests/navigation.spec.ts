import { test, expect } from './fixtures';

test.describe('Navigation - dev.mepo.travel', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1500);
  });

  test('should navigate to Home page', async ({ page }) => {
    await page.getByRole('navigation').getByRole('link', { name: /^Home$|^Beranda$/i }).click();
    await expect(page).toHaveURL(/\/$/);
  });

  test('should navigate to About page', async ({ page }) => {
    await page.getByRole('navigation').getByRole('link', { name: /Our Story|Tentang Mepo|About/i }).click();
    await expect(page).toHaveURL(/\/about/);

    const heading = page.getByText(/about|tentang/i).first();
    await expect(heading).toBeVisible();
  });

  test('should navigate to Products page', async ({ page }) => {
    await page.getByRole('navigation').getByRole('link', { name: /^Services$|^Layanan$|^Products$/i }).click();
    await expect(page).toHaveURL(/\/products/);

    const heading = page.getByText(/services|products|layanan/i).first();
    await expect(heading).toBeVisible();
  });

  test('should navigate to Activities page', async ({ page }) => {
    await page.getByRole('navigation').getByRole('link', { name: /^Explore$|^Aktivitas$|^Activities$/i }).click();
    await expect(page).toHaveURL(/\/activities/);

    const heading = page.getByText(/activities|aktivitas|explore/i).first();
    await expect(heading).toBeVisible();
  });

  test('should navigate to Contact Us page via nav button', async ({ page }) => {
    await page.locator('a[href="/contact-us"] button').click();
    await expect(page).toHaveURL(/\/contact-us/);
  });

  test('should navigate back to Home from About page', async ({ page }) => {
    await page.goto('/about');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1500);

    await page.getByRole('navigation').getByRole('link', { name: /^Home$|^Beranda$/i }).click();
    await expect(page).toHaveURL(/\/$/);
  });

  test('should navigate between all pages sequentially', async ({ page }) => {
    const pages: { name: RegExp; path: string }[] = [
      { name: /Our Story|Tentang Mepo|About/i, path: '/about' },
      { name: /^Services$|^Layanan$|^Products$/i, path: '/products' },
      { name: /^Explore$|^Aktivitas$|^Activities$/i, path: '/activities' },
    ];

    for (const p of pages) {
      await page.getByRole('navigation').getByRole('link', { name: p.name }).click();
      await expect(page).toHaveURL(new RegExp(p.path));
      await page.waitForLoadState('networkidle');
    }
  });

  test('should keep navbar visible on all pages', async ({ page }) => {
    const paths: string[] = ['/', '/about', '/products', '/activities', '/contact-us'];

    for (const path of paths) {
      await page.goto(path);
      const navbar = page.locator('a[href="/"] img').first();
      await expect(navbar).toBeVisible();
    }
  });

  test('should navigate to Home by clicking Mepo logo', async ({ page }) => {
    await page.goto('/about');
    await page.waitForLoadState('networkidle');

    const logo = page.locator('a[href="/"] img').first();
    await logo.click();
    await page.waitForLoadState('domcontentloaded');

    await expect(page).toHaveURL(/\/(#.*)?$/);
  });
});
