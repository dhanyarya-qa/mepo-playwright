import { test, expect } from './fixtures';

test.describe('Activities Page - Text Content Validation', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/activities');
    await page.waitForLoadState('domcontentloaded');
  });

  test('should load the Activities page successfully', async ({ page }) => {
    await expect(page).toHaveURL(/\/activities/);
    await expect(page).toHaveTitle(/Mepo/i);
  });

  // ==========================================
  // Headings
  // ==========================================
  test('should display "Aktivitas Kami" or "Our Activities" heading', async ({ page }) => {
    await expect(page.getByText(/Aktivitas Kami|Our Activities/i).first()).toBeVisible();
  });

  // ==========================================
  // Innova Community Article
  // ==========================================
  test.describe('Innova Community Article', () => {
    test('should display Innova Community article title', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 400));
      await page.waitForTimeout(500);
      await expect(page.getByText(/Innova Community Rayakan HUT ke-19/i).first()).toBeVisible();
    });

    test('should display article location "Yogyakarta"', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 400));
      await page.waitForTimeout(500);
      await expect(page.getByText(/Yogyakarta/i).first()).toBeVisible();
    });

    test('should display article date "November 2025"', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 400));
      await page.waitForTimeout(500);
      await expect(page.getByText(/November 2025/i).first()).toBeVisible();
    });

    test('should display "Kopdar Akbar Jawa 2025" text', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 400));
      await page.waitForTimeout(500);
      await expect(page.getByText(/Kopdar Akbar Jawa 2025/i).first()).toBeVisible();
    });

    test('should display author "Meita Nurul Fajra"', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 400));
      await page.waitForTimeout(500);
      await expect(page.getByText(/Meita Nurul Fajra/i).first()).toBeVisible();
    });

    test('should link to Innova Community article detail page', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 400));
      await page.waitForTimeout(500);
      const articleLink = page.locator('a[href*="innova-community"]').first();
      await expect(articleLink).toBeVisible();
      const href = await articleLink.getAttribute('href');
      expect(href).toContain('/activities/');
    });
  });

  // ==========================================
  // Itinerary Bali Article
  // ==========================================
  test.describe('Itinerary Bali Article', () => {
    test('should display Itinerary Bali article title', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 400));
      await page.waitForTimeout(500);
      await expect(page.getByText(/Itinerary Bali 3 Hari 2 Malam/i).first()).toBeVisible();
    });

    test('should display "Liburan Keluarga" in Bali article', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 400));
      await page.waitForTimeout(500);
      await expect(page.getByText(/Liburan Keluarga/i).first()).toBeVisible();
    });

    test('should display Bali article description about itinerary planning', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 400));
      await page.waitForTimeout(500);
      await expect(page.getByText(/itinerary.*Bali.*perencanaan/i).first()).toBeVisible();
    });

    test('should display author "Silfi Ardila Putri"', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 400));
      await page.waitForTimeout(500);
      await expect(page.getByText(/Silfi Ardila Putri/i).first()).toBeVisible();
    });

    test('should link to Itinerary Bali article detail page', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 400));
      await page.waitForTimeout(500);
      const articleLink = page.locator('a[href*="itinerary-bali"]').first();
      await expect(articleLink).toBeVisible();
      const href = await articleLink.getAttribute('href');
      expect(href).toContain('/activities/');
    });
  });

  // ==========================================
  // Itinerary Lombok Article
  // ==========================================
  test.describe('Itinerary Lombok Article', () => {
    test('should display Itinerary Lombok article title', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 800));
      await page.waitForTimeout(500);
      await expect(page.getByText(/Itinerary Lombok 5 Hari 4 Malam/i).first()).toBeVisible();
    });

    test('should display "Gili Trawangan" keyword in Lombok article', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 800));
      await page.waitForTimeout(500);
      await expect(page.getByText(/Gili Trawangan/i).first()).toBeVisible();
    });

    test('should display author "Atikah Febriani Nasution" for Lombok article', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 800));
      await page.waitForTimeout(500);
      await expect(page.getByText(/Atikah Febriani Nasution/i).first()).toBeVisible();
    });

    test('should link to Itinerary Lombok article detail page', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 800));
      await page.waitForTimeout(500);
      const articleLink = page.locator('a[href*="itinerary-lombok"]').first();
      await expect(articleLink).toBeVisible();
      const href = await articleLink.getAttribute('href');
      expect(href).toContain('/activities/');
    });
  });

  // ==========================================
  // Itinerary Labuan Bajo Article
  // ==========================================
  test.describe('Itinerary Labuan Bajo Article', () => {
    test('should display Itinerary Labuan Bajo article title', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 800));
      await page.waitForTimeout(500);
      await expect(page.getByText(/Itinerary Labuan Bajo 4 Hari 3 Malam/i).first()).toBeVisible();
    });

    test('should display "Komodo" keyword in Labuan Bajo article', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 800));
      await page.waitForTimeout(500);
      await expect(page.getByText(/Komodo/i).first()).toBeVisible();
    });

    test('should display author "Atikah Febriani Nasution" for Labuan Bajo article', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 800));
      await page.waitForTimeout(500);
      await expect(page.getByText(/Atikah Febriani Nasution/i).first()).toBeVisible();
    });

    test('should link to Itinerary Labuan Bajo article detail page', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 800));
      await page.waitForTimeout(500);
      const articleLink = page.locator('a[href*="itinerary-labuan-bajo"]').first();
      await expect(articleLink).toBeVisible();
      const href = await articleLink.getAttribute('href');
      expect(href).toContain('/activities/');
    });
  });

  // ==========================================
  // Itinerary Bali Pasangan Article
  // ==========================================
  test.describe('Itinerary Bali Pasangan Article', () => {
    test('should display Itinerary Bali Pasangan article title', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 800));
      await page.waitForTimeout(500);
      await expect(page.getByText(/Itinerary Bali 3 Hari 2 Malam untuk Pasangan/i).first()).toBeVisible();
    });

    test('should display "Romantis" keyword in Bali Pasangan article', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 800));
      await page.waitForTimeout(500);
      await expect(page.getByText(/Romantis/i).first()).toBeVisible();
    });

    test('should display author "Atikah Febriani Nasution" for Bali Pasangan article', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 800));
      await page.waitForTimeout(500);
      await expect(page.getByText(/Atikah Febriani Nasution/i).first()).toBeVisible();
    });

    test('should link to Itinerary Bali Pasangan article detail page', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 800));
      await page.waitForTimeout(500);
      const articleLink = page.locator('a[href*="itinerary-bali-3-hari-2-malam-untuk-pasangan"]').first();
      await expect(articleLink).toBeVisible();
      const href = await articleLink.getAttribute('href');
      expect(href).toContain('/activities/');
    });
  });

  // ==========================================
  // 15 Weekend Getaway Jakarta Article
  // ==========================================
  test.describe('Weekend Getaway Jakarta Article', () => {
    test('should display Weekend Getaway Jakarta article title', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 800));
      await page.waitForTimeout(500);
      await expect(page.getByText(/15 Weekend Getaway Dekat Jakarta 2026/i).first()).toBeVisible();
    });

    test('should display author "Silfi Ardila Putri" for Weekend Getaway article', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 800));
      await page.waitForTimeout(500);
      await expect(page.getByText(/Silfi Ardila Putri/i).first()).toBeVisible();
    });

    test('should link to Weekend Getaway Jakarta article detail page', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 800));
      await page.waitForTimeout(500);
      const articleLink = page.locator('a[href*="15-weekend-getaway"]').first();
      await expect(articleLink).toBeVisible();
      const href = await articleLink.getAttribute('href');
      expect(href).toContain('/activities/');
    });
  });

  // ==========================================
  // Bleisure Travel Article
  // ==========================================
  test.describe('Bleisure Travel Article', () => {
    test('should display Bleisure Travel article title', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 800));
      await page.waitForTimeout(500);
      await expect(page.getByText(/Bleisure Travel Indonesia 2026/i).first()).toBeVisible();
    });

    test('should display "Bisnis dan Wisata" keyword in Bleisure article', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 800));
      await page.waitForTimeout(500);
      await expect(page.getByText(/Bisnis dan Wisata/i).first()).toBeVisible();
    });

    test('should display author "Silfi Ardila Putri" for Bleisure article', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 800));
      await page.waitForTimeout(500);
      await expect(page.getByText(/Silfi Ardila Putri/i).first()).toBeVisible();
    });

    test('should link to Bleisure Travel article detail page', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 800));
      await page.waitForTimeout(500);
      const articleLink = page.locator('a[href*="bleisure-travel"]').first();
      await expect(articleLink).toBeVisible();
      const href = await articleLink.getAttribute('href');
      expect(href).toContain('/activities/');
    });
  });

  // ==========================================
  // Wisata Kuliner Nusantara Article
  // ==========================================
  test.describe('Wisata Kuliner Nusantara Article', () => {
    test('should display Wisata Kuliner Nusantara article title', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 800));
      await page.waitForTimeout(500);
      await expect(page.getByText(/Wisata Kuliner Nusantara/i).first()).toBeVisible();
    });

    test('should display "Makanan Terenak" keyword in Kuliner article', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 800));
      await page.waitForTimeout(500);
      await expect(page.getByText(/Makanan Terenak/i).first()).toBeVisible();
    });

    test('should display author "Silfi Ardila Putri" for Kuliner article', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 800));
      await page.waitForTimeout(500);
      await expect(page.getByText(/Silfi Ardila Putri/i).first()).toBeVisible();
    });

    test('should link to Wisata Kuliner article detail page', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 800));
      await page.waitForTimeout(500);
      const articleLink = page.locator('a[href*="wisata-kuliner-nusantara"]').first();
      await expect(articleLink).toBeVisible();
      const href = await articleLink.getAttribute('href');
      expect(href).toContain('/activities/');
    });
  });

  // ==========================================
  // Author Attribution
  // ==========================================
  test.describe('Author Attribution', () => {
    test('should display "Ditulis Oleh:" label', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 400));
      await page.waitForTimeout(500);
      await expect(page.getByText(/Ditulis Oleh/i).first()).toBeVisible();
    });
  });

  // ==========================================
  // Article Cards Structure
  // ==========================================
  test.describe('Article Cards', () => {
    test('should display at least 2 article cards', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 400));
      await page.waitForTimeout(500);
      const articleLinks = page.locator('a[href*="/activities/"]');
      const count = await articleLinks.count();
      expect(count).toBeGreaterThanOrEqual(2);
    });

    test('should display article images', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 400));
      await page.waitForTimeout(500);
      const images = page.locator('img');
      const count = await images.count();
      expect(count).toBeGreaterThan(0);
    });

    test('all article cards should be clickable', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 400));
      await page.waitForTimeout(500);
      const articleLinks = page.locator('a[href*="/activities/"]');
      const count = await articleLinks.count();
      for (let i = 0; i < count; i++) {
        const href = await articleLinks.nth(i).getAttribute('href');
        expect(href).toBeTruthy();
        expect(href).toContain('/activities/');
      }
    });
  });

  // ==========================================
  // Mepo Partnership Mention
  // ==========================================
  test('should display Mepo partner mention in article', async ({ page }) => {
    await page.evaluate(() => window.scrollBy(0, 600));
    await page.waitForTimeout(500);
    await expect(page.getByText(/Mepo/i).first()).toBeVisible();
  });

  // ==========================================
  // Navbar
  // ==========================================
  test('should maintain navbar on Activities page', async ({ page }) => {
    const nav = page.getByRole('navigation');
    await expect(nav).toBeVisible();
    await expect(nav.getByRole('link', { name: /Aktivitas|Explore/i })).toBeVisible();
  });

  // ==========================================
  // Footer on Activities page
  // ==========================================
  test('should display footer on Activities page', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });
});
