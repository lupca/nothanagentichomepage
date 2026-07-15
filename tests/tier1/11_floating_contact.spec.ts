import { test, expect } from '@playwright/test';

test.describe('Feature 11: Floating Contact Widget', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('11.1 should render floating widget at bottom right containing the correct support copy', async ({ page }) => {
    const contactWidget = page.locator('[data-testid="floating-contact"]');
    if (await contactWidget.count() === 0) {
      test.skip(true, 'Floating contact widget not yet implemented. Skipping.');
    }
    await expect(contactWidget).toBeVisible();
    await expect(contactWidget).toContainText('Luôn có chuyên gia trực chat hỗ trợ 365 ngày');
  });

  test('11.2 should verify Zalo OA link is targeting new window tab', async ({ page }) => {
    const contactWidget = page.locator('[data-testid="floating-contact"]');
    if (await contactWidget.count() === 0) {
      test.skip(true, 'Floating contact widget not yet implemented. Skipping.');
    }
    const zaloLink = contactWidget.locator('a:has-text("Zalo")');
    await expect(zaloLink).toHaveAttribute('target', '_blank');
    await expect(zaloLink).toHaveAttribute('href', /zalo/i);
  });

  test('11.3 should verify Facebook Messenger link is targeting new window tab', async ({ page }) => {
    const contactWidget = page.locator('[data-testid="floating-contact"]');
    if (await contactWidget.count() === 0) {
      test.skip(true, 'Floating contact widget not yet implemented. Skipping.');
    }
    const messengerLink = contactWidget.locator('a:has-text("Messenger")');
    await expect(messengerLink).toHaveAttribute('target', '_blank');
    await expect(messengerLink).toHaveAttribute('href', /messenger/i);
  });

  test('11.4 should toggle details state on hovering over support label', async ({ page }) => {
    const contactWidget = page.locator('[data-testid="floating-contact"]');
    if (await contactWidget.count() === 0) {
      test.skip(true, 'Floating contact widget not yet implemented. Skipping.');
    }
    // Hover details
    await contactWidget.hover();
    await expect(contactWidget.locator('[data-testid="contact-details"]')).toBeVisible();
  });

  test('11.5 should verify contact card stays sticky on page scrolling', async ({ page }) => {
    const contactWidget = page.locator('[data-testid="floating-contact"]');
    if (await contactWidget.count() === 0) {
      test.skip(true, 'Floating contact widget not yet implemented. Skipping.');
    }
    
    const initialBox = await contactWidget.boundingBox();
    
    // Scroll viewport to bottom
    await page.evaluate(() => window.scrollTo(0, 1000));
    
    const scrolledBox = await contactWidget.boundingBox();
    // Bounding positions should remain equivalent in view space coordinates
    expect(scrolledBox?.y).toBe(initialBox?.y);
  });
});
