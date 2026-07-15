import { test, expect } from '@playwright/test';

// Helper functions for relative luminance and contrast ratio calculations
export function parseRGB(color: string): [number, number, number] {
  if (color.startsWith('rgb')) {
    const matches = color.match(/\d+/g);
    if (matches && matches.length >= 3) {
      const m0 = matches[0];
      const m1 = matches[1];
      const m2 = matches[2];
      if (m0 !== undefined && m1 !== undefined && m2 !== undefined) {
        return [parseInt(m0), parseInt(m1), parseInt(m2)];
      }
    }
  } else if (color.startsWith('#')) {
    const hex = color.slice(1);
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return [r, g, b];
  }
  return [0, 0, 0];
}

export function getLuminance(color: string): number {
  const [r, g, b] = parseRGB(color);
  const a = [r, g, b].map(v => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  const [a0 = 0, a1 = 0, a2 = 0] = a;
  return a0 * 0.2126 + a1 * 0.7152 + a2 * 0.0722;
}

test.describe('Milestone 1 - React Components & Page Integration', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to homepage
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    // Wait for Next.js client-side hydration to complete
    await page.waitForTimeout(1500);
  });

  test('Lead Capture Form - Validation and Submission', async ({ page }) => {
    const emailInput = page.locator('#email');
    const companyInput = page.locator('#company');
    const phoneInput = page.locator('#phone');
    const submitBtn = page.locator('button[type="submit"]');

    // 1. Initial State checks
    await expect(emailInput).toBeVisible();
    await expect(companyInput).toBeVisible();
    await expect(phoneInput).toBeVisible();
    await expect(submitBtn).toBeVisible();

    // 2. Submit Empty Form and Verify Vietnamese Error Messages
    await submitBtn.click();
    
    // Check validation error texts in Vietnamese
    await expect(page.locator('text=Vui lòng nhập email công việc')).toBeVisible();
    await expect(page.locator('text=Tên công ty phải có ít nhất 2 ký tự')).toBeVisible();
    await expect(page.locator('text=Vui lòng nhập số điện thoại')).toBeVisible();

    // 3. Test Invalid Inputs
    // a. Invalid Email Format
    await emailInput.fill('invalid-email-format');
    await companyInput.fill('A'); // Too short company name
    await phoneInput.fill('123456789'); // Invalid phone format
    await submitBtn.click();

    await expect(page.locator('text=Định dạng email công việc không hợp lệ')).toBeVisible();
    await expect(page.locator('text=Tên công ty phải có ít nhất 2 ký tự')).toBeVisible();
    await expect(page.locator('text=Số điện thoại Việt Nam không hợp lệ')).toBeVisible();

    // 4. Test Valid Inputs and Successful Submission Transition
    await emailInput.fill('info@nothanagentic.com');
    await companyInput.fill('NoThanagentic JSC');
    await phoneInput.fill('0987654321');
    await submitBtn.click();

    // Verify loading state or successful submission screen
    const successTitle = page.locator('text=Đăng Ký Thành Công!');
    await expect(successTitle).toBeVisible({ timeout: 5000 });
    
    const successDesc = page.locator('text=Cảm ơn bạn đã quan tâm. Chúng tôi đã nhận được thông tin liên hệ');
    await expect(successDesc).toBeVisible();

    // 5. Test Resubmit / Reset
    const resubmitBtn = page.locator('text=Gửi lại yêu cầu khác');
    await expect(resubmitBtn).toBeVisible();
    await resubmitBtn.click();

    // Verify form reset and input fields are visible and empty again
    await expect(emailInput).toBeVisible();
    await expect(emailInput).toHaveValue('');
    await expect(companyInput).toHaveValue('');
    await expect(phoneInput).toHaveValue('');
  });

  test('FAQ Accordion - Expand/Collapse and Mutual Exclusion', async ({ page }) => {
    // Locate the FAQ section and wait for buttons to attach
    const faqButtons = page.locator('button[aria-controls^="faq-content-"]');
    await faqButtons.first().waitFor({ state: 'attached' });
    
    const faqCount = await faqButtons.count();
    expect(faqCount).toBeGreaterThan(0);

    // Verify initially all are collapsed
    for (let i = 0; i < faqCount; i++) {
      const isExpanded = await faqButtons.nth(i).getAttribute('aria-expanded');
      expect(isExpanded).toBe('false');
      
      const contentId = await faqButtons.nth(i).getAttribute('aria-controls');
      const contentDiv = page.locator(`#${contentId}`);
      await expect(contentDiv).toHaveClass(/max-h-0/);
    }

    // Expand the first FAQ item
    await faqButtons.nth(0).click();
    await expect(faqButtons.nth(0)).toHaveAttribute('aria-expanded', 'true');
    
    // Check others are still collapsed
    for (let i = 1; i < faqCount; i++) {
      await expect(faqButtons.nth(i)).toHaveAttribute('aria-expanded', 'false');
    }

    // Expand the second FAQ item and verify first collapses (Mutual Exclusion)
    await faqButtons.nth(1).click();
    await expect(faqButtons.nth(1)).toHaveAttribute('aria-expanded', 'true');
    await expect(faqButtons.nth(0)).toHaveAttribute('aria-expanded', 'false');

    // Collapse the second FAQ item by clicking it again
    await faqButtons.nth(1).click();
    await expect(faqButtons.nth(1)).toHaveAttribute('aria-expanded', 'false');
    
    // Verify all collapsed
    for (let i = 0; i < faqCount; i++) {
      await expect(faqButtons.nth(i)).toHaveAttribute('aria-expanded', 'false');
    }
  });

  test('Use Case Tabs - Content Switching', async ({ page }) => {
    // Locate tabs and panels
    const tabs = page.locator('button[role="tab"]');
    await tabs.first().waitFor({ state: 'attached' });
    
    const tabCount = await tabs.count();
    expect(tabCount).toBe(3);

    // First tab (Chủ doanh nghiệp) should be active by default
    await expect(tabs.nth(0)).toHaveAttribute('aria-selected', 'true');
    await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'false');
    await expect(tabs.nth(2)).toHaveAttribute('aria-selected', 'false');

    // Verify active panel content for Owner
    const panelOwner = page.locator('#usecase-panel-owner');
    await expect(panelOwner).toBeVisible();
    await expect(panelOwner.locator('h3')).toContainText('Kiểm soát & Tối ưu dòng tiền real-time');

    // Switch to second tab (Quản lý kho)
    await tabs.nth(1).click();
    await page.waitForTimeout(200); // small transition delay
    
    await expect(tabs.nth(0)).toHaveAttribute('aria-selected', 'false');
    await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true');
    await expect(tabs.nth(2)).toHaveAttribute('aria-selected', 'false');

    // Verify active panel content for Warehouse Manager
    const panelWarehouse = page.locator('#usecase-panel-warehouse');
    await expect(panelWarehouse).toBeVisible();
    await expect(panelWarehouse.locator('h3')).toContainText('Tự động dự báo nhu cầu & Đồng bộ tồn kho');

    // Switch to third tab (Đội ngũ Marketing)
    await tabs.nth(2).click();
    await page.waitForTimeout(200);
    
    await expect(tabs.nth(0)).toHaveAttribute('aria-selected', 'false');
    await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'false');
    await expect(tabs.nth(2)).toHaveAttribute('aria-selected', 'true');

    // Verify active panel content for Marketing Team
    const panelMarketing = page.locator('#usecase-panel-marketing');
    await expect(panelMarketing).toBeVisible();
    await expect(panelMarketing.locator('h3')).toContainText('Tối ưu hóa ngân sách quảng cáo thông minh');
  });

  test('Hero Dashboard - SVG Widget Interactions', async ({ page }) => {
    // Locate the interactive SVG groups
    const inventoryWidget = page.locator('svg[aria-label="Bảng vận hành AI"] >> text=DỰ BÁO TỒN KHO');
    const ordersWidget = page.locator('svg[aria-label="Bảng vận hành AI"] >> text=ĐƠN HÀNG TỰ ĐỘNG');

    // Initial state check
    await expect(page.locator('svg[aria-label="Bảng vận hành AI"] >> text=ĐỀ XUẤT HỆ THỐNG AI')).toBeVisible();

    // Hover/Click Inventory widget
    await inventoryWidget.hover();
    await expect(page.locator('svg[aria-label="Bảng vận hành AI"] >> text=KHÔNG CÓ RỦI RO ĐỨT GÃY')).toBeVisible();

    // Hover/Click Orders widget
    await ordersWidget.hover();
    await expect(page.locator('svg[aria-label="Bảng vận hành AI"] >> text=XỬ LÝ TỰ ĐỘNG SIÊU TỐC')).toBeVisible();
  });

  test('Accessibility - Programmatic Color Contrast Audit', async ({ page }) => {
    // Evaluate contrast calculations directly in browser context to get actual computed colors
    const auditResults = await page.evaluate(() => {
      const getElementBgColor = (element: HTMLElement) => {
        let el: HTMLElement | null = element;
        while (el) {
          const style = window.getComputedStyle(el);
          const bg = style.backgroundColor;
          if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
            return bg;
          }
          el = el.parentElement;
        }
        return 'rgb(255, 255, 255)'; // Fallback to white
      };

      const parseRGB_eval = (color: string): [number, number, number] => {
        const matches = color.match(/\d+/g);
        if (matches && matches.length >= 3) {
          const m0 = matches[0];
          const m1 = matches[1];
          const m2 = matches[2];
          if (m0 !== undefined && m1 !== undefined && m2 !== undefined) {
            return [parseInt(m0), parseInt(m1), parseInt(m2)];
          }
        }
        return [0, 0, 0];
      };

      const getLuminance_eval = (color: string): number => {
        const [r, g, b] = parseRGB_eval(color);
        const a = [r, g, b].map(v => {
          const s = v / 255;
          return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
        });
        const [a0 = 0, a1 = 0, a2 = 0] = a;
        return a0 * 0.2126 + a1 * 0.7152 + a2 * 0.0722;
      };

      const getContrastRatio_eval = (c1: string, c2: string): number => {
        const l1 = getLuminance_eval(c1);
        const l2 = getLuminance_eval(c2);
        const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
        return Math.round(ratio * 100) / 100;
      };

      // Perform contrast auditing for critical components on the page
      const elementsToAudit = [
        {
          name: 'Hero Primary CTA Button (Safety Orange bg vs Digital Twilight text)',
          selector: 'a[href="#lead-capture"].bg-brand-accent',
        },
        {
          name: 'Lead Form Submit Button (Safety Orange bg vs Digital Twilight text)',
          selector: 'button[type="submit"].bg-brand-accent',
        },
        {
          name: 'Hero Heading (White text vs Digital Twilight bg)',
          selector: 'h1',
        },
        {
          name: 'Lead Form Email Input Label (Digital Twilight text vs Oatmeal White bg)',
          selector: 'label[for="email"]',
        },
        {
          name: 'Use Case Tab Title (Oatmeal White bg vs Digital Twilight text)',
          selector: 'section#use-cases h2',
        },
        {
          name: 'FAQ Accordion Header Text (Digital Twilight text vs Oatmeal White bg)',
          selector: 'button[aria-controls^="faq-content-"]',
        }
      ];

      return elementsToAudit.map(item => {
        const element = document.querySelector(item.selector) as HTMLElement | null;
        if (!element) {
          return { name: item.name, status: 'NOT_FOUND', fg: '', bg: '', ratio: 0, required: 4.5 };
        }

        const style = window.getComputedStyle(element);
        const fg = style.color;
        const bg = getElementBgColor(element);
        const ratio = getContrastRatio_eval(fg, bg);

        // Check if text is large (>=24px, or >=18.66px and bold/700+)
        const fontSize = parseFloat(style.fontSize);
        const fontWeight = style.fontWeight;
        const isBold = fontWeight === 'bold' || parseInt(fontWeight) >= 700;
        const isLarge = fontSize >= 24 || (fontSize >= 18.66 && isBold);
        const required = isLarge ? 3.0 : 4.5;
        const passed = ratio >= required;

        return {
          name: item.name,
          status: passed ? 'PASS' : 'FAIL',
          fg,
          bg,
          fontSize: style.fontSize,
          fontWeight: style.fontWeight,
          isLarge,
          ratio,
          required
        };
      });
    });

    console.log('Accessibility Color Contrast Audit Results:');
    auditResults.forEach(res => {
      console.log(`- [${res.status}] ${res.name}:`);
      console.log(`  Foreground: ${res.fg}, Background: ${res.bg}`);
      console.log(`  FontSize: ${res.fontSize}, FontWidth: ${res.fontWeight}, LargeText: ${res.isLarge}`);
      console.log(`  Contrast Ratio: ${res.ratio} (Required: ${res.required})`);

      if (res.status === 'PASS') {
        expect(res.ratio).toBeGreaterThanOrEqual(res.required);
      } else if (res.status === 'FAIL') {
        // Log details but don't fail immediately so we collect all results
        expect(res.ratio).toBeGreaterThanOrEqual(res.required);
      }
    });
  });

});
