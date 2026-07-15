import { test, expect } from '@playwright/test';

test.describe('Feature 4 Tier 2: Use Case Tiles - Boundary Cases', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('4.4.1 should handle rapid-fire tab clicking correctly and show final selected panel', async ({ page }) => {
    const tabOwner = page.locator('button[role="tab"]:has-text("Chủ doanh nghiệp")');
    const tabWarehouse = page.locator('button[role="tab"]:has-text("Quản lý kho")');
    const tabMarketing = page.locator('button[role="tab"]:has-text("Đội ngũ Marketing")');

    // Click in rapid succession
    await tabWarehouse.click();
    await tabMarketing.click();
    await tabOwner.click();

    // Panel should display owner information
    const activePanel = page.locator('div[role="tabpanel"]');
    await expect(activePanel.locator('h3')).toContainText('Kiểm soát & Tối ưu dòng tiền real-time');
    await expect(tabOwner).toHaveAttribute('aria-selected', 'true');
    await expect(tabWarehouse).toHaveAttribute('aria-selected', 'false');
  });

  test('4.4.2 should support WAI-ARIA keyboard navigation for tab switching', async ({ page }) => {
    const tabOwner = page.locator('button[role="tab"]:has-text("Chủ doanh nghiệp")');
    await tabOwner.focus();
    
    // Move to next tab in focus order
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    
    const tabWarehouse = page.locator('button[role="tab"]:has-text("Quản lý kho")');
    await expect(tabWarehouse).toHaveAttribute('aria-selected', 'true');
  });

  test('4.4.3 should keep tabpanel heights consistent to prevent cumulative layout shifts (CLS)', async ({ page }) => {
    const tabOwner = page.locator('button[role="tab"]:has-text("Chủ doanh nghiệp")');
    const tabWarehouse = page.locator('button[role="tab"]:has-text("Quản lý kho")');
    const panel = page.locator('div[role="tabpanel"]');

    await tabOwner.click();
    const boundsOwner = await panel.boundingBox();

    await tabWarehouse.click();
    const boundsWarehouse = await panel.boundingBox();

    expect(boundsOwner).not.toBeNull();
    expect(boundsWarehouse).not.toBeNull();
    // Height difference should be small to avoid jarring page shifts
    const diff = Math.abs(boundsOwner!.height - boundsWarehouse!.height);
    expect(diff).toBeLessThan(120);
  });

  test('4.4.4 should verify mockup badges update with correct role-specific theme styling', async ({ page }) => {
    const tabMarketing = page.locator('button[role="tab"]:has-text("Đội ngũ Marketing")');
    await tabMarketing.click();

    const panel = page.locator('div[role="tabpanel"]');
    const alert = panel.locator('div.border:has-text("ROI chiến dịch giảm nhanh")').last();
    // Marketing uses warning alert level
    await expect(alert).toHaveClass(/text-brand-warning/);

    const tabWarehouse = page.locator('button[role="tab"]:has-text("Quản lý kho")');
    await tabWarehouse.click();
    const successAlert = panel.locator('div.border:has-text("Chuyển 150sp từ Kho A sang Kho B")').last();
    // Warehouse uses success alert level
    await expect(successAlert).toHaveClass(/text-brand-success/);
  });

  test('4.4.5 should wrap tab buttons horizontally and enable scroll on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 640 });
    const tablist = page.locator('div[role="tablist"]');
    await expect(tablist).toHaveCSS('overflow-x', 'auto');
  });
});
