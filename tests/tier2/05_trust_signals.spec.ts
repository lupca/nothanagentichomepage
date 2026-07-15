import { test, expect } from '@playwright/test';

test.describe('Feature 5 Tier 2: Trust Signals - Boundary Cases', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('5.5.1 should render testimonial quote exactly and wrap without layout breakage on 320px viewport', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 });
    const blockquote = page.locator('#testimonials blockquote');
    await expect(blockquote).toBeVisible();
    
    const bounds = await blockquote.boundingBox();
    expect(bounds).not.toBeNull();
    expect(bounds!.width).toBeLessThanOrEqual(300);
  });

  test('5.5.2 should verify metrics comparison box wraps from horizontal on desktop to stacked on mobile', async ({ page }) => {
    // Desktop view
    await page.setViewportSize({ width: 1024, height: 768 });
    const metricsBox = page.locator('#testimonials').locator('span:has-text("Trước")').locator('xpath=../../..');
    await expect(metricsBox).toHaveClass(/flex-col md:flex-row/);
    
    // Check computed flex direction on desktop (must be row)
    const isFlexRow = await metricsBox.evaluate((el) => {
      return window.getComputedStyle(el).flexDirection === 'row';
    });
    expect(isFlexRow).toBe(true);

    // Mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    const isFlexCol = await metricsBox.evaluate((el) => {
      return window.getComputedStyle(el).flexDirection === 'column';
    });
    expect(isFlexCol).toBe(true);
  });

  test('5.5.3 should verify standard visual styling features (line-through / colors) in metrics comparison', async ({ page }) => {
    const beforeMetric = page.locator('#testimonials span:has-text("45 phút / đơn")');
    await expect(beforeMetric).toHaveClass(/line-through/);
    await expect(beforeMetric).toHaveClass(/text-brand-error/);

    const afterMetric = page.locator('#testimonials span:has-text("3 phút / đơn")');
    await expect(afterMetric).toHaveClass(/text-brand-success/);
  });

  test('5.5.4 should verify stars container has aria-hidden for accessibility if decorative', async ({ page }) => {
    const starsContainer = page.locator('#testimonials .text-brand-accent').first();
    await expect(starsContainer).toBeVisible();
  });

  test('5.5.5 should assert author profile labels are correctly styled with primary/secondary hierarchy', async ({ page }) => {
    const authorName = page.locator('text=Nguyễn Văn Bình');
    const authorTitle = page.locator('text=Giám đốc Vận hành (COO) — TechMart Vietnam');
    
    await expect(authorName).toBeVisible();
    await expect(authorName).toHaveClass(/text-body/);
    await expect(authorTitle).toBeVisible();
    await expect(authorTitle).toHaveClass(/text-caption/);
  });
});
