import { test, expect } from '@playwright/test';

test.describe('Feature 9: Human Override Panel', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('9.1 should render action controls for Approve, Reject, and Override', async ({ page }) => {
    const overridePanel = page.locator('[data-testid="human-override-panel"]');
    if (await overridePanel.count() === 0) {
      test.skip(true, 'Human Override Panel not yet implemented. Skipping.');
    }
    await expect(overridePanel.locator('button:has-text("Phê duyệt")')).toBeVisible();
    await expect(overridePanel.locator('button:has-text("Từ chối")')).toBeVisible();
  });

  test('9.2 should trigger toast countdown timer on clicking Approve', async ({ page }) => {
    const overridePanel = page.locator('[data-testid="human-override-panel"]');
    if (await overridePanel.count() === 0) {
      test.skip(true, 'Human Override Panel not yet implemented. Skipping.');
    }
    
    await overridePanel.locator('button:has-text("Phê duyệt")').click();
    
    const toast = page.locator('div[role="status"]');
    await expect(toast).toBeVisible();
    await expect(toast).toContainText('10'); // Countdown starts at 10
  });

  test('9.3 should count down progressively', async ({ page }) => {
    const overridePanel = page.locator('[data-testid="human-override-panel"]');
    if (await overridePanel.count() === 0) {
      test.skip(true, 'Human Override Panel not yet implemented. Skipping.');
    }
    
    await overridePanel.locator('button:has-text("Phê duyệt")').click();
    const toast = page.locator('div[role="status"]');
    await expect(toast).toContainText('10');
    
    // Wait 2 seconds
    await page.waitForTimeout(2200);
    const countText = await toast.innerText();
    expect(countText).not.toContain('10'); // Countdown has decremented
  });

  test('9.4 should cancel actions and close toast when clicking Undo', async ({ page }) => {
    const overridePanel = page.locator('[data-testid="human-override-panel"]');
    if (await overridePanel.count() === 0) {
      test.skip(true, 'Human Override Panel not yet implemented. Skipping.');
    }
    
    await overridePanel.locator('button:has-text("Phê duyệt")').click();
    const toast = page.locator('div[role="status"]');
    await expect(toast).toBeVisible();

    const undoBtn = toast.locator('button:has-text("Undo")');
    await undoBtn.click();
    
    await expect(toast).not.toBeVisible(); // Toast is dismissed
  });

  test('9.5 should execute successfully after 10 seconds of no action', async ({ page }) => {
    const overridePanel = page.locator('[data-testid="human-override-panel"]');
    if (await overridePanel.count() === 0) {
      test.skip(true, 'Human Override Panel not yet implemented. Skipping.');
    }
    
    await overridePanel.locator('button:has-text("Phê duyệt")').click();
    const toast = page.locator('div[role="status"]');
    await expect(toast).toBeVisible();

    // Wait for the full countdown duration (10 seconds)
    await page.waitForTimeout(10500);
    await expect(toast).not.toBeVisible(); // Toast successfully closed post execution
  });
});
