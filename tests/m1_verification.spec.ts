import { test, expect } from '@playwright/test';

// WCAG 2.1 contrast ratio helper
function calculateRelativeLuminance(r: number, g: number, b: number): number {
  const rs = r / 255;
  const gs = g / 255;
  const bs = b / 255;

  const R = rs <= 0.03928 ? rs / 12.92 : Math.pow((rs + 0.055) / 1.055, 2.4);
  const G = gs <= 0.03928 ? gs / 12.92 : Math.pow((gs + 0.055) / 1.055, 2.4);
  const B = bs <= 0.03928 ? bs / 12.92 : Math.pow((bs + 0.055) / 1.055, 2.4);

  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

function getContrastRatio(rgb1: [number, number, number], rgb2: [number, number, number]): number {
  const l1 = calculateRelativeLuminance(rgb1[0], rgb1[1], rgb1[2]);
  const l2 = calculateRelativeLuminance(rgb2[0], rgb2[1], rgb2[2]);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
}

function parseRgb(rgbStr: string): [number, number, number] {
  const match = rgbStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*\d+(?:\.\d+)?)?\)/);
  if (!match) {
    throw new Error(`Failed to parse RGB string: ${rgbStr}`);
  }
  return [parseInt(match[1]!, 10), parseInt(match[2]!, 10), parseInt(match[3]!, 10)];
}

test.describe('Milestone 1 Core Components Verification', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to homepage
    await page.goto('/');
  });

  test('Lead Capture Form - Validation and Submission', async ({ page }) => {
    const leadFormSection = page.locator('#lead-capture');
    await expect(leadFormSection).toBeVisible();

    const emailInput = page.locator('input#email');
    const companyInput = page.locator('input#company');
    const phoneInput = page.locator('input#phone');
    const submitButton = page.locator('#lead-capture button[type="submit"]');

    // 1. Submit empty form
    await submitButton.click();
    
    // Select errors
    const emailErr = page.locator('p[role="alert"]:near(input#email)');
    const companyErr = page.locator('p[role="alert"]:near(input#company)');
    const phoneErr = page.locator('p[role="alert"]:near(input#phone)');

    await expect(emailErr.first()).toContainText('Vui lòng nhập email công việc');
    await expect(companyErr.first()).toContainText('Tên công ty phải có ít nhất 2 ký tự');
    await expect(phoneErr.first()).toContainText('Vui lòng nhập số điện thoại');

    // 2. Submit with invalid email format
    await emailInput.fill('invalid-email');
    await submitButton.click();
    await expect(emailErr.first()).toContainText('Định dạng email công việc không hợp lệ');

    // 3. Submit with invalid phone number format
    await phoneInput.fill('0123456789'); // Invalid prefix
    await submitButton.click();
    await expect(phoneErr.first()).toContainText('Số điện thoại Việt Nam không hợp lệ');

    // 4. Submit with too short company name
    await companyInput.fill('A');
    await submitButton.click();
    await expect(companyErr.first()).toContainText('Tên công ty phải có ít nhất 2 ký tự');

    // 5. Submit valid form
    await emailInput.fill('test@company.com');
    await companyInput.fill('Doanh Nghiệp Test');
    await phoneInput.fill('0987654321');
    await submitButton.click();

    // Verify success screen
    const successAlert = page.locator('div[role="alert"]');
    await expect(successAlert).toBeVisible({ timeout: 3000 });
    await expect(successAlert.locator('h3')).toHaveText('Đăng Ký Thành Công!');
  });

  test('FAQ Accordion - Collapse and Mutual Exclusion', async ({ page }) => {
    const faqSection = page.locator('#faq');
    await expect(faqSection).toBeVisible();

    // Locate FAQ accordion item buttons specifically
    const buttons = page.locator('section#faq button[aria-expanded]');
    await expect(buttons).toHaveCount(3);

    const firstPanel = page.locator('#faq-content-0');
    const secondPanel = page.locator('#faq-content-1');

    // Ensure all collapsed initially
    for (let i = 0; i < 3; i++) {
      await expect(buttons.nth(i)).toHaveAttribute('aria-expanded', 'false');
    }

    // 1. Expand the first FAQ
    await buttons.nth(0).click();
    await expect(buttons.nth(0)).toHaveAttribute('aria-expanded', 'true');
    await expect(firstPanel).toBeVisible();

    // 2. Expand the second FAQ, verify first collapses
    await buttons.nth(1).click();
    await expect(buttons.nth(1)).toHaveAttribute('aria-expanded', 'true');
    await expect(secondPanel).toBeVisible();

    // First FAQ should be collapsed
    await expect(buttons.nth(0)).toHaveAttribute('aria-expanded', 'false');

    // 3. Collapse the second FAQ by clicking it again
    await buttons.nth(1).click();
    await expect(buttons.nth(1)).toHaveAttribute('aria-expanded', 'false');
  });

  test('Use Case Tabs - Content Switching', async ({ page }) => {
    const useCasesSection = page.locator('section#use-cases');
    await expect(useCasesSection).toBeVisible();

    const tabs = page.locator('button[role="tab"]');
    await expect(tabs).toHaveCount(3);

    // Initially, the "Chủ doanh nghiệp" tab should be active
    await expect(tabs.nth(0)).toHaveAttribute('aria-selected', 'true');
    const activePanel = page.locator('div[role="tabpanel"]');
    await expect(activePanel).toContainText('Kiểm soát & Tối ưu dòng tiền real-time');

    // 1. Click "Quản lý kho" tab
    await tabs.nth(1).click();
    await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true');
    await expect(activePanel).toContainText('Tự động dự báo nhu cầu & Đồng bộ tồn kho');

    // 2. Click "Đội ngũ Marketing" tab
    await tabs.nth(2).click();
    await expect(tabs.nth(2)).toHaveAttribute('aria-selected', 'true');
    await expect(activePanel).toContainText('Tối ưu hóa ngân sách quảng cáo thông minh');
  });

  test('Hero Dashboard mockup - SVG Widget Interactions', async ({ page }) => {
    const heroSection = page.locator('section[aria-label="Introduction Hero"]');
    await expect(heroSection).toBeVisible();

    const svgDashboard = heroSection.locator('svg[aria-label="Bảng vận hành AI"]');
    await expect(svgDashboard).toBeVisible();

    const inventoryWidget = svgDashboard.locator('g:has-text("DỰ BÁO TỒN KHO")');
    const ordersWidget = svgDashboard.locator('g:has-text("ĐƠN HÀNG TỰ ĐỘNG")');

    // Initially, standard AI recommendation text should be visible
    await expect(svgDashboard.locator('text:has-text("💡 ĐỀ XUẤT HỆ THỐNG AI")')).toBeVisible();

    // 1. Hover Inventory widget
    await inventoryWidget.hover();
    await expect(svgDashboard.locator('text:has-text("✓ KHÔNG CÓ RỦI RO ĐỨT GÃY")')).toBeVisible();

    // 2. Hover Orders widget
    await ordersWidget.hover();
    await expect(svgDashboard.locator('text:has-text("⚡ XỬ LÝ TỰ ĐỘNG SIÊU TỐC")')).toBeVisible();
  });

  test('Accessibility / Programmatic Color Contrast Audit', async ({ page }) => {
    const elementsToAudit = [
      {
        name: 'Hero Primary CTA Button',
        selector: 'a:has-text("Dùng thử miễn phí 7 ngày")',
      },
      {
        name: 'Form Submit Button',
        selector: '#lead-capture button[type="submit"]',
      },
      {
        name: 'Lead capture Form container text',
        selector: '#lead-capture label[for="email"]',
      },
      {
        name: 'Success Reset button (Safety Orange text on white container bg)',
        selector: 'button:has-text("Gửi lại yêu cầu khác")',
        expectViolation: true,
      }
    ];

    // Trigger success screen first for the Success Reset button
    await page.locator('input#email').fill('test@company.com');
    await page.locator('input#company').fill('Doanh Nghiệp Test');
    await page.locator('input#phone').fill('0987654321');
    await page.locator('#lead-capture button[type="submit"]').click();
    await expect(page.locator('div[role="alert"]')).toBeVisible({ timeout: 5000 });

    const resetButton = page.locator('button:has-text("Gửi lại yêu cầu khác")');
    await expect(resetButton).toBeVisible();

    console.log('\n--- Programmatic Color Contrast Audit ---');

    for (const item of elementsToAudit) {
      const locator = page.locator(item.selector);
      if (await locator.count() > 0) {
        const computedColors = await locator.evaluate((node) => {
          const style = window.getComputedStyle(node);
          
          let bg = style.backgroundColor;
          let parent: HTMLElement | null = node.parentElement;
          while (bg === 'rgba(0, 0, 0, 0)' || bg === 'transparent') {
            if (!parent) break;
            const parentStyle = window.getComputedStyle(parent);
            bg = parentStyle.backgroundColor;
            parent = parent.parentElement;
          }

          return {
            color: style.color,
            backgroundColor: bg,
            fontSize: style.fontSize,
            fontWeight: style.fontWeight,
          };
        });

        const fgRgb = parseRgb(computedColors.color);
        const bgRgb = parseRgb(computedColors.backgroundColor);
        const ratio = getContrastRatio(fgRgb, bgRgb);

        console.log(`Element: ${item.name}`);
        console.log(`- Selector: ${item.selector}`);
        console.log(`- Foreground color: ${computedColors.color}`);
        console.log(`- Background color: ${computedColors.backgroundColor}`);
        console.log(`- Calculated contrast ratio: ${ratio.toFixed(2)}:1`);
        console.log(`- Font size: ${computedColors.fontSize}, Font weight: ${computedColors.fontWeight}`);
        
        const fontSizePx = parseFloat(computedColors.fontSize);
        const isBold = parseInt(computedColors.fontWeight, 10) >= 700 || computedColors.fontWeight === 'bold';
        const isLargeText = fontSizePx >= 24 || (fontSizePx >= 18.66 && isBold);
        const requiredRatio = isLargeText ? 3.0 : 4.5;
        const passed = ratio >= requiredRatio;

        console.log(`- Required ratio: ${requiredRatio}:1 (${isLargeText ? 'Large text' : 'Normal text'})`);
        console.log(`- Status: ${passed ? 'PASS' : 'FAIL (Contrast Violation)'}`);

        if (item.expectViolation) {
          expect(passed).toBe(false); // Verify that we catch this accessibility failure empirically!
        } else {
          expect(passed).toBe(true);
        }
      }
    }
    console.log('-------------------------------------\n');
  });
});
