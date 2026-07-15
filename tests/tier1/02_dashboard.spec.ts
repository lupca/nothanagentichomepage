import { test, expect } from '@playwright/test';

test.describe('Feature 2: Interactive SVG Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('2.1 should render the interactive SVG element successfully', async ({ page }) => {
    const dashboardSvg = page.locator('svg[aria-label="Bảng vận hành AI"]');
    await expect(dashboardSvg).toBeVisible();
  });

  test('2.2 should display the default recommend text before user interaction', async ({ page }) => {
    const defaultText = page.locator('text=ĐỀ XUẤT HỆ THỐNG AI');
    const instructionText = page.locator('text=Hover hoặc click vào các ô trên để phân tích dữ liệu chi tiết');
    await expect(defaultText).toBeVisible();
    await expect(instructionText).toBeVisible();
  });

  test('2.3 should display inventory recommendations upon hovering "DỰ BÁO TỒN KHO"', async ({ page }) => {
    const inventoryGroup = page.locator('g.cursor-pointer:has-text("DỰ BÁO TỒN KHO")');
    await expect(inventoryGroup).toBeVisible();
    
    // Hover over the inventory widget
    await inventoryGroup.hover();
    
    const recommendHeader = page.locator('text=KHÔNG CÓ RỦI RO ĐỨT GÃY');
    const recommendText = page.locator('text=Đã đồng bộ tồn kho Shopee & TikTok Shop');
    const warningText = page.locator('text=Khuyến nghị: Chuyển 150sp từ Kho A sang B');
    
    await expect(recommendHeader).toBeVisible();
    await expect(recommendText).toBeVisible();
    await expect(warningText).toBeVisible();
  });

  test('2.4 should display order statistics recommendations upon hovering "ĐƠN HÀNG TỰ ĐỘNG"', async ({ page }) => {
    const ordersGroup = page.locator('g.cursor-pointer:has-text("ĐƠN HÀNG TỰ ĐỘNG")');
    await expect(ordersGroup).toBeVisible();
    
    // Hover over the orders widget
    await ordersGroup.hover();
    
    const recommendHeader = page.locator('text=XỬ LÝ TỰ ĐỘNG SIÊU TỐC');
    const durationText = page.locator('text=Thời gian xử lý trung bình: 1.2s / đơn hàng');
    const rateText = page.locator('text=Tỷ lệ tự động hoàn thành: 94.2%');
    
    await expect(recommendHeader).toBeVisible();
    await expect(durationText).toBeVisible();
    await expect(rateText).toBeVisible();
  });

  test('2.5 should toggle recommendations state on clicking SVG elements', async ({ page }) => {
    const inventoryGroup = page.locator('g.cursor-pointer:has-text("DỰ BÁO TỒN KHO")');
    
    // Click to lock/open recommendation detail
    await inventoryGroup.click();
    await expect(page.locator('text=KHÔNG CÓ RỦI RO ĐỨT GÃY')).toBeVisible();

    // Click again to toggle off/revert to default instructions
    await inventoryGroup.click();
    await expect(page.locator('text=ĐỀ XUẤT HỆ THỐNG AI')).toBeVisible();
  });
});
