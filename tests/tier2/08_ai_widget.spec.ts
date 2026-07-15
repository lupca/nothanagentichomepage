import { test, expect } from '@playwright/test';

test.describe('Feature 8 Tier 2: AI Decision Support Widget - Boundary Cases', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('8.8.1 should display progress bar width matching aria-valuenow boundaries', async ({ page }) => {
    const widget = page.locator('[data-testid="ai-decision-widget"]');
    await expect(widget).toBeVisible();

    const progressbar = widget.locator('[role="progressbar"]');
    await expect(progressbar).toBeVisible();
    await expect(progressbar).toHaveAttribute('aria-valuenow', '92');
    
    // Verify width styling is exactly 92%
    const fillBar = progressbar.locator('div');
    const widthStyle = await fillBar.getAttribute('style');
    expect(widthStyle?.replace(/\s/g, '')).toContain('width:92%');
  });

  test('8.8.2 should wrap long Vietnamese text in pending items cleanly on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 });
    const widget = page.locator('[data-testid="ai-decision-widget"]');
    await expect(widget).toBeVisible();

    const primaryTask = widget.locator('text=Chuyển 150 sản phẩm từ Kho A sang Kho B').first();
    await expect(primaryTask).toBeVisible();
    
    const bounds = await primaryTask.boundingBox();
    expect(bounds).not.toBeNull();
    expect(bounds!.width).toBeLessThanOrEqual(280);
  });

  test('8.8.3 should render correct warning color theme for the pending count header', async ({ page }) => {
    const header = page.locator('[data-testid="ai-pending-header"]');
    await expect(header).toBeVisible();
    await expect(header).toHaveClass(/(text|bg)-brand-warning|border-brand-warning/);
  });

  test('8.8.4 should ensure clicks on secondary queued list items do not fire event overrides', async ({ page }) => {
    const secondItem = page.locator('li:has-text("Tăng ngân sách quảng cáo TikTok Shop")');
    await expect(secondItem).toBeVisible();
    
    // Click on the display-only queue list item
    await secondItem.click();
    
    // Toast should not show up
    const toast = page.locator('div[role="status"]');
    await expect(toast).not.toBeVisible();
  });

  test('8.8.5 should adjust column alignments responsive layout when changing breakpoints', async ({ page }) => {
    const widget = page.locator('[data-testid="ai-decision-widget"]');
    const cardHeader = widget.locator('.rounded-xl.border.border-white\\/10').first();
    
    // Desktop check: flex alignment
    await page.setViewportSize({ width: 1200, height: 800 });
    const desktopFlex = await cardHeader.locator('> div').first().evaluate((el) => {
      return window.getComputedStyle(el).display;
    });
    expect(desktopFlex).toBe('flex');

    // Mobile check
    await page.setViewportSize({ width: 320, height: 568 });
    const widgetBounds = await widget.boundingBox();
    expect(widgetBounds?.width).toBeLessThanOrEqual(320);
  });
});
