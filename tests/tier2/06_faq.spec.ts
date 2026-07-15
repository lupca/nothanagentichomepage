import { test, expect } from '@playwright/test';

test.describe('Feature 6 Tier 2: FAQ Accordion - Boundary Cases', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('6.6.1 should toggle expansion state cleanly upon rapid double-clicking same item', async ({ page }) => {
    const firstFaqHeader = page.locator('#faq button').first();
    const firstFaqPanel = page.locator('#faq div[role="region"]').first();

    // Fast double click
    await firstFaqHeader.click();
    await firstFaqHeader.click();

    await expect(firstFaqHeader).toHaveAttribute('aria-expanded', 'false');
    await expect(firstFaqPanel).toHaveClass(/max-h-0/);
  });

  test('6.6.2 should strictly enforce single-open mutual exclusion rule', async ({ page }) => {
    const faqButtons = page.locator('#faq button');
    
    // Open first FAQ
    await faqButtons.nth(0).click();
    await expect(faqButtons.nth(0)).toHaveAttribute('aria-expanded', 'true');

    // Open second FAQ
    await faqButtons.nth(1).click();
    
    // First should collapse, second should expand
    await expect(faqButtons.nth(0)).toHaveAttribute('aria-expanded', 'false');
    await expect(faqButtons.nth(1)).toHaveAttribute('aria-expanded', 'true');
  });

  test('6.6.3 should support toggling and focus shifting via keyboard focus controls', async ({ page }) => {
    const firstButton = page.locator('#faq button').first();
    await firstButton.focus();
    
    // Toggle via Enter
    await page.keyboard.press('Enter');
    await expect(firstButton).toHaveAttribute('aria-expanded', 'true');
    
    // Toggle via Space
    await page.keyboard.press('Space');
    await expect(firstButton).toHaveAttribute('aria-expanded', 'false');
  });

  test('6.6.4 should correctly map aria-controls and role regions for DOM tree accessibility', async ({ page }) => {
    const faqButtons = page.locator('#faq button');
    const faqPanels = page.locator('#faq div[role="region"]');
    
    const count = await faqButtons.count();
    for (let i = 0; i < count; i++) {
      const btn = faqButtons.nth(i);
      const panel = faqPanels.nth(i);
      
      const controlsId = await btn.getAttribute('aria-controls');
      const panelId = await panel.getAttribute('id');
      expect(controlsId).toBe(panelId);
      await expect(panel).toHaveAttribute('role', 'region');
    }
  });

  test('6.6.5 should ensure bottom security notification remains positive bounds and wraps correctly on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 });
    const notification = page.locator('#faq').locator('text=Hệ thống đạt chứng nhận tiêu chuẩn an ninh thông tin quốc tế');
    await expect(notification).toBeVisible();
    
    const bounds = await notification.boundingBox();
    expect(bounds).not.toBeNull();
    expect(bounds!.width).toBeLessThanOrEqual(300);
  });
});
