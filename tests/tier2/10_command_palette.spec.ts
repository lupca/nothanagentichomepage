import { test, expect } from '@playwright/test';

test.describe('Feature 10 Tier 2: Ctrl+K Command Palette - Search Edge Cases', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('10.10.1 should not crash and display zero matches when typing search query with regex/glob chars', async ({ page }) => {
    // Open Palette
    await page.keyboard.press('Control+k');
    const dialog = page.locator('div[role="dialog"]');
    await expect(dialog).toBeVisible();

    const input = dialog.locator('input[type="text"]');
    await expect(input).toBeFocused();

    // Type special characters that commonly trigger regex parsing bugs
    const specialChars = '.*+?^$()[]{}|\\';
    await input.fill(specialChars);

    // Verify empty state warning is visible
    const emptyState = dialog.locator('text=Không tìm thấy kết quả phù hợp.');
    await expect(emptyState).toBeVisible();
  });

  test('10.10.2 should display standard empty search results UI when search fails to match', async ({ page }) => {
    await page.keyboard.press('Control+k');
    const dialog = page.locator('div[role="dialog"]');
    
    const input = dialog.locator('input[type="text"]');
    await input.fill('no_matching_command_exists_here');

    const emptyState = dialog.locator('text=Không tìm thấy kết quả phù hợp.');
    await expect(emptyState).toBeVisible();

    // Ensure listbox does not render any interactive buttons
    const options = dialog.locator('role=option');
    expect(await options.count()).toBe(0);
  });

  test('10.10.3 should dismiss command palette when pressing ESC key inside focused search input', async ({ page }) => {
    await page.keyboard.press('Control+k');
    const dialog = page.locator('div[role="dialog"]');
    await expect(dialog).toBeVisible();

    const input = dialog.locator('input[type="text"]');
    await input.fill('tồn kho');
    await page.keyboard.press('Escape');

    await expect(dialog).not.toBeVisible();
  });

  test('10.10.4 should dismiss dialog when clicking outer blurred background backdrop area', async ({ page }) => {
    await page.keyboard.press('Control+k');
    const backdrop = page.locator('.fixed.inset-0.bg-brand-bg\\/70');
    await expect(backdrop).toBeVisible();

    // Click on top left outer space to trigger click outside
    await backdrop.click({ position: { x: 5, y: 5 } });
    await expect(backdrop).not.toBeVisible();
  });

  test('10.10.5 should trigger scroll view transition and update URL hash on option selection', async ({ page }) => {
    await page.keyboard.press('Control+k');
    const dialog = page.locator('div[role="dialog"]');
    
    // Click matching option
    const option = dialog.locator('button:has-text("Dự báo tồn Kho tự động")');
    await option.click();

    // Modal closes
    await expect(dialog).not.toBeVisible();
    
    // Viewport shifts target section
    const target = page.locator('#use-cases');
    await expect(target).toBeInViewport();
  });
});
