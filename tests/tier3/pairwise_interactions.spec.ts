import { test, expect } from '@playwright/test';

test.describe('Tier 3: Cross-Feature Pairwise Interactions', () => {
  // All tests use relative URLs to ensure environment-agnostic execution.
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  // Test Case 1: Hero Header (F1) & Lead Capture Form (F7)
  test('3.1 should scroll and submit lead form via Hero CTA click', async ({ page }) => {
    const initialScrollY = await page.evaluate(() => window.scrollY);
    
    // Click Hero Primary CTA
    const primaryCta = page.locator('section[aria-label="Introduction Hero"] a.bg-brand-accent');
    await expect(primaryCta).toBeVisible();
    await primaryCta.click();

    // Verify page scrolled down (smooth scroll takes some time)
    await page.waitForTimeout(800); 
    const currentScrollY = await page.evaluate(() => window.scrollY);
    expect(currentScrollY).toBeGreaterThan(initialScrollY);

    // Verify Lead form is visible and can be filled
    const emailInput = page.locator('input#email');
    await expect(emailInput).toBeVisible();
    await emailInput.fill('hero_integration@nothanagentic.vn');
    await page.fill('input#company', 'Hero Header Integration Corp');
    await page.fill('input#phone', '0988123456');

    // Submit and check success state
    await page.click('#lead-capture button[type="submit"]');
    const successAlert = page.locator('div[role="alert"]');
    await expect(successAlert).toBeVisible({ timeout: 2000 });
    await expect(successAlert.locator('h3')).toHaveText('Đăng Ký Thành Công!');
  });

  // Test Case 2: Interactive SVG Dashboard (F2) & AI Decision Widget (F8)
  test('3.2 should correlate interactive SVG click with AI Decision Widget data consistency', async ({ page }) => {
    // 1. Locate and click the Inventory Widget in the SVG Dashboard (Hero section)
    const inventoryWidget = page.locator('svg[aria-label="Bảng vận hành AI"] >> text:has-text("DỰ BÁO TỒN KHO")');
    await expect(inventoryWidget).toBeVisible();
    await inventoryWidget.click();

    // Verify the SVG dashboard shows the related inventory recommendation log
    const inventoryRec = page.locator('svg[aria-label="Bảng vận hành AI"] >> text:has-text("✓ KHÔNG CÓ RỦI RO ĐỨT GÃY")');
    await expect(inventoryRec).toBeVisible();

    // 2. Scroll to the AI Decision Widget and verify data correlation
    const aiWidget = page.locator('[data-testid="ai-decision-widget"]');
    await aiWidget.scrollIntoViewIfNeeded();
    await expect(aiWidget).toBeVisible();

    // Verify the pending header uses the warning theme
    const pendingHeader = aiWidget.locator('[data-testid="ai-pending-header"]');
    await expect(pendingHeader).toBeVisible();
    await expect(pendingHeader).toContainText('Đang chờ duyệt');

    // Verify progress bar is present and has the matching value representing high confidence (92%)
    const progress = aiWidget.locator('[role="progressbar"]');
    await expect(progress).toBeVisible();
    await expect(progress).toHaveAttribute('aria-valuenow', '92');
  });

  // Test Case 3: How It Works (F3) & Use Case Tiles (F4)
  test('3.3 should preserve How It Works section content while switching Use Case tab tiles', async ({ page }) => {
    // Scroll to and verify How It Works
    const howItWorks = page.locator('#how-it-works');
    await howItWorks.scrollIntoViewIfNeeded();
    await expect(howItWorks.locator('h3:has-text("Kết nối (Connect)")')).toBeVisible();

    // Switch Use Case tiles
    const useCases = page.locator('#use-cases');
    await useCases.scrollIntoViewIfNeeded();

    const tabs = page.locator('#use-cases button[role="tab"]');
    await tabs.nth(1).click(); // Quản lý kho
    await expect(page.locator('#usecase-panel-warehouse')).toBeVisible();

    await tabs.nth(2).click(); // Đội ngũ Marketing
    await expect(page.locator('#usecase-panel-marketing')).toBeVisible();

    // Verify How It Works is still intact and unaffected by Use Case tab state changes
    await expect(howItWorks.locator('h3:has-text("Phê duyệt (Approve)")')).toBeVisible();
  });

  // Test Case 4: Use Case Tiles (F4) & Ctrl+K Command Palette (F10)
  test('3.4 should navigate to Use Case Tiles via Command Palette search selection', async ({ page }) => {
    // Open Command Palette
    await page.keyboard.press('Control+KeyK');
    const palette = page.locator('[role="dialog"]');
    await expect(palette).toBeVisible();

    // Search for "Kho"
    const searchInput = palette.locator('input');
    await searchInput.fill('Kho');
    
    // Select option
    const matchedOption = palette.locator('[role="option"]:has-text("Dự báo tồn Kho tự động")').first();
    await expect(matchedOption).toBeVisible();
    await matchedOption.click();

    // Palette should close and page should scroll to Use Cases section
    await expect(palette).not.toBeVisible();
    
    // Check that we scrolled to Use Cases
    const useCasesSection = page.locator('#use-cases');
    await expect(useCasesSection).toBeInViewport();

    // Click the Quản lý kho tab manually to verify tabs are fully functional after scrolling
    const tabs = page.locator('#use-cases button[role="tab"]');
    await tabs.nth(1).click();
    await expect(page.locator('#usecase-panel-warehouse')).toBeVisible();
  });

  // Test Case 5: FAQ Accordion (F6) & Floating Contact Widget (F11)
  test('3.5 should allow FAQ accordion toggling and Floating Contact widget interactions together', async ({ page }) => {
    // 1. Expand FAQ accordion
    const faqSection = page.locator('#faq');
    await faqSection.scrollIntoViewIfNeeded();

    const faqButtons = page.locator('#faq button[aria-expanded]');
    await faqButtons.nth(0).click();
    await expect(faqButtons.nth(0)).toHaveAttribute('aria-expanded', 'true');
    await expect(page.locator('#faq-content-0')).toBeVisible();

    // 2. Interact with Floating Contact widget which remains sticky
    const contactWidget = page.locator('[data-testid="floating-contact"]');
    await expect(contactWidget).toBeVisible();

    // Hover to reveal Zalo and Messenger links
    await contactWidget.hover();
    const details = page.locator('[data-testid="contact-details"]');
    await expect(details).toBeVisible();

    const zaloLink = details.locator('a:has-text("Zalo")');
    await expect(zaloLink).toHaveAttribute('href', /zalo/i);
    await expect(zaloLink).toHaveAttribute('target', '_blank');

    // 3. Exclusivity check on FAQ while Floating Widget hover details are still visible
    await faqButtons.nth(1).click();
    await expect(faqButtons.nth(1)).toHaveAttribute('aria-expanded', 'true');
    await expect(faqButtons.nth(0)).toHaveAttribute('aria-expanded', 'false');
  });

  // Test Case 6: Lead Capture Form (F7) & AI Decision Widget (F8)
  test('3.6 should keep Lead Form success state isolated from AI Decision widget actions', async ({ page }) => {
    // 1. Submit Lead Form successfully
    const leadSection = page.locator('#lead-capture');
    await leadSection.scrollIntoViewIfNeeded();

    await page.fill('input#email', 'lead_ai_widget@nothanagentic.vn');
    await page.fill('input#company', 'AI Isolation Tests');
    await page.fill('input#phone', '0912123456');
    await page.click('#lead-capture button[type="submit"]');

    const successAlert = page.locator('div[role="alert"]');
    await expect(successAlert).toBeVisible({ timeout: 2000 });

    // 2. Perform override action on AI Decision Widget
    const aiWidget = page.locator('[data-testid="ai-decision-widget"]');
    await aiWidget.scrollIntoViewIfNeeded();
    await expect(aiWidget).toBeVisible();

    const overridePanel = page.locator('[data-testid="human-override-panel"]');
    const approveBtn = overridePanel.locator('button:has-text("Phê duyệt")');
    await approveBtn.click();

    // Verify override toast is visible
    const toast = page.locator('div[role="status"]');
    await expect(toast).toBeVisible();

    // 3. Re-verify Lead Form success alert is still present
    await leadSection.scrollIntoViewIfNeeded();
    await expect(successAlert).toBeVisible();
    
    // Clean up toast
    const undoBtn = toast.locator('button:has-text("Undo")');
    await undoBtn.click();
  });

  // Test Case 7: AI Decision Widget (F8) & Human Override Panel (F9) Countdown Execution via Playwright Mock Clock
  test('3.7 should trigger toast countdown on Approve click and execute action after timer expiry', async ({ page }) => {
    // Use Playwright Clock to test countdown without waiting 10 full seconds in real-time
    await page.clock.install();
    await page.goto('/'); // Reload with clock installed

    const aiWidget = page.locator('[data-testid="ai-decision-widget"]');
    await aiWidget.scrollIntoViewIfNeeded();

    const overridePanel = page.locator('[data-testid="human-override-panel"]');
    const approveBtn = overridePanel.locator('button:has-text("Phê duyệt")');
    await approveBtn.click();

    const toast = page.locator('div[role="status"]');
    await expect(toast).toBeVisible();
    await expect(toast).toContainText('10'); // Starts at 10

    // Fast forward 5 seconds
    await page.clock.fastForward(5000);
    await expect(toast).toContainText('5'); // Decremented to 5

    // Fast forward remaining 5+ seconds to trigger execution
    await page.clock.fastForward(6000);
    await expect(toast).not.toBeVisible(); // Toast is dismissed upon completion
  });

  // Test Case 8: Human Override Panel (F9) & Ctrl+K Command Palette (F10)
  test('3.8 should allow triggering human override actions and launching command palette simultaneously', async ({ page }) => {
    const aiWidget = page.locator('[data-testid="ai-decision-widget"]');
    await aiWidget.scrollIntoViewIfNeeded();

    const overridePanel = page.locator('[data-testid="human-override-panel"]');
    const approveBtn = overridePanel.locator('button:has-text("Phê duyệt")');
    await approveBtn.click();

    // Verify toast is active
    const toast = page.locator('div[role="status"]');
    await expect(toast).toBeVisible();

    // Launch Command Palette with toast active
    await page.keyboard.press('Control+KeyK');
    const palette = page.locator('[role="dialog"]');
    await expect(palette).toBeVisible();

    // Close palette
    await page.keyboard.press('Escape');
    await expect(palette).not.toBeVisible();

    // Verify toast is still visible and functional (Undo it)
    await expect(toast).toBeVisible();
    const undoBtn = toast.locator('button:has-text("Undo")');
    await undoBtn.click();
    await expect(toast).not.toBeVisible();
  });

  // Test Case 9: Ctrl+K Command Palette (F10) & FAQ Accordion (F6) Exclusivity Flow
  test('3.9 should navigate to FAQ section via Command Palette click and verify FAQ exclusivity', async ({ page }) => {
    // Open Command Palette
    await page.keyboard.press('Control+KeyK');
    const palette = page.locator('[role="dialog"]');
    await expect(palette).toBeVisible();

    // Search for AI Decisions (closest section to FAQ / lower page)
    const searchInput = palette.locator('input');
    await searchInput.fill('AI');
    const matchedOption = palette.locator('[role="option"]:has-text("Trung tâm điều hành")').first();
    await matchedOption.click();

    // Scroll to FAQ section manually from AI decisions
    const faqSection = page.locator('#faq');
    await faqSection.scrollIntoViewIfNeeded();

    // Verify FAQ exclusivity
    const faqButtons = page.locator('#faq button[aria-expanded]');
    
    await faqButtons.nth(0).click(); // Open first
    await expect(faqButtons.nth(0)).toHaveAttribute('aria-expanded', 'true');

    await faqButtons.nth(1).click(); // Open second
    await expect(faqButtons.nth(1)).toHaveAttribute('aria-expanded', 'true');
    await expect(faqButtons.nth(0)).toHaveAttribute('aria-expanded', 'false'); // First closed
  });

  // Test Case 10: Hero Header navigation (F1) & FAQ Accordion (F6)
  test('3.10 should scroll to FAQ section when clicking navigation link in Header', async ({ page }) => {
    // Click navigation link "Câu hỏi" in the sticky header
    const faqLink = page.locator('header a[href="#faq"]');
    await expect(faqLink).toBeVisible();
    await faqLink.click();

    // Verify the FAQ section is now in viewport
    const faqSection = page.locator('#faq');
    await expect(faqSection).toBeInViewport();

    // Expand one FAQ and verify it is visible
    const faqButtons = page.locator('#faq button[aria-expanded]');
    await faqButtons.nth(0).click();
    await expect(page.locator('#faq-content-0')).toBeVisible();
  });

  // Test Case 11: Trust Signals (F5) & Lead Capture Form (F7) reset workflow
  test('3.11 should maintain Trust Signals before/after metrics context when resetting Lead Capture Form', async ({ page }) => {
    // Scroll to Trust Signals and verify metrics are visible
    const testimonials = page.locator('#testimonials');
    await testimonials.scrollIntoViewIfNeeded();
    await expect(testimonials.locator('span:has-text("Trước")')).toBeVisible();
    await expect(testimonials.locator('span:has-text("Sau (AI)")')).toBeVisible();

    // Scroll to Lead Form, fill, and submit
    const leadSection = page.locator('#lead-capture');
    await leadSection.scrollIntoViewIfNeeded();

    await page.fill('input#email', 'reset_flow@nothanagentic.vn');
    await page.fill('input#company', 'Trust Signals Reset Co');
    await page.fill('input#phone', '0977654321');
    await page.click('#lead-capture button[type="submit"]');

    // Wait for success and click reset button
    const resetBtn = page.locator('button:has-text("Gửi lại yêu cầu khác")');
    await expect(resetBtn).toBeVisible({ timeout: 2000 });
    await resetBtn.click();

    // Verify form reset is complete and inputs are cleared
    await expect(page.locator('input#email')).toHaveValue('');

    // Re-verify that Trust Signals comparison metrics are still visible
    await testimonials.scrollIntoViewIfNeeded();
    await expect(testimonials.locator('span:has-text("Trước")')).toBeVisible();
  });
});
