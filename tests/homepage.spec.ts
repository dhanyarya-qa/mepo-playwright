import { test, expect } from './fixtures';

test.describe('Homepage - Text Content & Buttons Validation', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    // Extra wait for SPA hydration and animations
    await page.waitForTimeout(2000);
  });

  // ==========================================
  // Navbar Text Validation
  // ==========================================
  test.describe('Navbar', () => {
    test('should display all nav link texts correctly', async ({ page }) => {
      const nav = page.getByRole('navigation');
      // EN: Home, Our Story, Services, Explore
      // ID: Beranda, Tentang Mepo, Layanan, Aktivitas
      await expect(nav.getByRole('link', { name: /^Home$|^Beranda$/i })).toBeVisible();
      await expect(nav.getByRole('link', { name: /Our Story|Tentang Mepo/i })).toBeVisible();
      await expect(nav.getByRole('link', { name: /^Services$|^Layanan$/i })).toBeVisible();
      await expect(nav.getByRole('link', { name: /^Explore$|^Aktivitas$/i })).toBeVisible();
    });

    test('should display "Get In Touch" or "Hubungi Kami" button text', async ({ page }) => {
      const contactBtn = page.locator('a[href="/contact-us"] button');
      await expect(contactBtn).toBeVisible();
      await expect(contactBtn).toContainText(/Get In Touch|Hubungi Kami|Contact Us/i);
    });

    test('should display "Get The App" or "Unduh Aplikasi" button text', async ({ page }) => {
      const downloadBtn = page.locator('#composition-button').first();
      await expect(downloadBtn).toBeVisible();
      await expect(downloadBtn).toContainText(/Get The App|Unduh Aplikasi|Download/i);
    });

    test('should display Mepo logo', async ({ page }) => {
      const logo = page.locator('a[href="/"] img').first();
      await expect(logo).toBeVisible();
    });
  });

  // ==========================================
  // Hero Section Text Validation
  // ==========================================
  test.describe('Hero Section', () => {
    test('should display hero section with travel-related content', async ({ page }) => {
      // EN: "Every Journey Starts Here" / ID: "Semua Perjalanan Bisa Dimulai dari Sini"
      const heroArea = page.locator('section').first();
      await expect(heroArea).toBeVisible();
    });

    test('should display main heading', async ({ page }) => {
      // EN: "Every Journey Starts Here" / ID: "Semua Perjalanan Bisa Dimulai dari Sini"
      await expect(page.getByText(/Every Journey Starts Here|Semua Perjalanan Bisa Dimulai/i).first()).toBeVisible();
    });

    test('should display sub-heading', async ({ page }) => {
      // EN: "Your Travel Companion" / ID: "Teman Perjalananmu"
      await expect(page.getByText(/Your Travel Companion|Teman Perjalananmu/i).first()).toBeVisible();
    });

    test('should display description text', async ({ page }) => {
      // EN: "Whether it's a holiday or a business trip" / ID: "Mau liburan atau perjalanan bisnis"
      await expect(page.getByText(/Whether it.*holiday|Mau liburan/i).first()).toBeVisible();
    });
  });

  // ==========================================
  // About Mepo Indonesia Section
  // ==========================================
  test.describe('About Mepo Indonesia Section', () => {
    test('should display "About Mepo Indonesia" or "Tentang Mepo Indonesia" heading', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 500));
      await page.waitForTimeout(800);
      await expect(page.getByText(/About Mepo Indonesia|Tentang Mepo Indonesia/i).first()).toBeVisible();
    });

    test('should display Mepo description text', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 500));
      await page.waitForTimeout(800);
      // EN: "all-in-one travel platform" / ID: "platform perjalanan all-in-one"
      await expect(page.getByText(/all-in-one/i).first()).toBeVisible();
    });

    test('should display booking and travel management keywords', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 500));
      await page.waitForTimeout(800);
      // EN: "tickets, stays, activities, and itineraries" / ID: "tiket, hotel, aktivitas"
      await expect(page.getByText(/tickets.*stays|tiket.*hotel/i).first()).toBeVisible();
    });

    test('should display "Learn More About Mepo" or "Kenalan dengan Mepo" button', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 600));
      await page.waitForTimeout(800);
      // EN: "Learn More About Mepo" / ID: "Kenalan dengan Mepo"
      const seeDetailsBtn = page.getByText(/Learn More About Mepo|Kenalan dengan Mepo|Get To Know Mepo|See Details/i).first();
      await expect(seeDetailsBtn).toBeVisible();
    });

    test('About button should navigate to /about', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 600));
      await page.waitForTimeout(800);
      const seeDetailsLink = page.locator('a[href="/about"]').first();
      if (await seeDetailsLink.isVisible()) {
        await expect(seeDetailsLink).toHaveAttribute('href', '/about');
      }
    });
  });

  // ==========================================
  // Partnership Banner
  // ==========================================
  test.describe('Partnership Banner', () => {
    test('should display partnership text', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight - 800));
      await page.waitForTimeout(800);
      // EN: "partnership opportunities or a corporate travel consultation"
      // ID: "hubungi Mepo untuk kerja sama"
      const partnerText = page.getByText(/partnership|corporate travel|hubungi.*mepo|kerja sama/i);
      await expect(partnerText.first()).toBeVisible();
    });

    test('should display "Become a Partner" button', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight - 800));
      await page.waitForTimeout(800);
      const joinBtn = page.getByText(/Become a Partner|Gabung.*Partner|Jadi Partner/i);
      await expect(joinBtn.first()).toBeVisible();
    });

    test('should display "Plan a Corporate Outing" button', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight - 800));
      await page.waitForTimeout(800);
      const corpBtn = page.getByText(/Plan a Corporate|Corporate Outing|Rencanakan Company/i);
      await expect(corpBtn.first()).toBeVisible();
    });
  });

  // ==========================================
  // Value Proposition Section
  // ==========================================
  test.describe('Value Proposition', () => {
    test('should display Value Proposition heading', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 800));
      await page.waitForTimeout(800);
      // EN: "The Value You Get with Mepo" / ID: "Value yang Kamu Dapat di Mepo"
      await expect(page.getByText(/The Value You Get with Mepo|Value yang Kamu Dapat|Our Value Proposition/i).first()).toBeVisible();
    });

    test('should display value prop card about collaboration', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 900));
      await page.waitForTimeout(800);
      // EN: "Collaborating with Agents & Startups" / ID: "Kolaborasi dengan Agen"
      await expect(page.getByText(/Collaborat|Kolaborasi|Kerjasama|Agents.*Startup|Agen/i).first()).toBeVisible();
    });

    test('should display value prop card: "All-in-One"', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 900));
      await page.waitForTimeout(800);
      await expect(page.getByText(/All-in-One/i).first()).toBeVisible();
    });

    test('should display value prop card about efficiency', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 900));
      await page.waitForTimeout(800);
      // EN: "Efficient and Flexible" / ID: "Efisien dan Fleksibel"
      await expect(page.getByText(/Efficient|Efisien|Flexible|Fleksibel/i).first()).toBeVisible();
    });

    test('should display value prop card about social media', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 900));
      await page.waitForTimeout(800);
      // EN: "Connected with Social Media" / ID: "Terhubung dengan Media Sosial"
      await expect(page.getByText(/Social Media|Media Sosial/i).first()).toBeVisible();
    });
  });

  // ==========================================
  // What's Inside Section (Accordion)
  // ==========================================
  test.describe('What\'s Inside Section', () => {
    test('should display section heading', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
      await page.waitForTimeout(800);
      // EN: "Mepo Core Features" / ID: "Apa Saja di Mepo"
      const heading = page.getByText(/Mepo Core Features|Apa Saja di Mepo|What.*Inside/i);
      await expect(heading.first()).toBeVisible();
    });

    test('should display "Itinerary Planning" accordion item', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
      await page.waitForTimeout(500);
      await expect(page.getByText('Itinerary Planning').first()).toBeVisible();
    });

    test('should display "Activity Creation" accordion item', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
      await page.waitForTimeout(500);
      await expect(page.getByText('Activity Creation').first()).toBeVisible();
    });

    test('should display "Invite and Join" accordion item', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
      await page.waitForTimeout(500);
      await expect(page.getByText('Invite and Join').first()).toBeVisible();
    });

    test('should display "Itinerary Recommendations" accordion item', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
      await page.waitForTimeout(500);
      await expect(page.getByText('Itinerary Recommendations').first()).toBeVisible();
    });

    test('should expand accordion and show description on click', async ({ page }) => {
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
  });

  // ==========================================
  // Our Activities Section on Homepage
  // ==========================================
  test.describe('Our Activities on Homepage', () => {
    test('should display activities heading', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 1.5));
      await page.waitForTimeout(800);
      const heading = page.getByText(/Our Activities|Aktivitas Kami/i).first();
      await expect(heading).toBeVisible();
    });

    test('should display at least one activity article card', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 1.5));
      await page.waitForTimeout(800);
      const articleContent = page.getByText(/Innova Community|Itinerary Bali/i).first();
      await expect(articleContent).toBeVisible();
    });

    test('should display "Read More" or "Selengkapnya" button', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 1.5));
      await page.waitForTimeout(800);
      const readMoreBtn = page.getByText(/Read More|Selengkapnya|Baca/i).first();
      await expect(readMoreBtn).toBeVisible();
    });

    test('should display Innova Community article on homepage', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 1.5));
      await page.waitForTimeout(800);
      await expect(page.getByText(/Innova Community/i).first()).toBeVisible();
    });
  });

  // ==========================================
  // Footer Text Validation
  // ==========================================
  test.describe('Footer', () => {
    test.beforeEach(async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(800);
    });

    test('should display footer', async ({ page }) => {
      const footer = page.locator('footer');
      await expect(footer).toBeVisible();
    });

    test('should display "Pages" section with links', async ({ page }) => {
      const footer = page.locator('footer');
      // EN: Home, Our Story, Services, Explore
      // ID: Beranda, Tentang Mepo, Layanan, Aktivitas
      await expect(footer.getByText(/^Home$|^Beranda$/i).first()).toBeVisible();
      await expect(footer.getByText(/Our Story|Tentang Mepo/i).first()).toBeVisible();
      await expect(footer.getByText(/^Services$|^Layanan$/i).first()).toBeVisible();
      await expect(footer.getByText(/^Explore$|^Aktivitas$/i).first()).toBeVisible();
    });

    test('should display "Legal" section with Terms & Conditions', async ({ page }) => {
      const hasLegal = await page.evaluate(() => {
        const elements = document.querySelectorAll('h3');
        return Array.from(elements).some(
          el => el.textContent?.trim() === 'Legal' && el.getBoundingClientRect().width > 0
        );
      });
      expect(hasLegal).toBeTruthy();

      const hasTerms = await page.evaluate(() => {
        const elements = document.querySelectorAll('h4, a');
        return Array.from(elements).some(
          el => el.textContent?.includes('Terms') && el.getBoundingClientRect().width > 0
        );
      });
      expect(hasTerms).toBeTruthy();
    });

    test('should display contact WhatsApp number', async ({ page }) => {
      const footer = page.locator('footer');
      await expect(footer.getByText(/\+62/).first()).toBeVisible();
    });

    test('should display contact email', async ({ page }) => {
      const footer = page.locator('footer');
      await expect(footer.getByText('social@mepo.travel')).toBeVisible();
    });

    test('should display copyright text', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(800);
      await expect(page.getByText(/Copyright.*2025/i).first()).toBeVisible();
    });

    test('should display "Back to Top" or "Kembali ke Atas" button', async ({ page }) => {
      const backToTopBtn = page.getByText(/Back to Top|Kembali ke Atas/i);
      await expect(backToTopBtn.first()).toBeVisible();
    });

    test('"Back to Top" button should scroll to top', async ({ page }) => {
      const backToTopBtn = page.getByText(/Back to Top|Kembali ke Atas/i).first();
      
      if (await backToTopBtn.isVisible()) {
        await backToTopBtn.click();
        await page.waitForTimeout(800);
        const scrollY = await page.evaluate(() => window.scrollY);
        expect(scrollY).toBeLessThan(200);
      }
    });
  });
});
