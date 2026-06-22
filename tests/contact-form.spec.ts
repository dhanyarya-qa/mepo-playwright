import { test, expect } from './fixtures';

test.describe('Contact Form - Positive & Negative Cases', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/contact-us');
    await page.waitForLoadState('networkidle');
  });

  // ==========================================
  // Text Content Validation
  // ==========================================
  test.describe('Text Content', () => {
    test('should display "Hubungi Kami" or "Contact Us" heading', async ({ page }) => {
      await expect(page.getByText(/Hubungi Kami|Contact Us/i).first()).toBeVisible();
    });

    test('should display "Full Name" or "Nama Lengkap" label', async ({ page }) => {
      await expect(page.getByText(/Full Name|Nama Lengkap/i).first()).toBeVisible();
    });

    test('should display "Phone Number" or "Nomor Telepon" label', async ({ page }) => {
      await expect(page.getByText(/Phone Number|Nomor Telepon|Nomor HP/i).first()).toBeVisible();
    });

    test('should display "Email" label', async ({ page }) => {
      await expect(page.getByText('Email').first()).toBeVisible();
    });

    test('should display "Your Message" or "Pesan" label', async ({ page }) => {
      await expect(page.getByText(/Your Message|Pesan|Pesanmu/i).first()).toBeVisible();
    });

    test('should display name input placeholder', async ({ page }) => {
      const nameInput = page.locator('input[placeholder*="name"], input[placeholder*="nama"], input[placeholder*="Name"], input[placeholder*="Nama"]').first();
      await expect(nameInput).toBeVisible();
    });

    test('should display phone input placeholder', async ({ page }) => {
      const phoneInput = page.locator('input[placeholder*="phone"], input[placeholder*="telepon"], input[placeholder*="Phone"], input[placeholder*="HP"]').first();
      await expect(phoneInput).toBeVisible();
    });

    test('should display email input placeholder', async ({ page }) => {
      const emailInput = page.locator('input[placeholder*="email"], input[placeholder*="Email"]').first();
      await expect(emailInput).toBeVisible();
    });

    test('should display message input placeholder', async ({ page }) => {
      const messageInput = page.locator('input[placeholder*="message"], input[placeholder*="pesan"], input[placeholder*="Message"], input[placeholder*="Pesan"]').first();
      await expect(messageInput).toBeVisible();
    });

    test('should display Submit button', async ({ page }) => {
      const submitBtn = page.locator('button[type="submit"], button:has-text("Submit"), button:has-text("Kirim"), button:has-text("Send")').first();
      await expect(submitBtn).toBeVisible();
    });
  });

  // ==========================================
  // POSITIVE CASES
  // ==========================================
  test.describe('Positive Cases', () => {

    test('should accept valid full name', async ({ page }) => {
      const nameInput = page.locator('input[placeholder*="name"], input[placeholder*="nama"], input[placeholder*="Name"], input[placeholder*="Nama"]').first();
      await nameInput.fill('John Doe');
      await expect(nameInput).toHaveValue('John Doe');
    });

    test('should accept valid phone number (Indonesian format)', async ({ page }) => {
      const phoneInput = page.locator('input[placeholder*="phone"], input[placeholder*="telepon"], input[placeholder*="Phone"], input[placeholder*="HP"]').first();
      await phoneInput.fill('081234567890');
      await expect(phoneInput).toHaveValue('081234567890');
    });

    test('should accept valid phone number with country code', async ({ page }) => {
      const phoneInput = page.locator('input[placeholder*="phone"], input[placeholder*="telepon"], input[placeholder*="Phone"], input[placeholder*="HP"]').first();
      await phoneInput.fill('+6281234567890');
      await expect(phoneInput).toHaveValue('+6281234567890');
    });

    test('should accept valid email address', async ({ page }) => {
      const emailInput = page.locator('input[placeholder*="email"], input[placeholder*="Email"]').first();
      await emailInput.fill('john.doe@example.com');
      await expect(emailInput).toHaveValue('john.doe@example.com');
    });

    test('should accept valid message text', async ({ page }) => {
      const messageInput = page.locator('input[placeholder*="message"], input[placeholder*="pesan"], input[placeholder*="Message"], input[placeholder*="Pesan"]').first();
      await messageInput.fill('Saya tertarik dengan layanan Mepo untuk perjalanan wisata keluarga.');
      await expect(messageInput).toHaveValue('Saya tertarik dengan layanan Mepo untuk perjalanan wisata keluarga.');
    });

    test.skip('should successfully submit form with all valid data', async ({ page }) => {
      // SKIPPED: Test ini di-skip karena mengirim email spam ke penerima
      const nameInput = page.locator('input[placeholder*="name"], input[placeholder*="nama"], input[placeholder*="Name"], input[placeholder*="Nama"]').first();
      const phoneInput = page.locator('input[placeholder*="phone"], input[placeholder*="telepon"], input[placeholder*="Phone"], input[placeholder*="HP"]').first();
      const emailInput = page.locator('input[placeholder*="email"], input[placeholder*="Email"]').first();
      const messageInput = page.locator('input[placeholder*="message"], input[placeholder*="pesan"], input[placeholder*="Message"], input[placeholder*="Pesan"]').first();

      await nameInput.fill('John Doe');
      await phoneInput.fill('081234567890');
      await emailInput.fill('john.doe@example.com');
      await messageInput.fill('Saya tertarik untuk mengetahui lebih lanjut tentang paket wisata Mepo.');
      
      // Verify all fields are filled correctly before submit
      await expect(nameInput).toHaveValue('John Doe');
      await expect(phoneInput).toHaveValue('081234567890');
      await expect(emailInput).toHaveValue('john.doe@example.com');
      
      // Submit the form
      const submitBtn = page.locator('button[type="submit"], button:has-text("Submit"), button:has-text("Kirim")').first();
      await submitBtn.click();
      
      await page.waitForTimeout(2000);
      
      // After successful submission, check for success feedback or form reset
      const successMsg = page.getByText(/success|thank you|terima kasih|berhasil/i).first();
      const isSuccess = await successMsg.isVisible().catch(() => false);
      
      // The form either shows success message or resets
      if (isSuccess) {
        await expect(successMsg).toBeVisible();
      }
    });

    test('should accept name with special characters', async ({ page }) => {
      const nameInput = page.locator('input[placeholder*="name"], input[placeholder*="nama"], input[placeholder*="Name"], input[placeholder*="Nama"]').first();
      await nameInput.fill("Ahmad Rizky Al-Farabi Jr.");
      await expect(nameInput).toHaveValue("Ahmad Rizky Al-Farabi Jr.");
    });

    test('should accept long message', async ({ page }) => {
      const messageInput = page.locator('input[placeholder*="message"], input[placeholder*="pesan"], input[placeholder*="Message"], input[placeholder*="Pesan"]').first();
      const longMessage = 'Saya ingin bertanya tentang paket wisata ke Yogyakarta untuk rombongan 20 orang. Apakah ada diskon khusus untuk corporate outing? Kami juga membutuhkan akomodasi hotel bintang 4 dan transportasi selama 3 hari perjalanan.';
      await messageInput.fill(longMessage);
      await expect(messageInput).toHaveValue(longMessage);
    });

    test('should accept email with subdomain', async ({ page }) => {
      const emailInput = page.locator('input[placeholder*="email"], input[placeholder*="Email"]').first();
      await emailInput.fill('user@mail.company.co.id');
      await expect(emailInput).toHaveValue('user@mail.company.co.id');
    });
  });

  // ==========================================
  // NEGATIVE CASES
  // ==========================================
  test.describe('Negative Cases', () => {

    test('should not submit when ALL fields are empty', async ({ page }) => {
      const submitBtn = page.locator('button[type="submit"], button:has-text("Submit"), button:has-text("Kirim")').first();
      await submitBtn.click();
      
      await page.waitForTimeout(500);
      
      // Form should still be on /contact-us (not submitted)
      await expect(page).toHaveURL(/\/contact-us/);
      
      // Check that required field validation is triggered (HTML5 validation)
      const nameInput = page.locator('input[placeholder*="name"], input[placeholder*="nama"], input[placeholder*="Name"], input[placeholder*="Nama"]').first();
      const isInvalid = await nameInput.evaluate((el: HTMLInputElement) => !el.validity.valid);
      expect(isInvalid).toBeTruthy();
    });

    test('should not submit when Full Name is empty', async ({ page }) => {
      const phoneInput = page.locator('input[placeholder*="phone"], input[placeholder*="telepon"], input[placeholder*="Phone"], input[placeholder*="HP"]').first();
      const emailInput = page.locator('input[placeholder*="email"], input[placeholder*="Email"]').first();
      const messageInput = page.locator('input[placeholder*="message"], input[placeholder*="pesan"], input[placeholder*="Message"], input[placeholder*="Pesan"]').first();

      // Fill all except name
      await phoneInput.fill('081234567890');
      await emailInput.fill('test@test.com');
      await messageInput.fill('Test message');
      
      const submitBtn = page.locator('button[type="submit"], button:has-text("Submit"), button:has-text("Kirim")').first();
      await submitBtn.click();
      await page.waitForTimeout(500);
      
      // Name field should be invalid
      const nameInput = page.locator('input[placeholder*="name"], input[placeholder*="nama"], input[placeholder*="Name"], input[placeholder*="Nama"]').first();
      const isInvalid = await nameInput.evaluate((el: HTMLInputElement) => !el.validity.valid);
      expect(isInvalid).toBeTruthy();
    });

    test('should not submit when Phone Number is empty', async ({ page }) => {
      const nameInput = page.locator('input[placeholder*="name"], input[placeholder*="nama"], input[placeholder*="Name"], input[placeholder*="Nama"]').first();
      const emailInput = page.locator('input[placeholder*="email"], input[placeholder*="Email"]').first();
      const messageInput = page.locator('input[placeholder*="message"], input[placeholder*="pesan"], input[placeholder*="Message"], input[placeholder*="Pesan"]').first();

      await nameInput.fill('John Doe');
      // Skip phone
      await emailInput.fill('test@test.com');
      await messageInput.fill('Test message');
      
      const submitBtn = page.locator('button[type="submit"], button:has-text("Submit"), button:has-text("Kirim")').first();
      await submitBtn.click();
      await page.waitForTimeout(500);
      
      const phoneInput = page.locator('input[placeholder*="phone"], input[placeholder*="telepon"], input[placeholder*="Phone"], input[placeholder*="HP"]').first();
      const isInvalid = await phoneInput.evaluate((el: HTMLInputElement) => !el.validity.valid);
      expect(isInvalid).toBeTruthy();
    });

    test('should not submit when Email is empty', async ({ page }) => {
      const nameInput = page.locator('input[placeholder*="name"], input[placeholder*="nama"], input[placeholder*="Name"], input[placeholder*="Nama"]').first();
      const phoneInput = page.locator('input[placeholder*="phone"], input[placeholder*="telepon"], input[placeholder*="Phone"], input[placeholder*="HP"]').first();
      const messageInput = page.locator('input[placeholder*="message"], input[placeholder*="pesan"], input[placeholder*="Message"], input[placeholder*="Pesan"]').first();

      await nameInput.fill('John Doe');
      await phoneInput.fill('081234567890');
      // Skip email
      await messageInput.fill('Test message');
      
      const submitBtn = page.locator('button[type="submit"], button:has-text("Submit"), button:has-text("Kirim")').first();
      await submitBtn.click();
      await page.waitForTimeout(500);
      
      const emailInput = page.locator('input[placeholder*="email"], input[placeholder*="Email"]').first();
      const isInvalid = await emailInput.evaluate((el: HTMLInputElement) => !el.validity.valid);
      expect(isInvalid).toBeTruthy();
    });

    test('should not submit when Message is empty', async ({ page }) => {
      const nameInput = page.locator('input[placeholder*="name"], input[placeholder*="nama"], input[placeholder*="Name"], input[placeholder*="Nama"]').first();
      const phoneInput = page.locator('input[placeholder*="phone"], input[placeholder*="telepon"], input[placeholder*="Phone"], input[placeholder*="HP"]').first();
      const emailInput = page.locator('input[placeholder*="email"], input[placeholder*="Email"]').first();

      await nameInput.fill('John Doe');
      await phoneInput.fill('081234567890');
      await emailInput.fill('test@test.com');
      // Skip message
      
      const submitBtn = page.locator('button[type="submit"], button:has-text("Submit"), button:has-text("Kirim")').first();
      await submitBtn.click();
      await page.waitForTimeout(500);
      
      const messageInput = page.locator('input[placeholder*="message"], input[placeholder*="pesan"], input[placeholder*="Message"], input[placeholder*="Pesan"]').first();
      const isInvalid = await messageInput.evaluate((el: HTMLInputElement) => !el.validity.valid);
      expect(isInvalid).toBeTruthy();
    });

    test('should accept invalid email without @ (no client-side email format validation)', async ({ page }) => {
      // NOTE: Email input is type="text", not type="email"
      // This means the browser does NOT validate email format natively.
      // This test documents this behavior — invalid emails are accepted.
      const nameInput = page.locator('input[placeholder*="name"], input[placeholder*="nama"], input[placeholder*="Name"], input[placeholder*="Nama"]').first();
      const phoneInput = page.locator('input[placeholder*="phone"], input[placeholder*="telepon"], input[placeholder*="Phone"], input[placeholder*="HP"]').first();
      const emailInput = page.locator('input[placeholder*="email"], input[placeholder*="Email"]').first();
      const messageInput = page.locator('input[placeholder*="message"], input[placeholder*="pesan"], input[placeholder*="Message"], input[placeholder*="Pesan"]').first();

      await nameInput.fill('John Doe');
      await phoneInput.fill('081234567890');
      await emailInput.fill('invalidemail.com');
      await messageInput.fill('Test');
      
      // Verify the email input type is "text" (not "email")
      await expect(emailInput).toHaveAttribute('type', 'text');
      // Invalid email is accepted since there's no format validation
      await expect(emailInput).toHaveValue('invalidemail.com');
    });

    test('should accept email without domain (no client-side email format validation)', async ({ page }) => {
      const nameInput = page.locator('input[placeholder*="name"], input[placeholder*="nama"], input[placeholder*="Name"], input[placeholder*="Nama"]').first();
      const phoneInput = page.locator('input[placeholder*="phone"], input[placeholder*="telepon"], input[placeholder*="Phone"], input[placeholder*="HP"]').first();
      const emailInput = page.locator('input[placeholder*="email"], input[placeholder*="Email"]').first();
      const messageInput = page.locator('input[placeholder*="message"], input[placeholder*="pesan"], input[placeholder*="Message"], input[placeholder*="Pesan"]').first();

      await nameInput.fill('John Doe');
      await phoneInput.fill('081234567890');
      await emailInput.fill('user@');
      await messageInput.fill('Test');
      
      await expect(emailInput).toHaveAttribute('type', 'text');
      await expect(emailInput).toHaveValue('user@');
    });

    test('should accept email with double @ (no client-side email format validation)', async ({ page }) => {
      const nameInput = page.locator('input[placeholder*="name"], input[placeholder*="nama"], input[placeholder*="Name"], input[placeholder*="Nama"]').first();
      const phoneInput = page.locator('input[placeholder*="phone"], input[placeholder*="telepon"], input[placeholder*="Phone"], input[placeholder*="HP"]').first();
      const emailInput = page.locator('input[placeholder*="email"], input[placeholder*="Email"]').first();
      const messageInput = page.locator('input[placeholder*="message"], input[placeholder*="pesan"], input[placeholder*="Message"], input[placeholder*="Pesan"]').first();

      await nameInput.fill('John Doe');
      await phoneInput.fill('081234567890');
      await emailInput.fill('user@@example.com');
      await messageInput.fill('Test');
      
      await expect(emailInput).toHaveAttribute('type', 'text');
      await expect(emailInput).toHaveValue('user@@example.com');
    });

    test('should accept email with spaces (no client-side email format validation)', async ({ page }) => {
      const nameInput = page.locator('input[placeholder*="name"], input[placeholder*="nama"], input[placeholder*="Name"], input[placeholder*="Nama"]').first();
      const phoneInput = page.locator('input[placeholder*="phone"], input[placeholder*="telepon"], input[placeholder*="Phone"], input[placeholder*="HP"]').first();
      const emailInput = page.locator('input[placeholder*="email"], input[placeholder*="Email"]').first();
      const messageInput = page.locator('input[placeholder*="message"], input[placeholder*="pesan"], input[placeholder*="Message"], input[placeholder*="Pesan"]').first();

      await nameInput.fill('John Doe');
      await phoneInput.fill('081234567890');
      await emailInput.fill('user @example.com');
      await messageInput.fill('Test');
      
      await expect(emailInput).toHaveAttribute('type', 'text');
      await expect(emailInput).toHaveValue('user @example.com');
    });

    test('should accept only @ as email (no client-side email format validation)', async ({ page }) => {
      const nameInput = page.locator('input[placeholder*="name"], input[placeholder*="nama"], input[placeholder*="Name"], input[placeholder*="Nama"]').first();
      const phoneInput = page.locator('input[placeholder*="phone"], input[placeholder*="telepon"], input[placeholder*="Phone"], input[placeholder*="HP"]').first();
      const emailInput = page.locator('input[placeholder*="email"], input[placeholder*="Email"]').first();
      const messageInput = page.locator('input[placeholder*="message"], input[placeholder*="pesan"], input[placeholder*="Message"], input[placeholder*="Pesan"]').first();

      await nameInput.fill('John Doe');
      await phoneInput.fill('081234567890');
      await emailInput.fill('@');
      await messageInput.fill('Test');
      
      await expect(emailInput).toHaveAttribute('type', 'text');
      await expect(emailInput).toHaveValue('@');
    });

    test('should accept phone with non-numeric characters (no server-side validation)', async ({ page }) => {
      // Note: Website does NOT validate phone format client-side
      const phoneInput = page.locator('input[placeholder*="phone"], input[placeholder*="telepon"], input[placeholder*="Phone"], input[placeholder*="HP"]').first();
      await phoneInput.fill('abc-not-a-phone');
      await expect(phoneInput).toHaveValue('abc-not-a-phone');
    });

    test('should handle only spaces in name field', async ({ page }) => {
      const nameInput = page.locator('input[placeholder*="name"], input[placeholder*="nama"], input[placeholder*="Name"], input[placeholder*="Nama"]').first();
      await nameInput.fill('   ');
      await expect(nameInput).toHaveValue('   ');
      
      // Fill remaining fields
      const phoneInput = page.locator('input[placeholder*="phone"], input[placeholder*="telepon"], input[placeholder*="Phone"], input[placeholder*="HP"]').first();
      const emailInput = page.locator('input[placeholder*="email"], input[placeholder*="Email"]').first();
      const messageInput = page.locator('input[placeholder*="message"], input[placeholder*="pesan"], input[placeholder*="Message"], input[placeholder*="Pesan"]').first();

      await phoneInput.fill('081234567890');
      await emailInput.fill('test@test.com');
      await messageInput.fill('Test');
      
      const submitBtn = page.locator('button[type="submit"], button:has-text("Submit"), button:has-text("Kirim")').first();
      await submitBtn.click();
      await page.waitForTimeout(500);
    });

    test('should handle SQL injection in name field', async ({ page }) => {
      const nameInput = page.locator('input[placeholder*="name"], input[placeholder*="nama"], input[placeholder*="Name"], input[placeholder*="Nama"]').first();
      await nameInput.fill("'; DROP TABLE users; --");
      await expect(nameInput).toHaveValue("'; DROP TABLE users; --");
    });

    test('should handle XSS input in message field', async ({ page }) => {
      const messageInput = page.locator('input[placeholder*="message"], input[placeholder*="pesan"], input[placeholder*="Message"], input[placeholder*="Pesan"]').first();
      await messageInput.fill('<script>alert("XSS")</script>');
      await expect(messageInput).toHaveValue('<script>alert("XSS")</script>');
    });

    test('should handle very long input in name field', async ({ page }) => {
      const nameInput = page.locator('input[placeholder*="name"], input[placeholder*="nama"], input[placeholder*="Name"], input[placeholder*="Nama"]').first();
      const longName = 'A'.repeat(500);
      await nameInput.fill(longName);
      // Should accept or truncate but not crash
      const value = await nameInput.inputValue();
      expect(value.length).toBeGreaterThan(0);
    });

    test('should handle emoji in message field', async ({ page }) => {
      const messageInput = page.locator('input[placeholder*="message"], input[placeholder*="pesan"], input[placeholder*="Message"], input[placeholder*="Pesan"]').first();
      await messageInput.fill('Hello 😀🎉🌍 Travel is fun!');
      await expect(messageInput).toHaveValue('Hello 😀🎉🌍 Travel is fun!');
    });

    test('should handle special characters in email local part', async ({ page }) => {
      const nameInput = page.locator('input[placeholder*="name"], input[placeholder*="nama"], input[placeholder*="Name"], input[placeholder*="Nama"]').first();
      const phoneInput = page.locator('input[placeholder*="phone"], input[placeholder*="telepon"], input[placeholder*="Phone"], input[placeholder*="HP"]').first();
      const emailInput = page.locator('input[placeholder*="email"], input[placeholder*="Email"]').first();
      const messageInput = page.locator('input[placeholder*="message"], input[placeholder*="pesan"], input[placeholder*="Message"], input[placeholder*="Pesan"]').first();

      await nameInput.fill('John');
      await phoneInput.fill('08123');
      await emailInput.fill('user+tag@example.com');
      await messageInput.fill('Test');
      
      const isValid = await emailInput.evaluate((el: HTMLInputElement) => el.validity.valid);
      expect(isValid).toBeTruthy();
    });
  });
});
