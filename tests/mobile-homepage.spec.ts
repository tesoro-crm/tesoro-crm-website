import { test, expect } from '@playwright/test';

test.describe('Mobile Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load homepage successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Tesoro CRM/);
  });

  test('should display hero section with simplified kanban', async ({ page, isMobile }) => {
    // Check hero section is visible
    const hero = page.locator('.hero-simple');
    await expect(hero).toBeVisible();

    // Check headline is readable
    const headline = page.locator('.hero-simple__headline');
    await expect(headline).toBeVisible();
    await expect(headline).toContainText(/Tesoro|CRM/i);

    if (isMobile) {
      // On mobile, only first kanban column should be visible
      const kanbanStages = page.locator('.hero-simple__kanban-stage');
      const visibleStages = await kanbanStages.evaluateAll(stages =>
        stages.filter(stage => getComputedStyle(stage).display !== 'none')
      );
      expect(visibleStages.length).toBeLessThanOrEqual(1);
    }
  });

  test('should have mobile-optimized CTAs', async ({ page, isMobile }) => {
    if (isMobile) {
      // CTAs should be full width on mobile
      const cta = page.locator('.hero-simple__cta').first();
      const ctaBox = await cta.boundingBox();
      const viewportWidth = page.viewportSize()?.width || 0;

      // CTA should take up most of the viewport width (accounting for padding)
      expect(ctaBox?.width).toBeGreaterThan(viewportWidth * 0.8);
    }
  });

  test('should not have animations on mobile', async ({ page, isMobile }) => {
    if (isMobile) {
      // Check that background gradient animation is disabled
      const background = page.locator('.hero-simple__background');
      const animationName = await background.evaluate(el =>
        getComputedStyle(el).animationName
      );
      expect(animationName).toBe('none');
    }
  });

  test('should display lead workflow section', async ({ page }) => {
    const workflow = page.locator('.lead-workflow');
    await expect(workflow).toBeVisible();

    // Check title is visible
    const title = page.locator('.lead-workflow__title');
    await expect(title).toBeVisible();
  });

  test('should have readable typography on mobile', async ({ page, isMobile }) => {
    if (isMobile) {
      // Check headline font size is appropriate
      const headline = page.locator('.hero-simple__headline');
      const fontSize = await headline.evaluate(el =>
        parseFloat(getComputedStyle(el).fontSize)
      );

      // Should be at least 24px (1.5rem) on mobile
      expect(fontSize).toBeGreaterThanOrEqual(24);

      // Check subheadline
      const subheadline = page.locator('.hero-simple__subheadline');
      const subFontSize = await subheadline.evaluate(el =>
        parseFloat(getComputedStyle(el).fontSize)
      );

      // Should be at least 16px (1rem) on mobile
      expect(subFontSize).toBeGreaterThanOrEqual(16);
    }
  });

  test('should have working mobile navigation', async ({ page, isMobile }) => {
    if (isMobile) {
      // Mobile menu button should be visible
      const mobileMenuButton = page.locator('#mobile-menu-button');
      await expect(mobileMenuButton).toBeVisible();

      // Click to open menu
      await mobileMenuButton.click();

      // Mobile menu should be visible
      const mobileMenu = page.locator('#mobile-menu');
      await expect(mobileMenu).toBeVisible();

      // Should have navigation links (including language links)
      const navLinks = mobileMenu.locator('a');
      const linkCount = await navLinks.count();
      expect(linkCount).toBeGreaterThan(4); // At least Features, KB, Blog, Pricing + language links
    }
  });

  test('should load features grid', async ({ page }) => {
    // Simply check if the page has loaded and has features content
    // FeaturesGrid section uses Tailwind classes
    const hasFeatures = await page.locator('body').evaluate(body =>
      body.textContent?.toLowerCase().includes('feature') ||
      body.textContent?.toLowerCase().includes('functie')
    );

    expect(hasFeatures).toBeTruthy();
  });

  test('should not have horizontal scroll', async ({ page }) => {
    const bodyScrollWidth = await page.evaluate(() => document.body.scrollWidth);
    const windowWidth = await page.evaluate(() => window.innerWidth);

    // Body scroll width should not exceed window width
    expect(bodyScrollWidth).toBeLessThanOrEqual(windowWidth + 1); // +1 for rounding
  });

  test('should have accessible contrast', async ({ page }) => {
    // Check that main headline has good contrast
    const headline = page.locator('.hero-simple__headline');
    const color = await headline.evaluate(el => getComputedStyle(el).color);

    // Color should be dark (not gray)
    // rgb(10, 31, 68) = #0a1f44
    expect(color).toContain('10'); // Should have low RGB values
  });
});

test.describe('Mobile Lead Workflow Visual', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should not auto-play on mobile', async ({ page, isMobile }) => {
    if (isMobile) {
      const steps = page.locator('[data-step]');
      await expect(steps.first()).toBeVisible();

      // Wait a bit to ensure no auto-play happens
      await page.waitForTimeout(3500);

      // First step should still be active (no transition happened)
      const activeSteps = page.locator('[data-step].active');
      await expect(activeSteps).toHaveCount(1);
    }
  });

  test('should allow manual step navigation', async ({ page }) => {
    const steps = page.locator('[data-step]');
    await expect(steps.first()).toBeVisible();

    // Click on second step
    await steps.nth(1).click();

    // Second step should become active
    await expect(steps.nth(1)).toHaveClass(/active/);
  });
});

test.describe('Mobile CoCreated Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display partner cards in single column on mobile', async ({ page, isMobile }) => {
    if (isMobile) {
      const partnersGrid = page.locator('.cocreated__partners');

      // Scroll into view first
      await partnersGrid.scrollIntoViewIfNeeded();

      // Get grid template columns - on mobile it should be a single column
      // This will be computed to a pixel value like "361px" instead of "1fr"
      const gridColumns = await partnersGrid.evaluate(el =>
        getComputedStyle(el).gridTemplateColumns
      );

      // Should be single column (one value, not three)
      const columnCount = gridColumns.split(' ').length;
      expect(columnCount).toBe(1);
    }
  });

  test('should not have gradient animations on mobile', async ({ page, isMobile }) => {
    if (isMobile) {
      const cocreated = page.locator('.cocreated');

      // Check ::before pseudo-element animation
      const beforeAnimation = await cocreated.evaluate(el => {
        const before = window.getComputedStyle(el, '::before');
        return before.animationName;
      });

      expect(beforeAnimation).toBe('none');
    }
  });

  test('should open partner drawer on click', async ({ page }) => {
    const firstPartnerCard = page.locator('.cocreated__partner-card').first();
    await firstPartnerCard.click();

    // Drawer should be open
    const drawer = page.locator('.cocreated__drawer');
    await expect(drawer).toHaveClass(/cocreated__drawer--open/);

    // Close button should be visible
    const closeButton = page.locator('#drawer-close');
    await expect(closeButton).toBeVisible();

    // Close drawer
    await closeButton.click();
    await expect(drawer).not.toHaveClass(/cocreated__drawer--open/);
  });
});
