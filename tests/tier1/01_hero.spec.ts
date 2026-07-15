import { test, expect } from '@playwright/test';

test.describe('Feature 1: Hero Header', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('1.1 should render the Vietnamese eyebrow badge with correct text', async ({ page }) => {
    const eyebrow = page.locator('span:has-text("Nền tảng Agentic AI tiên phong tại Việt Nam")');
    await expect(eyebrow).toBeVisible();
    await expect(eyebrow).toHaveClass(/text-caption/); // Caption styling
  });

  test('1.2 should display the primary H1 headline with correct Vietnamese copy', async ({ page }) => {
    const headline = page.locator('h1');
    await expect(headline).toBeVisible();
    await expect(headline).toHaveText('Tự động hóa toàn diện chuỗi cung ứng & Marketing');
    await expect(headline).toHaveClass(/text-h1/); // Typography hierarchy check: h1 (56px/3.5rem)
  });

  test('1.3 should contain the outcome-focused sub-headline description', async ({ page }) => {
    const desc = page.locator('p:has-text("Vận hành bán hàng đa kênh thông minh")');
    await expect(desc).toBeVisible();
    await expect(desc).toHaveClass(/text-body/); // Typography hierarchy check: body (16px/1rem)
  });

  test('1.4 should render both primary and secondary CTAs satisfying size targets', async ({ page }) => {
    const primaryCta = page.locator('a:has-text("Dùng thử miễn phí 7 ngày")');
    const secondaryCta = page.locator('a:has-text("Đặt lịch Demo tư vấn")');

    await expect(primaryCta).toBeVisible();
    await expect(secondaryCta).toBeVisible();

    // Verify touch target requirements (>= 44px height and width)
    const primaryBox = await primaryCta.boundingBox();
    const secondaryBox = await secondaryCta.boundingBox();

    expect(primaryBox?.height).toBeGreaterThanOrEqual(44);
    expect(primaryBox?.width).toBeGreaterThanOrEqual(44);
    expect(secondaryBox?.height).toBeGreaterThanOrEqual(44);
    expect(secondaryBox?.width).toBeGreaterThanOrEqual(44);

    // Verify CTAs point to the lead capture anchor
    await expect(primaryCta).toHaveAttribute('href', '#lead-capture');
    await expect(secondaryCta).toHaveAttribute('href', '#lead-capture');
  });

  test('1.5 should verify grayscale brand logos section is present and contains required brands', async ({ page }) => {
    const container = page.locator('p:has-text("Tin dùng bởi các doanh nghiệp hàng đầu")');
    await expect(container).toBeVisible();

    const logoSection = page.locator('text=VIET-LOGIS');
    await expect(logoSection).toBeVisible();
    await expect(page.locator('text=S-MART')).toBeVisible();
    await expect(page.locator('text=TECH-DIST')).toBeVisible();
    await expect(page.locator('text=VINA-FLOW')).toBeVisible();
  });
});
