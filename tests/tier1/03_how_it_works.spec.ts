import { test, expect } from '@playwright/test';

test.describe('Feature 3: How It Works', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('3.1 should render the How It Works section and heading', async ({ page }) => {
    const section = page.locator('section#how-it-works');
    await expect(section).toBeVisible();
    const heading = page.locator('h2:has-text("Quy Trình 3 Bước Đơn Giản")');
    await expect(heading).toBeVisible();
  });

  test('3.2 should display Step 1: Connect with correct details', async ({ page }) => {
    const step1 = page.locator('div.group:has-text("01")');
    await expect(step1).toBeVisible();
    await expect(step1.locator('h3')).toHaveText('Kết nối (Connect)');
    await expect(step1.locator('p')).toContainText('Liên kết dữ liệu bán hàng đa kênh');
  });

  test('3.3 should display Step 2: Analyze with correct details', async ({ page }) => {
    const step2 = page.locator('div.group:has-text("02")');
    await expect(step2).toBeVisible();
    await expect(step2.locator('h3')).toHaveText('Phân tích (Analyze)');
    await expect(step2.locator('p')).toContainText('Hệ thống AI tự động xử lý số liệu');
  });

  test('3.4 should display Step 3: Approve with correct details', async ({ page }) => {
    const step3 = page.locator('div.group:has-text("03")');
    await expect(step3).toBeVisible();
    await expect(step3.locator('h3')).toHaveText('Phê duyệt (Approve)');
    await expect(step3.locator('p')).toContainText('AI đề xuất hành động tối ưu');
  });

  test('3.5 should contain transition arrows in desktop layout', async ({ page }) => {
    // Set screen size to desktop
    await page.setViewportSize({ width: 1280, height: 800 });
    const arrow = page.locator('#how-it-works .hidden.md\\:block');
    await expect(arrow.first()).toBeVisible();
    await expect(arrow).toHaveCount(2);
  });
});
