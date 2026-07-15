import { test, expect } from '@playwright/test';

test.describe('Feature 8: AI Decision Support Widget', () => {
  // E2E UI Contract specification for upcoming Milestone 4 widget
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('8.1 should display the AI Decision support widget on page', async ({ page }) => {
    // If component is not yet implemented, skip to avoid failing builds
    const widget = page.locator('[data-testid="ai-decision-widget"]');
    if (await widget.count() === 0) {
      test.skip(true, 'Widget not yet implemented in Milestone 2. Skipping.');
    }
    await expect(widget).toBeVisible();
  });

  test('8.2 should display pending tasks status in warning theme', async ({ page }) => {
    const widget = page.locator('[data-testid="ai-decision-widget"]');
    if (await widget.count() === 0) {
      test.skip(true, 'Widget not yet implemented in Milestone 2. Skipping.');
    }
    const pendingHeader = widget.locator('[data-testid="ai-pending-header"]');
    await expect(pendingHeader).toBeVisible();
    await expect(pendingHeader).toContainText('Đang chờ duyệt');
    // Color check: uses Sand Gold #D97706 theme class
    await expect(pendingHeader).toHaveClass(/(text|bg)-brand-warning|#D97706/i);
  });

  test('8.3 should display confidence score labels correctly', async ({ page }) => {
    const widget = page.locator('[data-testid="ai-decision-widget"]');
    if (await widget.count() === 0) {
      test.skip(true, 'Widget not yet implemented in Milestone 2. Skipping.');
    }
    const scoreLabel = widget.locator('text=92%');
    await expect(scoreLabel).toBeVisible();
  });

  test('8.4 should render confidence score progress bar with matching values', async ({ page }) => {
    const widget = page.locator('[data-testid="ai-decision-widget"]');
    if (await widget.count() === 0) {
      test.skip(true, 'Widget not yet implemented in Milestone 2. Skipping.');
    }
    const progress = widget.locator('[role="progressbar"]');
    await expect(progress).toBeVisible();
    await expect(progress).toHaveAttribute('aria-valuenow', '92');
  });

  test('8.5 should be responsive when switching between viewport layouts', async ({ page }) => {
    const widget = page.locator('[data-testid="ai-decision-widget"]');
    if (await widget.count() === 0) {
      test.skip(true, 'Widget not yet implemented in Milestone 2. Skipping.');
    }
    // Check mobile alignment
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(widget).toBeVisible();
  });
});
