import { test, expect } from '@playwright/test';

test.describe('Feature 7: Lead Capture Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('7.1 should register lead successfully on valid inputs (Happy Path)', async ({ page }) => {
    await page.fill('input#email', 'business@nothanagentic.vn');
    await page.fill('input#company', 'VinGroup Joint Stock');
    await page.fill('input#phone', '0912345678');
    
    await page.click('button[type="submit"]');

    // Form submission has a simulated 1s delay
    const successAlert = page.locator('div[role="alert"]');
    await expect(successAlert).toBeVisible({ timeout: 2000 });
    await expect(successAlert.locator('h3')).toHaveText('Đăng Ký Thành Công!');
  });

  test('7.2 should display error messages on empty submissions', async ({ page }) => {
    await page.click('button[type="submit"]');

    const emailErr = page.locator('p[role="alert"]:near(input#email)');
    const companyErr = page.locator('p[role="alert"]:near(input#company)');
    const phoneErr = page.locator('p[role="alert"]:near(input#phone)');

    await expect(emailErr.first()).toContainText('Vui lòng nhập email công việc');
    await expect(companyErr.first()).toContainText('Tên công ty phải có ít nhất 2 ký tự');
    await expect(phoneErr.first()).toContainText('Vui lòng nhập số điện thoại');
  });

  test('7.3 should trigger validation warning on invalid email formats', async ({ page }) => {
    await page.fill('input#email', 'invalid-email-format');
    await page.fill('input#company', 'A Company');
    await page.fill('input#phone', '0987654321');
    
    await page.click('button[type="submit"]');

    const emailErr = page.locator('p[role="alert"]:near(input#email)');
    await expect(emailErr.first()).toContainText('Định dạng email công việc không hợp lệ');
  });

  test('7.4 should trigger validation warning on non-Vietnamese phone prefixes', async ({ page }) => {
    await page.fill('input#email', 'business@nothanagentic.vn');
    await page.fill('input#company', 'A Company');
    // Prefix 01 is not a valid Vietnamese prefix anymore, must start with 03/05/07/08/09
    await page.fill('input#phone', '0123456789');
    
    await page.click('button[type="submit"]');

    const phoneErr = page.locator('p[role="alert"]:near(input#phone)');
    await expect(phoneErr.first()).toContainText('Số điện thoại Việt Nam không hợp lệ');
  });

  test('7.5 should allow re-submitting after form reset', async ({ page }) => {
    // Fill and submit successfully
    await page.fill('input#email', 'sales@agency.vn');
    await page.fill('input#company', 'Agency Co');
    await page.fill('input#phone', '0901234567');
    await page.click('button[type="submit"]');
    
    const resetBtn = page.locator('button:has-text("Gửi lại yêu cầu khác")');
    await expect(resetBtn).toBeVisible({ timeout: 2000 });
    
    // Click reset to show form again
    await resetBtn.click();
    await expect(page.locator('input#email')).toBeEmpty();
    await expect(page.locator('input#email')).toBeVisible();
  });
});
