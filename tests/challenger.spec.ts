import { test, expect } from '@playwright/test';

// Helper function to calculate relative luminance
export function getLuminance(r: number, g: number, b: number): number {
  const a = [r / 255, g / 255, b / 255].map((val) => {
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });
  const [aR = 0, aG = 0, aB = 0] = a;
  return 0.2126 * aR + 0.7152 * aG + 0.0722 * aB;
}

// Helper to calculate contrast ratio
export function getContrastRatio(rgb1: [number, number, number], rgb2: [number, number, number]): number {
  const lum1 = getLuminance(...rgb1);
  const lum2 = getLuminance(...rgb2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

// Parses rgb(...) or rgba(...) string
export function parseRGB(rgbStr: string): [number, number, number] {
  const match = rgbStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);
  if (!match) return [0, 0, 0];
  const m1 = match[1];
  const m2 = match[2];
  const m3 = match[3];
  if (m1 !== undefined && m2 !== undefined && m3 !== undefined) {
    return [parseInt(m1), parseInt(m2), parseInt(m3)];
  }
  return [0, 0, 0];
}

test.describe('NoThanagentic Homepage Component Skeletons and Page Integration', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.describe('Lead Capture Form validation and submission', () => {
    test('should show validation errors in Vietnamese when inputs are empty or invalid', async ({ page }) => {
      const emailInput = page.locator('#email');
      const companyInput = page.locator('#company');
      const phoneInput = page.locator('#phone');
      const submitBtn = page.locator('button[type="submit"]');

      // 1. Submit empty form
      await submitBtn.click();

      // Check validation error messages
      await expect(page.locator('text=Vui lòng nhập email công việc')).toBeVisible();
      await expect(page.locator('text=Tên công ty phải có ít nhất 2 ký tự')).toBeVisible();
      await expect(page.locator('text=Vui lòng nhập số điện thoại')).toBeVisible();

      // 2. Submit invalid email and invalid phone format
      await emailInput.fill('invalid-email');
      await companyInput.fill('A'); // too short (1 char)
      await phoneInput.fill('0123456789'); // invalid format (regex requires 3|5|7|8|9 as second digit)
      await submitBtn.click();

      await expect(page.locator('text=Định dạng email công việc không hợp lệ')).toBeVisible();
      await expect(page.locator('text=Tên công ty phải có ít nhất 2 ký tự')).toBeVisible();
      await expect(page.locator('text=Số điện thoại Việt Nam không hợp lệ')).toBeVisible();
    });

    test('should transition to success screen on valid inputs', async ({ page }) => {
      const emailInput = page.locator('#email');
      const companyInput = page.locator('#company');
      const phoneInput = page.locator('#phone');
      const submitBtn = page.locator('button[type="submit"]');

      await emailInput.fill('contact@innovasoft.vn');
      await companyInput.fill('InnovaSoft');
      await phoneInput.fill('0987654321');
      
      await submitBtn.click();

      // Wait for success screen
      const successTitle = page.locator('text=Đăng Ký Thành Công!');
      await expect(successTitle).toBeVisible();

      // Try "Gửi lại yêu cầu khác" to ensure we can transition back
      const resubmitBtn = page.locator('button:has-text("Gửi lại yêu cầu khác")');
      await expect(resubmitBtn).toBeVisible();
      await resubmitBtn.click();

      // Form should be visible again and cleared
      await expect(emailInput).toBeVisible();
      await expect(emailInput).toHaveValue('');
      await expect(companyInput).toHaveValue('');
      await expect(phoneInput).toHaveValue('');
    });
  });

  test.describe('FAQ Accordion behavior', () => {
    test('should only allow one FAQ item to be open at a time', async ({ page }) => {
      const faqButtons = page.locator('#faq button[aria-expanded]');
      const count = await faqButtons.count();
      expect(count).toBe(3);

      // Verify all are collapsed initially
      for (let i = 0; i < count; i++) {
        await expect(faqButtons.nth(i)).toHaveAttribute('aria-expanded', 'false');
      }

      // Expand the first FAQ
      await faqButtons.nth(0).click();
      await expect(faqButtons.nth(0)).toHaveAttribute('aria-expanded', 'true');
      await expect(page.locator('#faq-content-0')).toBeVisible();

      // Expand the second FAQ and verify the first is automatically closed
      await faqButtons.nth(1).click();
      await expect(faqButtons.nth(1)).toHaveAttribute('aria-expanded', 'true');
      await expect(page.locator('#faq-content-1')).toBeVisible();
      
      await expect(faqButtons.nth(0)).toHaveAttribute('aria-expanded', 'false');
      // In Tailwind we transition max-h, so check that it's collapsed (height 0 or hidden)
      const content0 = page.locator('#faq-content-0');
      await expect(content0).toHaveClass(/max-h-0/);

      // Collapse the second FAQ and verify all are closed
      await faqButtons.nth(1).click();
      await expect(faqButtons.nth(1)).toHaveAttribute('aria-expanded', 'false');
      await expect(page.locator('#faq-content-1')).toHaveClass(/max-h-0/);
    });
  });

  test.describe('Use Case tabs switching', () => {
    test('should switch active content when tabs are clicked', async ({ page }) => {
      const tabs = page.locator('button[role="tab"]');
      const count = await tabs.count();
      expect(count).toBe(3);

      // Tab 1 (Chủ doanh nghiệp) should be active by default
      await expect(tabs.nth(0)).toHaveAttribute('aria-selected', 'true');
      await expect(page.locator('#usecase-panel-owner')).toBeVisible();

      // Click Tab 2 (Quản lý kho)
      await tabs.nth(1).click();
      await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true');
      await expect(tabs.nth(0)).toHaveAttribute('aria-selected', 'false');
      await expect(page.locator('#usecase-panel-warehouse')).toBeVisible();

      // Click Tab 3 (Đội ngũ Marketing)
      await tabs.nth(2).click();
      await expect(tabs.nth(2)).toHaveAttribute('aria-selected', 'true');
      await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'false');
      await expect(page.locator('#usecase-panel-marketing')).toBeVisible();
    });
  });

  test.describe('Hero Dashboard Mockup SVG interaction', () => {
    test('should update recommendation panel on SVG widget interaction', async ({ page }) => {
      // Find recommendation text container inside the SVG
      const recommendationText = page.locator('svg[aria-label="Bảng vận hành AI"] >> text:has-text("💡 ĐỀ XUẤT HỆ THỐNG AI")');
      await expect(recommendationText).toBeVisible();

      // Locate Inventory widget (Widget 1)
      const inventoryWidget = page.locator('svg[aria-label="Bảng vận hành AI"] >> text:has-text("DỰ BÁO TỒN KHO")');
      await expect(inventoryWidget).toBeVisible();

      // Click Inventory Widget to trigger state change
      await inventoryWidget.click();

      // Verify that the inventory recommendation appears
      const inventoryRec = page.locator('svg[aria-label="Bảng vận hành AI"] >> text:has-text("✓ KHÔNG CÓ RỦI RO ĐỨT GÃY")');
      await expect(inventoryRec).toBeVisible();

      // Locate Orders widget (Widget 2)
      const ordersWidget = page.locator('svg[aria-label="Bảng vận hành AI"] >> text:has-text("ĐƠN HÀNG TỰ ĐỘNG")');
      await expect(ordersWidget).toBeVisible();

      // Click Orders Widget to trigger state change
      await ordersWidget.click();

      // Verify that orders recommendation appears
      const ordersRec = page.locator('svg[aria-label="Bảng vận hành AI"] >> text:has-text("⚡ XỬ LÝ TỰ ĐỘNG SIÊU TỐC")');
      await expect(ordersRec).toBeVisible();
    });
  });

  test.describe('Accessibility & Color Contrast Audit', () => {
    test('should ensure WCAG 2.1 AA compliance for key branding elements', async ({ page }) => {
      // We will audit colors programmatically by executing Javascript in the browser.
      const contrastResults = await page.evaluate(() => {
        function getLuminance(r: number, g: number, b: number): number {
          const a = [r / 255, g / 255, b / 255].map((val) => {
            return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
          });
          const [aR = 0, aG = 0, aB = 0] = a;
          return 0.2126 * aR + 0.7152 * aG + 0.0722 * aB;
        }

        function getContrastRatio(rgb1: [number, number, number], rgb2: [number, number, number]): number {
          const lum1 = getLuminance(...rgb1);
          const lum2 = getLuminance(...rgb2);
          const brightest = Math.max(lum1, lum2);
          const darkest = Math.min(lum1, lum2);
          return (brightest + 0.05) / (darkest + 0.05);
        }

        function parseRGBA(rgbaStr: string): { r: number, g: number, b: number, a: number } {
          const match = rgbaStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
          if (!match) return { r: 0, g: 0, b: 0, a: 1 };
          return {
            r: parseInt(match[1]!),
            g: parseInt(match[2]!),
            b: parseInt(match[3]!),
            a: match[4] !== undefined ? parseFloat(match[4]!) : 1
          };
        }

        function getBlendedBgColor(el: Element): [number, number, number] {
          let current: Element | null = el;
          const layers: { r: number, g: number, b: number, a: number }[] = [];
          
          while (current) {
            const style = window.getComputedStyle(current);
            const rgba = parseRGBA(style.backgroundColor);
            if (rgba.a > 0) {
              layers.push(rgba);
              if (rgba.a === 1) {
                break;
              }
            }
            current = current.parentElement;
          }
          
          // Default fallback base is white
          let r = 255;
          let g = 255;
          let b = 255;
          
          // Reverse so we blend from bottom-most (closest to opaque base) to top-most
          layers.reverse();
          for (const layer of layers) {
            r = layer.a * layer.r + (1 - layer.a) * r;
            g = layer.a * layer.g + (1 - layer.a) * g;
            b = layer.a * layer.b + (1 - layer.a) * b;
          }
          
          return [Math.round(r), Math.round(g), Math.round(b)];
        }

        const elementsToAudit = [
          {
            name: 'Hero Primary CTA Button (Safety Orange bg, Dark Purple text)',
            selector: 'section[aria-label="Introduction Hero"] a.bg-brand-accent',
            expectedMinContrast: 4.5
          },
          {
            name: 'Lead Form Submit Button (Safety Orange bg, Dark Purple text)',
            selector: '#lead-capture button[type="submit"]',
            expectedMinContrast: 4.5
          },
          {
            name: 'Hero Badge (Safety Orange text on light orange transparent bg)',
            selector: 'section[aria-label="Introduction Hero"] span.text-brand-accent',
            expectedMinContrast: 3.0 // Large text badge
          },
          {
            name: 'Lead Form Email Input Label (Dark Purple text on light grey bg)',
            selector: '#lead-capture label[for="email"]',
            expectedMinContrast: 4.5
          }
        ];

        return elementsToAudit.map((el) => {
          const element = document.querySelector(el.selector);
          if (!element) {
            return { name: el.name, error: 'Element not found', pass: false };
          }
          const style = window.getComputedStyle(element);
          const colorRGBA = parseRGBA(style.color);
          const color: [number, number, number] = [colorRGBA.r, colorRGBA.g, colorRGBA.b];
          const finalBg = getBlendedBgColor(element);

          const ratio = getContrastRatio(color, finalBg);
          return {
            name: el.name,
            color: style.color,
            backgroundColor: style.backgroundColor,
            resolvedBg: `rgb(${finalBg.join(',')})`,
            ratio: parseFloat(ratio.toFixed(2)),
            pass: ratio >= el.expectedMinContrast
          };
        });
      });

      console.log('Contrast Audit Results:', JSON.stringify(contrastResults, null, 2));

      // Assert that all audited elements meet the contrast requirements
      for (const result of contrastResults) {
        if ('error' in result) {
          throw new Error(`Audit failed for "${result.name}": ${result.error}`);
        }
        expect(result.pass, `Contrast ratio for ${result.name} was ${result.ratio}, expected at least ${result.ratio >= 4.5 ? 4.5 : 3.0}`).toBe(true);
      }
    });
  });

});
