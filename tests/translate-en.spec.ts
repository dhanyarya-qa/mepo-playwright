import { test, expect, switchLanguage } from './fixtures';

test.describe('Translation Test - English (EN)', () => {

  test.describe('Homepage [EN]', () => {

    test.beforeEach(async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      await switchLanguage(page, 'en');
    });

    // --- Navbar ---
    test('navbar should display English links', async ({ page }) => {
      const nav = page.getByRole('navigation');
      await expect(nav.getByRole('link', { name: 'Home' })).toBeVisible();
      await expect(nav.getByRole('link', { name: 'Our Story' })).toBeVisible();
      await expect(nav.getByRole('link', { name: 'Services' })).toBeVisible();
      await expect(nav.getByRole('link', { name: 'Explore' })).toBeVisible();
    });

    test('navbar should display "Get In Touch" button', async ({ page }) => {
      await expect(page.locator('a[href="/contact-us"] button')).toContainText('Get in Touch');
    });

    test('navbar should display "Get The App" button', async ({ page }) => {
      await expect(page.locator('#composition-button').first()).toContainText(/Get the App/i);
    });

    // --- Hero Section ---
    test('hero should display "Every Journey Starts Here"', async ({ page }) => {
      await expect(page.getByText('Every Journey Starts Here')).toBeVisible();
    });

    test('hero should display "Your Travel Companion"', async ({ page }) => {
      await expect(page.getByText('Your Travel Companion')).toBeVisible();
    });

    test('hero should display English description', async ({ page }) => {
      await expect(page.getByText(/Whether it.*holiday or a business trip/i).first()).toBeVisible();
    });

    // --- About Mepo Indonesia Section ---
    test('should display "About Mepo Indonesia" heading', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 500));
      await page.waitForTimeout(500);
      await expect(page.getByText('About Mepo Indonesia').first()).toBeVisible();
    });

    test('should display "Learn More About Mepo" button', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 600));
      await page.waitForTimeout(500);
      await expect(page.getByText('Learn More About Mepo').first()).toBeVisible();
    });

    test('should display "all-in-one travel platform" description', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 500));
      await page.waitForTimeout(500);
      await expect(page.getByText(/all-in-one travel platform/i).first()).toBeVisible();
    });

    // --- Value Proposition ---
    test('should display "The Value You Get with Mepo" heading', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 800));
      await page.waitForTimeout(500);
      await expect(page.getByText('The Value You Get with Mepo').first()).toBeVisible();
    });

    test('should display "All-in-One" value card', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 900));
      await page.waitForTimeout(500);
      await expect(page.getByText(/All-in-One/i).first()).toBeVisible();
    });

    test('should display "Efficient and Flexible" value card', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 900));
      await page.waitForTimeout(500);
      await expect(page.getByText(/Efficient and Flexible/i).first()).toBeVisible();
    });

    // --- Core Features / What's Inside ---
    test('should display "Mepo Core Features" heading', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
      await page.waitForTimeout(500);
      await expect(page.getByText('Mepo Core Features').first()).toBeVisible();
    });

    test('should display "Itinerary Planning" feature', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
      await page.waitForTimeout(500);
      await expect(page.getByText('Itinerary Planning').first()).toBeVisible();
    });

    test('should display "Activity Creation" feature', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
      await page.waitForTimeout(500);
      await expect(page.getByText('Activity Creation').first()).toBeVisible();
    });

    test('should display "Invite and Join" feature', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
      await page.waitForTimeout(500);
      await expect(page.getByText('Invite and Join').first()).toBeVisible();
    });

    test('should display "Itinerary Recommendations" feature', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
      await page.waitForTimeout(500);
      await expect(page.getByText('Itinerary Recommendations').first()).toBeVisible();
    });

    // --- Our Activities ---
    test('should display "Our Activities" heading', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 1.5));
      await page.waitForTimeout(500);
      await expect(page.getByText('Our Activities').first()).toBeVisible();
    });

    // --- Partnership Banner ---
    test('should display "Become a Partner" button', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight - 800));
      await page.waitForTimeout(500);
      await expect(page.getByText('Become a Partner').first()).toBeVisible();
    });

    test('should display "Plan a Corporate Outing" button', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight - 800));
      await page.waitForTimeout(500);
      await expect(page.getByText(/Plan a Corporate Outing/i).first()).toBeVisible();
    });

    // --- Footer ---
    test('footer should display English page links', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(500);
      const footer = page.locator('footer');
      await expect(footer.getByText('Home').first()).toBeVisible();
      await expect(footer.getByText('Our Story').first()).toBeVisible();
      await expect(footer.getByText('Services').first()).toBeVisible();
      await expect(footer.getByText('Explore').first()).toBeVisible();
    });

    test('footer should display "Back to Top" button', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(500);
      await expect(page.getByText('Back to Top').first()).toBeVisible();
    });
  });

  // ==========================================
  // About Page [EN]
  // ==========================================
  test.describe('About Page [EN]', () => {

    test.beforeEach(async ({ page }) => {
      await page.goto('/about');
      await page.waitForLoadState('networkidle');
      await switchLanguage(page, 'en');
    });

    test('should display About page heading in English', async ({ page }) => {
      // The heading is split: "About" + "Mepo Indonesia" in separate lines within the banner
      await expect(page.getByText('Mepo Indonesia').first()).toBeVisible();
    });

    test('should display "Our Vision" section', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 300));
      await page.waitForTimeout(500);
      await expect(page.getByText(/Our Vision/i).first()).toBeVisible();
    });

    test('should display "Our Mission" section', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 400));
      await page.waitForTimeout(500);
      await expect(page.getByText(/Our Mission/i).first()).toBeVisible();
    });

    test('navbar should show "Our Story" link', async ({ page }) => {
      const nav = page.getByRole('navigation');
      await expect(nav.getByRole('link', { name: 'Our Story' })).toBeVisible();
    });
  });

  // ==========================================
  // Activities Page [EN]
  // ==========================================
  test.describe('Activities Page [EN]', () => {

    test.beforeEach(async ({ page }) => {
      await page.goto('/activities');
      await page.waitForLoadState('networkidle');
      await switchLanguage(page, 'en');
    });

    test('should display Activities page heading in English', async ({ page }) => {
      await expect(page.getByText(/Our Activities/i).first()).toBeVisible();
    });

    test('navbar should show "Explore" link', async ({ page }) => {
      const nav = page.getByRole('navigation');
      await expect(nav.getByRole('link', { name: 'Explore' })).toBeVisible();
    });
  });

  // ==========================================
  // Contact Page [EN]
  // ==========================================
  test.describe('Contact Page [EN]', () => {

    test.beforeEach(async ({ page }) => {
      await page.goto('/contact-us');
      await page.waitForLoadState('networkidle');
      await switchLanguage(page, 'en');
    });

    test('should display "Contact Us" heading in English', async ({ page }) => {
      await expect(page.getByText(/Contact Us/i).first()).toBeVisible();
    });

    test('should display English form labels', async ({ page }) => {
      await expect(page.getByText(/Full Name/i).first()).toBeVisible();
      await expect(page.getByText(/Phone Number/i).first()).toBeVisible();
      await expect(page.getByText('Email').first()).toBeVisible();
      await expect(page.getByText(/Your Message/i).first()).toBeVisible();
    });
  });

  // ==========================================
  // Products Page [EN]
  // ==========================================
  test.describe('Products Page [EN]', () => {

    test.beforeEach(async ({ page }) => {
      await page.goto('/products');
      await page.waitForLoadState('networkidle');
      await switchLanguage(page, 'en');
    });

    test('navbar should show "Services" link', async ({ page }) => {
      const nav = page.getByRole('navigation');
      await expect(nav.getByRole('link', { name: 'Services' })).toBeVisible();
    });
  });
});
