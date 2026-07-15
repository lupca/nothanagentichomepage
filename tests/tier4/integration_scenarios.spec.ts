import { test, expect } from '@playwright/test';

test.describe('Tier 4: Real-World B2B SaaS Application Scenarios', () => {
  // Scenario 1: Prospective Client Control Verification & Lead Conversion
  test('4.1 should allow a prospect to test AI control (override & undo) and submit lead inquiry', async ({ page }) => {
    // 1. Visit homepage and wait for hydration
    await page.goto('/');
    const mainHeader = page.locator('header[aria-label="Điều hướng chính"]');
    await expect(mainHeader).toBeVisible();

    // 2. Scroll to the AI Decision Support Widget
    const aiWidget = page.locator('[data-testid="ai-decision-widget"]');
    await aiWidget.scrollIntoViewIfNeeded();
    await expect(aiWidget).toBeInViewport();

    // 3. Verify initial pending status and Sand Gold (#D97706) styling theme
    const pendingHeader = aiWidget.locator('[data-testid="ai-pending-header"]');
    await expect(pendingHeader).toBeVisible();
    await expect(pendingHeader).toContainText('Đang chờ duyệt');
    await expect(pendingHeader).toHaveClass(/text-brand-warning/);

    const primaryTask = aiWidget.locator('text=Chuyển 150 sản phẩm từ Kho A sang Kho B').first();
    await expect(primaryTask).toBeVisible();

    // 4. Install Playwright clock AFTER page load/hydration to prevent hangs
    await page.clock.install({ time: new Date() });
    await page.clock.pauseAt(new Date());

    // 5. Trigger the Approve action
    const approveBtn = page.locator('[data-testid="human-override-panel"] button:has-text("Phê duyệt")');
    await approveBtn.click();

    // 6. Verify countdown toast notification appears
    const toast = page.locator('div[role="status"]');
    await expect(toast).toBeVisible();
    await expect(toast).toContainText('Đã phê duyệt · Hoàn tất sau 10s');

    // 7. Fast forward clock to verify countdown progression
    await page.clock.runFor(4000);
    await expect(toast).toContainText('Hoàn tất sau 6s');

    // 8. Execute Undo action before countdown finishes
    const undoBtn = toast.locator('button:has-text("Undo")');
    await undoBtn.click();

    // 9. Assert toast is dismissed and decision state is reverted
    await expect(toast).not.toBeVisible();
    await expect(primaryTask).toBeVisible(); // Task is still in pending list

    await page.clock.resume();

    // 11. Scroll to lead capture form to convert
    const leadForm = page.locator('#lead-capture');
    await leadForm.scrollIntoViewIfNeeded();
    await expect(leadForm).toBeInViewport();

    // 12. Fill and submit Lead Form
    await page.fill('input#email', 'prospect_control@nothanagentic.vn');
    await page.fill('input#company', 'AI Operations VietNam');
    await page.fill('input#phone', '0989998888');
    await page.click('#lead-capture button[type="submit"]');

    // 13. Verify success alert shows with robust wait
    const successAlert = page.locator('#lead-capture div[role="alert"]');
    await expect(successAlert).toBeVisible();
    await expect(successAlert.locator('h3')).toHaveText('Đăng Ký Thành Công!');
  });

  // Scenario 2: Command Palette Navigation & Multi-Role Use Case Discovery
  test('4.2 should support command palette searches to navigate and toggle role-based use case panels', async ({ page }) => {
    // 1. Visit homepage
    await page.goto('/');
    await expect(page.locator('#use-cases')).toBeVisible();

    // 2. Open Command Palette with Ctrl+K shortcut
    await page.keyboard.press('Control+KeyK');
    const palette = page.locator('[role="dialog"]');
    await expect(palette).toBeVisible();

    // 3. Search for warehouse keyword "Kho"
    const searchInput = palette.locator('input[placeholder*="Tìm kiếm"]');
    await searchInput.fill('Kho');

    // 4. Select the warehouse forecast command
    const warehouseCommand = palette.locator('[role="option"]:has-text("Dự báo tồn Kho tự động")');
    await expect(warehouseCommand).toBeVisible();
    await warehouseCommand.click();

    // 5. Verify palette closed and page auto-scrolled to Use Cases
    await expect(palette).not.toBeVisible();
    const useCasesSection = page.locator('#use-cases');
    await expect(useCasesSection).toBeInViewport();

    // 6. Select "Quản lý kho" tab to see specialized details
    const warehouseTab = useCasesSection.locator('button[role="tab"]:has-text("Quản lý kho")');
    await warehouseTab.click();
    await expect(page.locator('#usecase-panel-warehouse')).toBeVisible();
    await expect(page.locator('#usecase-panel-warehouse')).toContainText('Tự động dự báo nhu cầu');

    // 7. Open Command Palette again to switch context to Marketing
    await page.keyboard.press('Control+KeyK');
    await expect(palette).toBeVisible();
    await searchInput.fill('Marketing');

    const marketingCommand = palette.locator('[role="option"]:has-text("Chiến dịch Marketing")');
    await expect(marketingCommand).toBeVisible();
    await marketingCommand.click();

    // 8. Confirm scroll and select Marketing tab
    await expect(useCasesSection).toBeInViewport();
    const marketingTab = useCasesSection.locator('button[role="tab"]:has-text("Marketing")');
    await marketingTab.click();
    await expect(page.locator('#usecase-panel-marketing')).toBeVisible();
    await expect(page.locator('#usecase-panel-marketing')).toContainText('Tối ưu hóa ngân sách');
  });

  // Scenario 3: AI Executive Auto-Execution Workflow (Reject Expiry) & FAQ Trust Check
  test('4.3 should auto-execute decision rejection upon countdown completion and verify safety FAQ', async ({ page }) => {
    // 1. Visit page and scroll to decision widget
    await page.goto('/');
    const aiWidget = page.locator('[data-testid="ai-decision-widget"]');
    await aiWidget.scrollIntoViewIfNeeded();

    // 2. Install clock after load to prevent hydration issues
    await page.clock.install({ time: new Date() });
    await page.clock.pauseAt(new Date());

    // 3. Click "Từ chối" (Reject) to initiate the rejection countdown
    const rejectBtn = page.locator('[data-testid="human-override-panel"] button:has-text("Từ chối")');
    await rejectBtn.click();

    // 4. Verify toast is visible with 10s countdown
    const toast = page.locator('div[role="status"]');
    await expect(toast).toBeVisible();
    await expect(toast).toContainText('Đã từ chối · Hoàn tất sau 10s');

    // 5. Fast forward clock in steps to verify countdown and let React state update
    await page.clock.runFor(5000);
    await expect(toast).toContainText('Hoàn tất sau 5s');
    await page.clock.runFor(6000);

    // 6. Verify toast is dismissed automatically
    await expect(toast).not.toBeVisible();

    await page.clock.resume();

    // 8. Scroll to FAQ section using sticky header link
    const faqNavLink = page.locator('header a[href="#faq"]');
    await faqNavLink.click();

    const faqSection = page.locator('#faq');
    await expect(faqSection).toBeInViewport();

    // 9. Expand the Security & Data Privacy FAQ item
    const securityFaqBtn = faqSection.locator('button[aria-expanded]:has-text("bảo mật")');
    await securityFaqBtn.click();
    
    // 10. Verify trust signals in expanded accordion panel (ISO standard compliance)
    const securityPanel = faqSection.locator('[id^="faq-content-"]:has-text("ISO/IEC 27001")');
    await expect(securityPanel).toBeVisible();

    // 11. Interact with Floating Chat support
    const chatWidget = page.locator('[data-testid="floating-contact"]');
    await chatWidget.hover();
    const zaloLink = page.locator('[data-testid="contact-details"] a:has-text("Zalo")');
    await expect(zaloLink).toBeVisible();
    await expect(zaloLink).toHaveAttribute('target', '_blank');
  });

  // Scenario 4: User Lead Form Validation Loop & Dynamic Resubmission
  test('4.4 should guide user through field validation corrections and allow multiple submissions', async ({ page }) => {
    // 1. Visit homepage
    await page.goto('/');

    // 2. Click Primary Hero CTA to scroll to Lead Form
    const heroCta = page.locator('section[aria-label="Introduction Hero"] a.bg-brand-accent');
    await heroCta.click();

    const leadFormSection = page.locator('#lead-capture');
    await expect(leadFormSection).toBeInViewport();

    // 3. Trigger initial form submission with empty fields to trigger validations
    const submitBtn = leadFormSection.locator('button[type="submit"]');
    await submitBtn.click();

    // 4. Assert initial error messages in Vietnamese are displayed
    await expect(leadFormSection.locator('text=Vui lòng nhập email công việc')).toBeVisible();
    await expect(leadFormSection.locator('text=Tên công ty phải có ít nhất 2 ký tự')).toBeVisible();
    await expect(leadFormSection.locator('text=Vui lòng nhập số điện thoại')).toBeVisible();

    // 5. Input invalid email format and invalid phone number pattern
    await page.fill('input#email', 'invalid-email');
    await page.fill('input#company', 'A');
    await page.fill('input#phone', '123456');
    await submitBtn.click();

    // 6. Assert specific schema validation messages
    await expect(leadFormSection.locator('text=Định dạng email công việc không hợp lệ')).toBeVisible();
    await expect(leadFormSection.locator('text=Số điện thoại Việt Nam không hợp lệ')).toBeVisible();

    // 7. Rectify fields with valid details
    await page.fill('input#email', 'valid_email@nothanagentic.vn');
    await page.fill('input#company', 'Smart Retail Inc');
    await page.fill('input#phone', '0912345678');
    await submitBtn.click();

    // 8. Verify form enters loading/submitting state then successfully completes
    const successAlert = leadFormSection.locator('div[role="alert"]');
    await expect(successAlert).toBeVisible();
    await expect(successAlert.locator('h3')).toHaveText('Đăng Ký Thành Công!');

    // 9. Click "Gửi lại yêu cầu khác" to test dynamic reset capability
    const resetBtn = successAlert.locator('button:has-text("Gửi lại yêu cầu khác")');
    await resetBtn.click();

    // 10. Assert form is cleared and fields are empty
    await expect(page.locator('input#email')).toHaveValue('');
    await expect(page.locator('input#company')).toHaveValue('');
    await expect(page.locator('input#phone')).toHaveValue('');

    // 11. Perform a second successful registration with different inputs
    await page.fill('input#email', 'second_branch@nothanagentic.vn');
    await page.fill('input#company', 'Smart Retail Logistics');
    await page.fill('input#phone', '0987654321');
    await submitBtn.click();

    await expect(successAlert).toBeVisible();
  });

  // Scenario 5: Mobile Viewport Customer Navigation, Testimonial Inspection & Support Inquiry
  test('4.5 should provide fully responsive mobile menu navigation, testimonial metrics view, and touch targets', async ({ page }) => {
    // 1. Emulate a mobile device layout viewport
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');

    // 2. Assert desktop navigation links are hidden and mobile menu toggle is visible
    const desktopNav = page.locator('header nav[aria-label="Danh mục điều hướng"]');
    await expect(desktopNav).not.toBeVisible();

    const menuToggle = page.locator('header button[aria-label="Mở menu"]');
    await expect(menuToggle).toBeVisible();
    const menuToggleBox = await menuToggle.boundingBox();
    expect(menuToggleBox).not.toBeNull();
    expect(menuToggleBox!.height).toBeGreaterThanOrEqual(44); // WCAG Touch Target check
    expect(menuToggleBox!.width).toBeGreaterThanOrEqual(44);

    // 3. Open mobile menu
    await menuToggle.click();
    const mobileNav = page.locator('#mobile-nav');
    await expect(mobileNav).toBeVisible();

    // 4. Click "Khách hàng" to inspect testimonial trust metrics
    const clientLink = mobileNav.locator('a[href="#testimonials"]');
    await clientLink.click();

    // 5. Verify mobile navigation closes automatically upon navigation click
    await expect(mobileNav).not.toBeVisible();

    // 6. Verify page scrolls to testimonial section
    const testimonialsSection = page.locator('#testimonials');
    await expect(testimonialsSection).toBeInViewport();

    // 7. Verify readability of before/after metrics context
    await expect(testimonialsSection.locator('span:has-text("Trước")')).toBeVisible();
    await expect(testimonialsSection.locator('span:has-text("Sau (AI)")')).toBeVisible();

    // 8. Interact with the Floating Contact support widget
    const floatingContact = page.locator('[data-testid="floating-contact"]');
    await expect(floatingContact).toBeVisible();
    const floatingContactBox = await floatingContact.boundingBox();
    expect(floatingContactBox).not.toBeNull();
    expect(floatingContactBox!.height).toBeGreaterThanOrEqual(44); // Ensure touch-friendly target size

    // 9. Tap widget to reveal options and verify target link is functional
    await floatingContact.click();
    const zaloLink = page.locator('[data-testid="contact-details"] a:has-text("Zalo")');
    await expect(zaloLink).toBeVisible();
    await expect(zaloLink).toHaveAttribute('target', '_blank');
  });
});
