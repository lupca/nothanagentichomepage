import { test, expect } from '@playwright/test';

test.describe('Feature 3 Tier 2: How It Works - Boundary Cases', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('3.3.1 should hide desktop transition arrows on mobile/tablet resolutions', async ({ page }) => {
    await page.setViewportSize({ width: 640, height: 480 });
    const arrows = page.locator('#how-it-works svg.lucide-arrow-right');
    const count = await arrows.count();
    for (let i = 0; i < count; i++) {
      await expect(arrows.nth(i)).toBeHidden();
    }
  });

  test('3.3.2 should wrap step description strings without text clipping at 320px viewport', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 });
    const descriptions = page.locator('#how-it-works p.text-body');
    const count = await descriptions.count();
    for (let i = 0; i < count; i++) {
      const bounds = await descriptions.nth(i).boundingBox();
      expect(bounds).not.toBeNull();
      expect(bounds!.width).toBeLessThanOrEqual(300); // Fit in 320px screen with padding
    }
  });

  test('3.3.3 should display proper styling transition when hovering on steps cards', async ({ page }) => {
    const firstStepCard = page.locator('#how-it-works .grid > div').first();
    await expect(firstStepCard).toBeVisible();
    
    await firstStepCard.hover();
    await expect(firstStepCard).toHaveClass(/hover:shadow-md/);
  });

  test('3.3.4 should navigate and scroll exactly to section when utilizing anchor link', async ({ page }) => {
    const target = page.locator('#how-it-works');
    await page.goto('/#how-it-works');
    await expect(target).toBeInViewport();
  });

  test('3.3.5 should contain structured grid that fits within screen constraints on desktop (1280px)', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    const firstStep = page.locator('#how-it-works .grid > div').nth(0);
    const secondStep = page.locator('#how-it-works .grid > div').nth(1);
    
    const bounds1 = await firstStep.boundingBox();
    const bounds2 = await secondStep.boundingBox();
    
    expect(bounds1).not.toBeNull();
    expect(bounds2).not.toBeNull();
    // In grid layout, they should be horizontally aligned (same top coordinate)
    expect(Math.abs(bounds1!.y - bounds2!.y)).toBeLessThan(5);
  });
});
