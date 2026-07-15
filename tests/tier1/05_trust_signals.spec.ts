import { test, expect } from '@playwright/test';

test.describe('Feature 5: Trust Signals', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('5.1 should display the Trust Signals section heading and sub-heading', async ({ page }) => {
    const section = page.locator('section#testimonials');
    await expect(section).toBeVisible();
    await expect(page.locator('h2:has-text("Minh Chứng Từ Thực Tế Vận Hành")')).toBeVisible();
  });

  test('5.2 should display a rating containing exactly 5 stars', async ({ page }) => {
    const starContainer = page.locator('section#testimonials div.flex.gap-1.text-brand-accent');
    await expect(starContainer).toBeVisible();
    const stars = starContainer.locator('svg');
    await expect(stars).toHaveCount(5);
  });

  test('5.3 should verify verbatim quote matches requirement', async ({ page }) => {
    const quote = page.locator('blockquote');
    await expect(quote).toBeVisible();
    await expect(quote).toContainText('Trước khi dùng NoThanagentic, đội ngũ của chúng tôi mất 4-5 tiếng mỗi ngày');
  });

  test('5.4 should verify COO author name and credentials represent TechMart Vietnam', async ({ page }) => {
    const name = page.locator('text=Nguyễn Văn Bình');
    const title = page.locator('text=Giám đốc Vận hành (COO) — TechMart Vietnam');
    await expect(name).toBeVisible();
    await expect(title).toBeVisible();
  });

  test('5.5 should render the comparison metrics with correct style and text', async ({ page }) => {
    const beforeMetric = page.locator('span:has-text("Trước") + span');
    const afterMetric = page.locator('span:has-text("Sau (AI)") + span');

    await expect(beforeMetric).toHaveText('45 phút / đơn');
    await expect(beforeMetric).toHaveClass(/text-brand-error/);
    await expect(beforeMetric).toHaveClass(/line-through/);

    await expect(afterMetric).toHaveText('3 phút / đơn');
    await expect(afterMetric).toHaveClass(/text-brand-success/);
  });
});
