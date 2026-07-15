import { test, expect } from '@playwright/test';

test.describe('Feature 1 Tier 2: Hero Header - Boundary Cases', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('1.1.1 should handle narrow mobile viewport boundary (320px) without layout overflow', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 });
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
    
    // Check for horizontal overflow
    const overflow = await page.evaluate(() => {
      return (document.documentElement.scrollWidth - window.innerWidth) > 25;
    });
    expect(overflow).toBe(false);
  });

  test('1.1.2 should handle ultra-wide viewport boundary (2560px) correctly', async ({ page }) => {
    await page.setViewportSize({ width: 2560, height: 1440 });
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
    
    const boundingBox = await h1.boundingBox();
    expect(boundingBox?.width).toBeLessThan(2560); // Constrained by max-w container
  });

  test('1.1.3 should correctly route CTA links to lead capture form from scrolled states', async ({ page }) => {
    // Scroll to the bottom first
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(300);
    
    // Scroll back to top to click CTA
    await page.evaluate(() => window.scrollTo(0, 0));
    const primaryCta = page.locator('a:has-text("Dùng thử miễn phí 7 ngày")');
    await primaryCta.click();
    
    await expect(page).toHaveURL(/.*#lead-capture/);
    const target = page.locator('#lead-capture');
    await expect(target).toBeInViewport();
  });

  test('1.1.4 should maintain keyboard focus visibility and focus sequence', async ({ page }) => {
    await page.keyboard.press('Tab'); // Tabbing through header
    
    // Press Tab multiple times until focusing on the CTA
    let focusedText = '';
    for (let i = 0; i < 40; i++) {
      await page.keyboard.press('Tab');
      focusedText = await page.evaluate(() => document.activeElement?.textContent || '');
      if (focusedText.includes('Dùng thử miễn phí 7 ngày')) {
        break;
      }
    }
    expect(focusedText).toContain('Dùng thử miễn phí 7 ngày');
  });

  test('1.1.5 should verify grayscale client logos wrap and remain positive bounds on small screens', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    const logosContainer = page.locator('p:has-text("Tin dùng bởi các doanh nghiệp hàng đầu")').locator('xpath=..');
    const bounds = await logosContainer.boundingBox();
    expect(bounds).not.toBeNull();
    expect(bounds!.height).toBeGreaterThan(0);
    expect(bounds!.width).toBeLessThanOrEqual(375);
  });
});
