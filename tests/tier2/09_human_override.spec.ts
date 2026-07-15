import { test, expect } from '@playwright/test';

test.describe('Feature 9 Tier 2: Human Override Panel - Boundary Cases', () => {
  test.beforeEach(async ({ page }) => {
    await page.clock.install();
    await page.goto('/');
  });

  test('9.9.1 should instantly preempt timer countdown and reset seconds upon clicking different action buttons', async ({ page }) => {
    const panel = page.locator('[data-testid="human-override-panel"]');
    const approveBtn = panel.locator('button:has-text("Phê duyệt")');
    const rejectBtn = panel.locator('button:has-text("Từ chối")');

    await approveBtn.click();
    const toast = page.locator('div[role="status"]');
    await expect(toast).toBeVisible();
    await expect(toast).toContainText('Đã phê duyệt · Hoàn tất sau 10s');

    // Wait a couple seconds
    await page.clock.runFor(2000);
    
    // Click Reject - should immediately preempt and reset countdown
    await rejectBtn.click();
    await expect(toast).toContainText('Đã từ chối · Hoàn tất sau 10s');
  });

  test('9.9.2 should prevent countdown timer speed-up / intervals stack under button spamming', async ({ page }) => {
    const panel = page.locator('[data-testid="human-override-panel"]');
    const approveBtn = panel.locator('button:has-text("Phê duyệt")');

    // Spam click the same action
    for (let i = 0; i < 5; i++) {
      await approveBtn.click();
      await page.clock.runFor(50);
    }

    const toast = page.locator('div[role="status"]');
    await expect(toast).toBeVisible();
    await expect(toast).toContainText('10s');

    // Wait 2.2 seconds and verify timer is at 8s, not lower (no stacked interval reducing time too fast)
    await page.clock.runFor(2200);
    await expect(toast).toContainText('8s');
    await expect(toast).not.toContainText('5s');
    await expect(toast).not.toContainText('6s');
  });

  test('9.9.3 should completely stop countdown timer and dismiss toast upon clicking Undo', async ({ page }) => {
    const panel = page.locator('[data-testid="human-override-panel"]');
    await panel.locator('button:has-text("Phê duyệt")').click();

    const toast = page.locator('div[role="status"]');
    await expect(toast).toBeVisible();

    await page.clock.runFor(3000); // Wait 3 seconds
    await toast.locator('button:has-text("Undo")').click();

    await expect(toast).not.toBeVisible();

    // Wait another 8 seconds to ensure no delayed countdown fires
    await page.clock.runFor(8000);
    await expect(toast).not.toBeVisible();
  });

  test('9.9.4 should successfully terminate execution at 0 seconds transition state', async ({ page }) => {
    const panel = page.locator('[data-testid="human-override-panel"]');
    await panel.locator('button:has-text("Phê duyệt")').click();

    const toast = page.locator('div[role="status"]');
    await expect(toast).toBeVisible();

    // Wait 9.5s, toast should still exist
    await page.clock.runFor(9500);
    await expect(toast).toBeVisible();

    // Wait another 1.2s, toast must auto-dismiss
    await page.clock.runFor(1200);
    await expect(toast).not.toBeVisible();
  });

  test('9.9.5 should support focus indexing and activation of Undo control via keyboard tab sequence', async ({ page }) => {
    const panel = page.locator('[data-testid="human-override-panel"]');
    await panel.locator('button:has-text("Phê duyệt")').click();

    const toast = page.locator('div[role="status"]');
    await expect(toast).toBeVisible();

    // Press tab to focus the Undo button (Phê duyệt -> Từ chối -> Ghi đè -> Undo)
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    await expect(toast).not.toBeVisible();
  });
});
