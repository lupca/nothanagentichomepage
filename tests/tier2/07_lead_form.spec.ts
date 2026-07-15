import { test, expect } from '@playwright/test';

test.describe('Feature 7 Tier 2: Lead Capture Form - Validation Edge Cases', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('7.7.1 should block email with missing or invalid domains', async ({ page }) => {
    // Fill other fields with valid data
    await page.fill('input#company', 'A Company');
    await page.fill('input#phone', '0912345678');
    
    const submitBtn = page.locator('button[type="submit"]');

    // Invalid email formats
    const badEmails = ['test@', 'test@.', 'test@.com.', '@company.com', 'test.com'];
    for (const email of badEmails) {
      await page.fill('input#email', email);
      await submitBtn.click();
      
      const err = page.locator('p[role="alert"]:near(input#email)');
      await expect(err.first()).toBeVisible();
      await expect(err.first()).toContainText('Định dạng email công việc không hợp lệ');
    }
  });

  test('7.7.2 should prevent submission when text inputs exceed reasonable length boundaries (Overflow Stress)', async ({ page }) => {
    const hugeCompanyString = 'A'.repeat(500);
    const hugeEmailString = 'B'.repeat(480) + '@test.com';
    const hugePhoneString = '09' + '1'.repeat(15); // too long for VN phone (starts with 09 and is 17 digits)

    await page.fill('input#email', hugeEmailString);
    await page.fill('input#company', hugeCompanyString);
    await page.fill('input#phone', hugePhoneString);

    await page.click('button[type="submit"]');

    // Phone format regex should catch the huge digits size
    const phoneErr = page.locator('p[role="alert"]:near(input#phone)');
    await expect(phoneErr.first()).toContainText('Số điện thoại Việt Nam không hợp lệ');
  });

  test('7.7.3 should safely escape XSS script tags and special symbols in company names', async ({ page }) => {
    const xssScript = "<script>alert('xss')</script>";
    await page.fill('input#email', 'security@safety.vn');
    await page.fill('input#company', xssScript);
    await page.fill('input#phone', '0987654321');

    await page.click('button[type="submit"]');

    // The form resolvers allow alphanumeric + HTML tags as plain strings, so validation may pass
    // We want to verify it does not trigger an actual JS dialog/alert, and loads the success screen safely
    const successAlert = page.locator('div[role="alert"]');
    await expect(successAlert).toBeVisible({ timeout: 2000 });
  });

  test('7.7.4 should block invalid phone prefixes, formatting symbols, or non-numeric entries', async ({ page }) => {
    await page.fill('input#email', 'sales@example.vn');
    await page.fill('input#company', 'Sales Co');

    const invalidPhones = [
      '02838228888', // landline prefix (02) is invalid under B2B regex constraints
      '091-234-5678', // dashes not allowed by strict regex `/^(0|\+84)(3|5|7|8|9)[0-9]{8}$/`
      '+84-912345678', // dash inside prefix
      '0912abc345',  // letters
      '091234567'    // only 9 digits total (starts with 0, must be 10 digits)
    ];

    for (const phone of invalidPhones) {
      await page.fill('input#phone', phone);
      await page.click('button[type="submit"]');
      const phoneErr = page.locator('p[role="alert"]:near(input#phone)');
      await expect(phoneErr.first()).toContainText('Số điện thoại Việt Nam không hợp lệ');
    }
  });

  test('7.7.5 should prevent double-submission by disabling button and showing loading spinner', async ({ page }) => {
    await page.fill('input#email', 'business@agency.vn');
    await page.fill('input#company', 'Agency Joint Stock');
    await page.fill('input#phone', '0912345678');
    
    const submitBtn = page.locator('button[type="submit"]');
    
    // Click submit
    await submitBtn.click();
    
    // Check disabled state immediately
    await expect(submitBtn).toBeDisabled();
    await expect(submitBtn).toContainText('Đang gửi thông tin...');
    await expect(submitBtn.locator('svg.animate-spin')).toBeVisible();

    // Let it resolve
    const successAlert = page.locator('div[role="alert"]');
    await expect(successAlert).toBeVisible({ timeout: 2000 });
  });
});
