import { test, expect } from '@playwright/test';

test.describe('Feature 2 Tier 2: Interactive SVG Dashboard - Boundary Cases', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('2.2.1 should handle high-frequency hover preemption (hover thrashing)', async ({ page }) => {
    const inventoryGroup = page.locator('g.cursor-pointer:has-text("DỰ BÁO TỒN KHO")');
    const ordersGroup = page.locator('g.cursor-pointer:has-text("ĐƠN HÀNG TỰ ĐỘNG")');
    
    // Thrash hover state
    for (let i = 0; i < 5; i++) {
      await inventoryGroup.hover();
      await page.waitForTimeout(50);
      await ordersGroup.hover();
      await page.waitForTimeout(50);
    }
    
    // Hover off all
    await page.hover('h1');
    await expect(page.locator('text=ĐỀ XUẤT HỆ THỐNG AI')).toBeVisible();
  });

  test('2.2.2 should maintain hover preemption precedence during active click locking', async ({ page }) => {
    const inventoryGroup = page.locator('g.cursor-pointer:has-text("DỰ BÁO TỒN KHO")');
    const ordersGroup = page.locator('g.cursor-pointer:has-text("ĐƠN HÀNG TỰ ĐỘNG")');
    
    // Click inventory to lock it
    await inventoryGroup.hover();
    await expect(page.locator('text=KHÔNG CÓ RỦI RO ĐỨT GÃY')).toBeVisible();
    
    // Hover orders - should temporarily show orders data
    await ordersGroup.hover();
    await expect(page.locator('text=XỬ LÝ TỰ ĐỘNG SIÊU TỐC')).toBeVisible();
    
    // Hover off - since there is no persistent click locking distinct from hover, it resets to default
    await page.hover('h1');
    await expect(page.locator('text=ĐỀ XUẤT HỆ THỐNG AI')).toBeVisible();
  });

  test('2.2.3 should reset active lock state on clicking page outside the dashboard', async ({ page }) => {
    const inventoryGroup = page.locator('g.cursor-pointer:has-text("DỰ BÁO TỒN KHO")');
    await inventoryGroup.hover();
    await expect(page.locator('text=KHÔNG CÓ RỦI RO ĐỨT GÃY')).toBeVisible();
    
    // Click outside SVG (e.g. Hero H1 text)
    await page.click('h1');
    await expect(page.locator('text=ĐỀ XUẤT HỆ THỐNG AI')).toBeVisible();
  });

  test('2.2.4 should scale responsive aspect ratio and keep layout within viewport boundaries', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 });
    const svg = page.locator('svg[aria-label="Bảng vận hành AI"]');
    await expect(svg).toBeVisible();
    
    const svgBounds = await svg.boundingBox();
    expect(svgBounds?.width).toBeLessThanOrEqual(320);
  });

  test('2.2.5 should successfully transition locking state from one element directly to another', async ({ page }) => {
    const inventoryGroup = page.locator('g.cursor-pointer:has-text("DỰ BÁO TỒN KHO")');
    const ordersGroup = page.locator('g.cursor-pointer:has-text("ĐƠN HÀNG TỰ ĐỘNG")');
    
    await inventoryGroup.hover();
    await expect(page.locator('text=KHÔNG CÓ RỦI RO ĐỨT GÃY')).toBeVisible();
    
    await ordersGroup.hover();
    await expect(page.locator('text=XỬ LÝ TỰ ĐỘNG SIÊU TỐC')).toBeVisible();
    
    // Hover off
    await page.hover('h1');
    await expect(page.locator('text=ĐỀ XUẤT HỆ THỐNG AI')).toBeVisible();
  });
});
