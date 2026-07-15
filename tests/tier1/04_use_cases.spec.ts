import { test, expect } from '@playwright/test';

test.describe('Feature 4: Use Case Tiles', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('4.1 should display the Use Cases section with 3 tabs and Owner active by default', async ({ page }) => {
    const section = page.locator('section#use-cases');
    await expect(section).toBeVisible();
    
    const ownerTab = page.locator('button[role="tab"]:has-text("Chủ doanh nghiệp")');
    await expect(ownerTab).toHaveAttribute('aria-selected', 'true');

    const activePanel = page.locator('div[role="tabpanel"]');
    await expect(activePanel).toContainText('Kiểm soát & Tối ưu dòng tiền real-time');
    await expect(activePanel).toContainText('-30%'); // Owner metric
  });

  test('4.2 should switch content successfully when clicking Warehouse Manager tab', async ({ page }) => {
    const warehouseTab = page.locator('button[role="tab"]:has-text("Quản lý kho")');
    await warehouseTab.click();

    await expect(warehouseTab).toHaveAttribute('aria-selected', 'true');
    const activePanel = page.locator('div[role="tabpanel"]');
    await expect(activePanel).toContainText('Tự động dự báo nhu cầu & Đồng bộ tồn kho');
    await expect(activePanel).toContainText('99.8%'); // Warehouse metric
    await expect(activePanel).toContainText('Khuyến nghị: Chuyển 150sp từ Kho A sang Kho B');
  });

  test('4.3 should switch content successfully when clicking Marketing Team tab', async ({ page }) => {
    const marketingTab = page.locator('button[role="tab"]:has-text("Đội ngũ Marketing")');
    await marketingTab.click();

    await expect(marketingTab).toHaveAttribute('aria-selected', 'true');
    const activePanel = page.locator('div[role="tabpanel"]');
    await expect(activePanel).toContainText('Tối ưu hóa ngân sách quảng cáo thông minh');
    await expect(activePanel).toContainText('+45%'); // Marketing metric
  });

  test('4.4 should verify checklist checkmarks within the selected use case detail panel', async ({ page }) => {
    const ownerTab = page.locator('button[role="tab"]:has-text("Chủ doanh nghiệp")');
    await ownerTab.click();

    const activePanel = page.locator('div[role="tabpanel"]');
    await expect(activePanel.locator('li:has-text("Dự báo dòng tiền chính xác 95%")')).toBeVisible();
    await expect(activePanel.locator('li:has-text("Cắt giảm chi phí vận hành đến 30%")')).toBeVisible();
  });

  test('4.5 should verify standard ARIA accessibility roles exist on the elements', async ({ page }) => {
    const tablist = page.locator('div[role="tablist"]');
    await expect(tablist).toBeVisible();
    
    const tabs = page.locator('button[role="tab"]');
    await expect(tabs).toHaveCount(3);
    
    const panel = page.locator('div[role="tabpanel"]');
    await expect(panel).toBeVisible();
  });
});
