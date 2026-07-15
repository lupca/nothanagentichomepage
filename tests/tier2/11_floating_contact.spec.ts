import { test, expect } from '@playwright/test';

test.describe('Feature 11 Tier 2: Floating Contact Widget - Boundary Cases', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('11.11.1 should transition layout to icon-only mode and hide expert text badge on mobile (375px)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    const widget = page.locator('[data-testid="floating-contact"]');
    await expect(widget).toBeVisible();

    const textBadge = widget.locator('span:has-text("Luôn có chuyên gia trực chat hỗ trợ 365 ngày")').first();
    // Mobile stylesheet contains class "hidden sm:inline"
    await expect(textBadge).toBeHidden();
  });

  test('11.11.2 should display expanded details layout on trigger hover, and hide it on hover-out', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 768 });
    const widget = page.locator('[data-testid="floating-contact"]');
    const details = widget.locator('[data-testid="contact-details"]');

    // Initially hidden / opacity is 0 / invisible
    await expect(details).not.toBeVisible();

    // Hover over the trigger wrapper
    await widget.hover();
    await expect(details).toBeVisible();

    // Hover off to some page element
    await page.hover('h1');
    await expect(details).not.toBeVisible();
  });

  test('11.11.3 should maintain details visible while keyboard focus stays inside widget components', async ({ page }) => {
    const widget = page.locator('[data-testid="floating-contact"]');
    const details = page.locator('[data-testid="contact-details"]');
    
    // Hover first to make details visible and focusable
    await widget.hover();
    
    // Trigger focus on the contact widget inputs
    const zaloLink = page.locator('a[href*="zalo.me"]');
    await zaloLink.focus();
    
    // Hover off to some page element
    await page.hover('h1');
    
    // Should be visible due to focus-within
    await expect(details).toBeVisible();
  });

  test('11.11.4 should enforce secure external links by checking target and rel attributes', async ({ page }) => {
    const zaloLink = page.locator('a[href*="zalo.me"]');
    const messengerLink = page.locator('a[href*="messenger.com"]');

    await expect(zaloLink).toHaveAttribute('target', '_blank');
    await expect(zaloLink).toHaveAttribute('rel', 'noreferrer');
    
    await expect(messengerLink).toHaveAttribute('target', '_blank');
    await expect(messengerLink).toHaveAttribute('rel', 'noreferrer');
  });

  test('11.11.5 should verify mobile touch-interaction and focus stability', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Focus the widget
    const trigger = page.locator('[data-testid="floating-contact"]');
    await trigger.focus();
    
    const details = page.locator('[data-testid="contact-details"]');
    const zaloLink = page.locator('a[href*="zalo.me"]');
    
    // Hover is simulating touch focus, details should show up
    await trigger.click();
    await expect(details).toBeVisible();
    await expect(zaloLink).toBeVisible();
  });
});
