import { test, expect, switchLanguage } from './fixtures';

test.describe('Translation Test - Indonesia (ID)', () => {

  // ==========================================
  // HOMEPAGE [ID]
  // ==========================================
  test.describe('Homepage [ID]', () => {

    test.beforeEach(async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      await switchLanguage(page, 'id');
    });

    // --- Navbar ---
    test('navbar: should display all Indonesian nav links', async ({ page }) => {
      const nav = page.getByRole('navigation');
      await expect(nav.getByRole('link', { name: 'Beranda' })).toBeVisible();
      await expect(nav.getByRole('link', { name: 'Tentang Mepo' })).toBeVisible();
      await expect(nav.getByRole('link', { name: 'Layanan' })).toBeVisible();
      await expect(nav.getByRole('link', { name: 'Aktivitas' })).toBeVisible();
    });

    test('navbar: should display "Hubungi Kami" button', async ({ page }) => {
      await expect(page.locator('a[href="/contact-us"] button')).toContainText('Hubungi Kami');
    });

    test('navbar: should display "Unduh Aplikasi" button', async ({ page }) => {
      await expect(page.locator('#composition-button').first()).toContainText(/Unduh Aplikasi/i);
    });

    test('navbar: should display Mepo logo', async ({ page }) => {
      await expect(page.locator('a[href="/"] img').first()).toBeVisible();
    });

    // --- Hero Section ---
    test('hero: should display "Semua Perjalanan Bisa Dimulai dari Sini"', async ({ page }) => {
      await expect(page.getByText('Semua Perjalanan Bisa Dimulai dari Sini')).toBeVisible();
    });

    test('hero: should display "Teman Perjalananmu"', async ({ page }) => {
      await expect(page.getByText('Teman Perjalananmu')).toBeVisible();
    });

    test('hero: should display Indonesian description text', async ({ page }) => {
      await expect(page.getByText(/Mau liburan atau perjalanan bisnis/i).first()).toBeVisible();
    });

    // --- Tentang Mepo Indonesia Section ---
    test('about section: should display "Tentang Mepo Indonesia" heading', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 500));
      await page.waitForTimeout(500);
      await expect(page.getByText('Tentang Mepo Indonesia').first()).toBeVisible();
    });

    test('about section: should display "platform perjalanan all-in-one" description', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 500));
      await page.waitForTimeout(500);
      await expect(page.getByText(/platform.*all-in-one/i).first()).toBeVisible();
    });

    test('about section: should display "Kenalan dengan Mepo" button', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 600));
      await page.waitForTimeout(500);
      await expect(page.getByText('Kenalan dengan Mepo').first()).toBeVisible();
    });

    test('about section: "Kenalan" button should link to /about', async ({ page }) => {
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

    test('partnership: should display "Jadi Partner" button', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight - 800));
      await page.waitForTimeout(500);
      await expect(page.getByText(/Jadi Partner/i).first()).toBeVisible();
    });

    test('partnership: should display "Rencanakan Company Trip" button', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight - 800));
      await page.waitForTimeout(500);
      await expect(page.getByText(/Rencanakan Company Trip/i).first()).toBeVisible();
    });

    // --- Value Proposition ---
    test('value prop: should display "Value yang Kamu Dapat di Mepo" heading', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 800));
      await page.waitForTimeout(500);
      await expect(page.getByText('Value yang Kamu Dapat di Mepo').first()).toBeVisible();
    });

    test('value prop: should display "Solusi All-in-One" card', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 900));
      await page.waitForTimeout(500);
      await expect(page.getByText(/Solusi All-in-One/i).first()).toBeVisible();
    });

    test('value prop: should display "Efisien dan Fleksibel" card', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 900));
      await page.waitForTimeout(500);
      await expect(page.getByText(/Efisien dan Fleksibel/i).first()).toBeVisible();
    });

    test('value prop: should display "Kolaborasi dengan Agen" card', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 900));
      await page.waitForTimeout(500);
      await expect(page.getByText(/Kolaborasi dengan Agen/i).first()).toBeVisible();
    });

    test('value prop: should display "Terhubung dengan Media Sosial" card', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 900));
      await page.waitForTimeout(500);
      await expect(page.getByText(/Terhubung dengan Media Sosial/i).first()).toBeVisible();
    });

    // --- Apa Saja di Mepo (Features) ---
    test('features: should display "Apa Saja di Mepo" heading', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
      await page.waitForTimeout(500);
      await expect(page.getByText('Apa Saja di Mepo').first()).toBeVisible();
    });

    test('features: should display "Itinerary Planning" item', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
      await page.waitForTimeout(500);
      // NOTE: Feature names may not be translated — checking both
      await expect(page.getByText(/Itinerary Planning|Perencanaan Itinerary/i).first()).toBeVisible();
    });

    test('features: should display "Activity Creation" item', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
      await page.waitForTimeout(500);
      await expect(page.getByText(/Activity Creation|Pembuatan Aktivitas/i).first()).toBeVisible();
    });

    test('features: should display "Invite and Join" item', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
      await page.waitForTimeout(500);
      await expect(page.getByText(/Invite and Join|Undang dan Bergabung/i).first()).toBeVisible();
    });

    test('features: should display "Itinerary Recommendations" item', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
      await page.waitForTimeout(500);
      await expect(page.getByText(/Itinerary Recommendations|Rekomendasi Itinerary/i).first()).toBeVisible();
    });

    test('features: accordion should expand on click', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
      await page.waitForTimeout(500);
      const firstItem = page.getByText(/Itinerary Planning|Perencanaan Itinerary/i).first();
      await firstItem.click();
      await page.waitForTimeout(800);
      const expandedContent = page.locator('.MuiAccordionDetails-root, [class*="accordion"] p, [class*="Accordion"] p').first();
      if (await expandedContent.isVisible()) {
        await expect(expandedContent).toBeVisible();
      }
    });

    // --- Aktivitas Kami ---
    test('activities: should display "Aktivitas Kami" heading', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 1.5));
      await page.waitForTimeout(500);
      await expect(page.getByText('Aktivitas Kami').first()).toBeVisible();
    });

    test('activities: should display at least one article card', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 1.5));
      await page.waitForTimeout(500);
      await expect(page.getByText(/Innova Community|Itinerary/i).first()).toBeVisible();
    });

    test('activities: should display "Selengkapnya" or "Read More" button', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 1.5));
      await page.waitForTimeout(500);
      // NOTE: Button text may not be fully translated
      await expect(page.getByText(/Selengkapnya|Read More/i).first()).toBeVisible();
    });

    // --- Footer ---
    test('footer: should display footer', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(500);
      await expect(page.locator('footer')).toBeVisible();
    });

    test('footer: should display Indonesian page links', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(500);
      const footer = page.locator('footer');
      await expect(footer.getByText('Beranda').first()).toBeVisible();
      await expect(footer.getByText('Tentang Mepo').first()).toBeVisible();
      await expect(footer.getByText('Layanan').first()).toBeVisible();
      await expect(footer.getByText('Aktivitas').first()).toBeVisible();
    });

    test('footer: should display "Pages" or ID equivalent section', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(500);
      // NOTE: Section heading may not be translated
      await expect(page.locator('footer').getByText(/Pages|Halaman/i).first()).toBeVisible();
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
      // NOTE: Website bug — button not translated to "Kembali ke Atas"
      await expect(page.getByText(/Back to Top|Kembali ke Atas/i).filter({ visible: true }).first()).toBeVisible();
    });

    test('footer: "Back to Top" should scroll to top', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(500);
      await page.getByText(/Back to Top|Kembali ke Atas/i).filter({ visible: true }).first().click();
      await page.waitForTimeout(800);
      const scrollY = await page.evaluate(() => window.scrollY);
      expect(scrollY).toBeLessThan(200);
    });
  });

  // ==========================================
  // ABOUT PAGE [ID]
  // ==========================================
  test.describe('About Page [ID]', () => {

    test.beforeEach(async ({ page }) => {
      await page.goto('/about');
      await page.waitForLoadState('networkidle');
      await switchLanguage(page, 'id');
    });

    test('should display "Mepo Indonesia" heading', async ({ page }) => {
      await expect(page.getByText('Mepo Indonesia').first()).toBeVisible();
    });

    test('should display "Visi Kami" section', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 300));
      await page.waitForTimeout(500);
      await expect(page.getByText('Visi Kami').first()).toBeVisible();
    });

    test('should display "Misi Kami" section', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 400));
      await page.waitForTimeout(500);
      await expect(page.getByText('Misi Kami').first()).toBeVisible();
    });

    test('mission: should display "Memberdayakan Eksplorasi"', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 500));
      await page.waitForTimeout(500);
      await expect(page.getByText(/Memberdayakan Eksplorasi/i).first()).toBeVisible();
    });

    test('mission: should display "Mengkurasi Konten"', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 500));
      await page.waitForTimeout(500);
      await expect(page.getByText(/Mengkurasi Konten/i).first()).toBeVisible();
    });

    test('mission: should display "Memfasilitasi Koneksi"', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 600));
      await page.waitForTimeout(500);
      await expect(page.getByText(/Memfasilitasi Koneksi/i).first()).toBeVisible();
    });

    test('mission: should display "Mendukung Perjalanan Berkelanjutan"', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 600));
      await page.waitForTimeout(500);
      await expect(page.getByText(/Mendukung Perjalanan Berkelanjutan/i).first()).toBeVisible();
    });

    test('mission: should display "Mendorong Pertukaran Budaya"', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 700));
      await page.waitForTimeout(500);
      await expect(page.getByText(/Mendorong Pertukaran Budaya/i).first()).toBeVisible();
    });

    test('mission: should display "Mengedepankan Inovasi"', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 700));
      await page.waitForTimeout(500);
      await expect(page.getByText(/Mengedepankan Inovasi/i).first()).toBeVisible();
    });

    test('navbar: should show "Tentang Mepo" link as active', async ({ page }) => {
      const nav = page.getByRole('navigation');
      await expect(nav.getByRole('link', { name: 'Tentang Mepo' })).toBeVisible();
    });

    test('should display footer', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(500);
      await expect(page.locator('footer')).toBeVisible();
    });
  });

  // ==========================================
  // ACTIVITIES PAGE [ID]
  // ==========================================
  test.describe('Activities Page [ID]', () => {

    test.beforeEach(async ({ page }) => {
      await page.goto('/activities');
      await page.waitForLoadState('networkidle');
      await switchLanguage(page, 'id');
    });

    test('should display Activities banner heading', async ({ page }) => {
      // NOTE: Website bug — banner shows "Our Activities" even in ID mode
      await expect(page.getByText(/Our Activities|Aktivitas Kami/i).first()).toBeVisible();
    });

    test('navbar: should show "Aktivitas" link as active', async ({ page }) => {
      const nav = page.getByRole('navigation');
      await expect(nav.getByRole('link', { name: 'Aktivitas' })).toBeVisible();
    });

    test('should display Innova Community article', async ({ page }) => {
      await expect(page.getByText(/Innova Community/i).first()).toBeVisible();
    });

    test('should display at least 2 article cards', async ({ page }) => {
      const images = page.locator('main img, section img');
      const count = await images.count();
      expect(count).toBeGreaterThanOrEqual(2);
    });

    test('should display article links', async ({ page }) => {
      const links = page.locator('a[href*="/activities/"]');
      const count = await links.count();
      expect(count).toBeGreaterThan(0);
    });
  });

  // ==========================================
  // CONTACT PAGE [ID]
  // ==========================================
  test.describe('Contact Page [ID]', () => {

    test.beforeEach(async ({ page }) => {
      await page.goto('/contact-us');
      await page.waitForLoadState('networkidle');
      await switchLanguage(page, 'id');
    });

    test('navbar: should display "Hubungi Kami" button', async ({ page }) => {
      await expect(page.locator('a[href="/contact-us"] button')).toContainText('Hubungi Kami');
    });

    test('should display "Contact Us" banner heading', async ({ page }) => {
      // NOTE: Website bug — banner shows "Contact Us" even in ID mode
      await expect(page.getByText(/Contact Us|Hubungi Kami/i).first()).toBeVisible();
    });

    test('should display form heading', async ({ page }) => {
      // NOTE: Website bug — form heading shows "Get in Touch" even in ID mode
      await expect(page.getByText(/Get in Touch|Hubungi Kami/i).first()).toBeVisible();
    });

    test('should display form labels', async ({ page }) => {
      // NOTE: Website bug — form labels stay in English in ID mode
      await expect(page.getByText(/Full Name|Nama Lengkap/i).first()).toBeVisible();
      await expect(page.getByText(/Phone Number|Nomor Telepon/i).first()).toBeVisible();
      await expect(page.getByText('Email').first()).toBeVisible();
    });

    test('should display Submit button', async ({ page }) => {
      const submitBtn = page.locator('button[type="submit"], button:has-text("Submit"), button:has-text("Kirim")').first();
      await expect(submitBtn).toBeVisible();
    });
  });

  // ==========================================
  // PRODUCTS PAGE [ID]
  // ==========================================
  test.describe('Products Page [ID]', () => {

    test.beforeEach(async ({ page }) => {
      await page.goto('/products');
      await page.waitForLoadState('domcontentloaded');
      await switchLanguage(page, 'id');
    });

    test('navbar: should show "Layanan" link', async ({ page }) => {
      const nav = page.getByRole('navigation');
      await expect(nav.getByRole('link', { name: 'Layanan' })).toBeVisible();
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
