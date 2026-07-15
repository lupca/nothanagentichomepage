import { test, expect } from '@playwright/test';

test.describe('Feature 6: FAQ Accordion', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('6.1 should check FAQ items are closed by default', async ({ page }) => {
    const buttons = page.locator('section#faq button[aria-expanded]');
    await expect(buttons).toHaveCount(3);
    for (let i = 0; i < 3; i++) {
      await expect(buttons.nth(i)).toHaveAttribute('aria-expanded', 'false');
    }
  });

  test('6.2 should open a panel when its header button is clicked', async ({ page }) => {
    const firstButton = page.locator('section#faq button[aria-expanded]').first();
    const firstPanel = page.locator('#faq-content-0');

    await firstButton.click();
    await expect(firstButton).toHaveAttribute('aria-expanded', 'true');
    await expect(firstPanel).toBeVisible();
    await expect(firstPanel).toContainText('Shopee, TikTok Shop, Lazada');
  });

  test('6.3 should ensure accordion exclusivity (opening one closes another)', async ({ page }) => {
    const buttons = page.locator('section#faq button[aria-expanded]');
    const firstButton = buttons.nth(0);
    const secondButton = buttons.nth(1);

    const firstPanel = page.locator('#faq-content-0');
    const secondPanel = page.locator('#faq-content-1');

    // Open first
    await firstButton.click();
    await expect(firstPanel).toBeVisible();

    // Open second
    await secondButton.click();
    
    // First should collapse, second should open
    await expect(firstButton).toHaveAttribute('aria-expanded', 'false');
    await expect(secondButton).toHaveAttribute('aria-expanded', 'true');
    await expect(secondPanel).toBeVisible();
  });

  test('6.4 should close the active panel when clicking it again', async ({ page }) => {
    const firstButton = page.locator('section#faq button[aria-expanded]').first();
    const firstPanel = page.locator('#faq-content-0');

    // Open
    await firstButton.click();
    await expect(firstPanel).toBeVisible();

    // Close
    await firstButton.click();
    await expect(firstButton).toHaveAttribute('aria-expanded', 'false');
  });

  test('6.5 should display bottom ISO/IEC 27001 security badge note', async ({ page }) => {
    const note = page.locator('span:has-text("ISO/IEC 27001")');
    await expect(note).toBeVisible();
    await expect(note).toContainText('tiêu chuẩn an ninh thông tin quốc tế ISO/IEC 27001');
  });
});
