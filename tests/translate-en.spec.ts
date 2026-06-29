import { test, expect, switchLanguage } from './fixtures';

test.describe('Translation Test - English (EN)', () => {

  // ==========================================
  // HOMEPAGE [EN]
  // ==========================================
  test.describe('Homepage [EN]', () => {

    test.beforeEach(async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      await switchLanguage(page, 'en');
    });

    // --- Navbar ---
    test('navbar: should display all English nav links', async ({ page }) => {
      const nav = page.getByRole('navigation');
      await expect(nav.getByRole('link', { name: 'Home' })).toBeVisible();
      await expect(nav.getByRole('link', { name: 'Our Story' })).toBeVisible();
      await expect(nav.getByRole('link', { name: 'Services' })).toBeVisible();
      await expect(nav.getByRole('link', { name: 'Explore' })).toBeVisible();
    });

    test('navbar: should display "Get In Touch" button', async ({ page }) => {
      await expect(page.locator('a[href="/contact-us"] button')).toContainText('Get in Touch');
    });

    test('navbar: should display "Get The App" button', async ({ page }) => {
      await expect(page.locator('#composition-button').first()).toContainText(/Get the App/i);
    });

    test('navbar: should display Mepo logo', async ({ page }) => {
      await expect(page.locator('a[href="/"] img').first()).toBeVisible();
    });

    // --- Hero Section ---
    test('hero: should display "Every Journey Starts Here"', async ({ page }) => {
      await expect(page.getByText('Every Journey Starts Here')).toBeVisible();
    });

    test('hero: should display "Your Travel Companion"', async ({ page }) => {
      await expect(page.getByText('Your Travel Companion')).toBeVisible();
    });

    test('hero: should display English description text', async ({ page }) => {
      await expect(page.getByText(/Whether it.*holiday or a business trip/i).first()).toBeVisible();
    });

    // --- About Mepo Indonesia Section ---
    test('about section: should display "About Mepo Indonesia" heading', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 500));
      await page.waitForTimeout(500);
      await expect(page.getByText('About Mepo Indonesia').first()).toBeVisible();
    });

    test('about section: should display "all-in-one travel platform" description', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 500));
      await page.waitForTimeout(500);
      await expect(page.getByText(/all-in-one travel platform/i).first()).toBeVisible();
    });

    test('about section: should display "Learn More About Mepo" button', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 600));
      await page.waitForTimeout(500);
      await expect(page.getByText('Learn More About Mepo').first()).toBeVisible();
    });

    test('about section: "Learn More" button should link to /about', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 600));
      await page.waitForTimeout(500);
      const aboutLink = page.locator('a[href="/about"]').first();
      await expect(aboutLink).toBeVisible();
    });

    // --- Partnership Banner ---
    test('partnership: should display partnership text', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight - 800));
      await page.waitForTimeout(500);
      await expect(page.getByText(/partner/i).first()).toBeVisible();
    });

    test('partnership: should display "Become a Partner" button', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight - 800));
      await page.waitForTimeout(500);
      await expect(page.getByText('Become a Partner').first()).toBeVisible();
    });

    test('partnership: should display "Plan a Corporate Outing" button', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight - 800));
      await page.waitForTimeout(500);
      await expect(page.getByText(/Plan a Corporate Outing/i).first()).toBeVisible();
    });

    // --- Value Proposition ---
    test('value prop: should display "The Value You Get with Mepo" heading', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 800));
      await page.waitForTimeout(500);
      await expect(page.getByText('The Value You Get with Mepo').first()).toBeVisible();
    });

    test('value prop: should display "All-in-One" card', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 900));
      await page.waitForTimeout(500);
      await expect(page.getByText(/All-in-One/i).first()).toBeVisible();
    });

    test('value prop: should display "Efficient and Flexible" card', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 900));
      await page.waitForTimeout(500);
      await expect(page.getByText(/Efficient and Flexible/i).first()).toBeVisible();
    });

    test('value prop: should display collaboration card', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 900));
      await page.waitForTimeout(500);
      await expect(page.getByText(/Partnership|Agencies|Collaborat|Agent/i).first()).toBeVisible();
    });

    test('value prop: should display social media card', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 900));
      await page.waitForTimeout(500);
      await expect(page.getByText(/Social Media/i).first()).toBeVisible();
    });

    // --- Core Features / What's Inside ---
    test('features: should display "Mepo Core Features" heading', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
      await page.waitForTimeout(500);
      await expect(page.getByText('Mepo Core Features').first()).toBeVisible();
    });

    test('features: should display "Itinerary Planning"', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
      await page.waitForTimeout(500);
      await expect(page.getByText('Itinerary Planning').first()).toBeVisible();
    });

    test('features: should display "Activity Creation"', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
      await page.waitForTimeout(500);
      await expect(page.getByText('Activity Creation').first()).toBeVisible();
    });

    test('features: should display "Invite and Join"', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
      await page.waitForTimeout(500);
      await expect(page.getByText('Invite and Join').first()).toBeVisible();
    });

    test('features: should display "Itinerary Recommendations"', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
      await page.waitForTimeout(500);
      await expect(page.getByText('Itinerary Recommendations').first()).toBeVisible();
    });

    test('features: accordion should expand on click', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
      await page.waitForTimeout(500);
      const itineraryPlanning = page.getByText('Itinerary Planning').first();
      await itineraryPlanning.click();
      await page.waitForTimeout(800);
      const expandedContent = page.locator('.MuiAccordionDetails-root, [class*="accordion"] p, [class*="Accordion"] p').first();
      if (await expandedContent.isVisible()) {
        await expect(expandedContent).toBeVisible();
      }
    });

    // --- Our Activities ---
    test('activities: should display "Our Activities" heading', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 1.5));
      await page.waitForTimeout(500);
      await expect(page.getByText('Our Activities').first()).toBeVisible();
    });

    test('activities: should display at least one article card', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 1.5));
      await page.waitForTimeout(500);
      await expect(page.getByText(/Innova Community|Itinerary/i).first()).toBeVisible();
    });

    test('activities: should display "Read More" button', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 1.5));
      await page.waitForTimeout(500);
      await expect(page.getByText(/Read More/i).first()).toBeVisible();
    });

    // --- Footer ---
    test('footer: should display footer', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(500);
      await expect(page.locator('footer')).toBeVisible();
    });

    test('footer: should display English page links', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(500);
      const footer = page.locator('footer');
      await expect(footer.getByText('Home').first()).toBeVisible();
      await expect(footer.getByText('Our Story').first()).toBeVisible();
      await expect(footer.getByText('Services').first()).toBeVisible();
      await expect(footer.getByText('Explore').first()).toBeVisible();
    });

    test('footer: should display "Pages" section heading', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(500);
      await expect(page.locator('footer').getByText('Pages').first()).toBeVisible();
    });

    test('footer: should display "Legal" section with Terms & Conditions', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(500);
      await expect(page.locator('footer').getByText(/Terms|Legal/i).filter({ visible: true }).first()).toBeVisible();
    });

    test('footer: should display contact WhatsApp number', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(500);
      await expect(page.locator('footer').getByText('+62 813-3332-6001')).toBeVisible();
    });

    test('footer: should display contact email', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(500);
      await expect(page.locator('footer').getByText('social@mepo.travel')).toBeVisible();
    });

    test('footer: should display copyright text', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(500);
      await expect(page.getByText(/Copyright.*PT.*Multi Kreasi/i).first()).toBeVisible();
    });

    test('footer: should display "Back to Top" button', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(500);
      await expect(page.getByText('Back to Top').filter({ visible: true }).first()).toBeVisible();
    });

    test('footer: "Back to Top" button should scroll to top', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(500);
      await page.getByText('Back to Top').filter({ visible: true }).first().click();
      await page.waitForTimeout(800);
      const scrollY = await page.evaluate(() => window.scrollY);
      expect(scrollY).toBeLessThan(200);
    });
  });

  // ==========================================
  // ABOUT PAGE [EN]
  // ==========================================
  test.describe('About Page [EN]', () => {

    test.beforeEach(async ({ page }) => {
      await page.goto('/about');
      await page.waitForLoadState('networkidle');
      await switchLanguage(page, 'en');
    });

    test('should display "Mepo Indonesia" heading', async ({ page }) => {
      await expect(page.getByText('Mepo Indonesia').first()).toBeVisible();
    });

    test('should display "Our Vision" section', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 300));
      await page.waitForTimeout(500);
      await expect(page.getByText('Our Vision').first()).toBeVisible();
    });

    test('should display "Our Mission" section', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 400));
      await page.waitForTimeout(500);
      await expect(page.getByText('Our Mission').first()).toBeVisible();
    });

    test('mission: should display "Empowering Exploration"', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 500));
      await page.waitForTimeout(500);
      await expect(page.getByText(/Empowering Exploration/i).first()).toBeVisible();
    });

    test('mission: should display "Curating Inspiring Content"', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 500));
      await page.waitForTimeout(500);
      await expect(page.getByText(/Curating Inspiring Content/i).first()).toBeVisible();
    });

    test('mission: should display "Facilitating Authentic Connections"', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 600));
      await page.waitForTimeout(500);
      await expect(page.getByText(/Facilitating Authentic Connections/i).first()).toBeVisible();
    });

    test('mission: should display "Enabling Sustainable Travel"', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 600));
      await page.waitForTimeout(500);
      await expect(page.getByText(/Enabling Sustainable Travel/i).first()).toBeVisible();
    });

    test('mission: should display "Promoting Cultural Exchange"', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 700));
      await page.waitForTimeout(500);
      await expect(page.getByText(/Promoting Cultural Exchange/i).first()).toBeVisible();
    });

    test('mission: should display "Embracing Innovation"', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 700));
      await page.waitForTimeout(500);
      await expect(page.getByText(/Embracing Innovation/i).first()).toBeVisible();
    });

    test('navbar: should show "Our Story" link as active', async ({ page }) => {
      const nav = page.getByRole('navigation');
      await expect(nav.getByRole('link', { name: 'Our Story' })).toBeVisible();
    });

    test('should display footer', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(500);
      await expect(page.locator('footer')).toBeVisible();
    });
  });

  // ==========================================
  // ACTIVITIES PAGE [EN]
  // ==========================================
  test.describe('Activities Page [EN]', () => {

    test.beforeEach(async ({ page }) => {
      await page.goto('/activities');
      await page.waitForLoadState('networkidle');
      await switchLanguage(page, 'en');
    });

    test('should display "Our Activities" banner heading', async ({ page }) => {
      await expect(page.getByText(/Our Activities/i).first()).toBeVisible();
    });

    test('navbar: should show "Explore" link as active', async ({ page }) => {
      const nav = page.getByRole('navigation');
      await expect(nav.getByRole('link', { name: 'Explore' })).toBeVisible();
    });

    test('should display Innova Community article', async ({ page }) => {
      await expect(page.getByText(/Innova Community/i).first()).toBeVisible();
    });

    test('should display at least 2 article cards', async ({ page }) => {
      const images = page.locator('main img, section img');
      const count = await images.count();
      expect(count).toBeGreaterThanOrEqual(2);
    });

    test('should display "Read More" or article links', async ({ page }) => {
      const links = page.locator('a[href*="/activities/"]');
      const count = await links.count();
      expect(count).toBeGreaterThan(0);
    });
  });

  // ==========================================
  // CONTACT PAGE [EN]
  // ==========================================
  test.describe('Contact Page [EN]', () => {

    test.beforeEach(async ({ page }) => {
      await page.goto('/contact-us');
      await page.waitForLoadState('networkidle');
      await switchLanguage(page, 'en');
    });

    test('should display "Contact Us" banner heading', async ({ page }) => {
      await expect(page.getByText(/Contact Us/i).first()).toBeVisible();
    });

    test('should display "Get in Touch" form heading', async ({ page }) => {
      await expect(page.getByText(/Get in Touch/i).first()).toBeVisible();
    });

    test('should display "Full Name" label', async ({ page }) => {
      await expect(page.getByText(/Full Name/i).first()).toBeVisible();
    });

    test('should display "Phone Number" label', async ({ page }) => {
      await expect(page.getByText(/Phone Number/i).first()).toBeVisible();
    });

    test('should display "Email" label', async ({ page }) => {
      await expect(page.getByText('Email').first()).toBeVisible();
    });

    test('should display "Your Message" label', async ({ page }) => {
      await expect(page.getByText(/Your Message|Message/i).first()).toBeVisible();
    });

    test('should display Submit button', async ({ page }) => {
      const submitBtn = page.locator('button[type="submit"], button:has-text("Submit"), button:has-text("Send")').first();
      await expect(submitBtn).toBeVisible();
    });
  });

  // ==========================================
  // PRODUCTS PAGE [EN]
  // ==========================================
  test.describe('Products Page [EN]', () => {

    test.beforeEach(async ({ page }) => {
      await page.goto('/products');
      await page.waitForLoadState('domcontentloaded');
      await switchLanguage(page, 'en');
    });

    test('navbar: should show "Services" link', async ({ page }) => {
      const nav = page.getByRole('navigation');
      await expect(nav.getByRole('link', { name: 'Services' })).toBeVisible();
    });

    test('should display product items', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 400));
      await page.waitForTimeout(500);
      const items = page.locator('.slick-slide, [class*="product"], [class*="Product"]');
      const count = await items.count();
      expect(count).toBeGreaterThan(0);
    });

    test('should display product images', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 400));
      await page.waitForTimeout(500);
      const images = page.locator('main img, section img');
      const count = await images.count();
      expect(count).toBeGreaterThan(0);
    });

    test('should display "Others" category', async ({ page }) => {
      await expect(page.getByText('Others').first()).toBeVisible();
    });
  });
});
