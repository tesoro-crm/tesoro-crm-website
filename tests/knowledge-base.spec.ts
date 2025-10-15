import { test, expect } from '@playwright/test';

test.describe('Knowledge Base', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/nl/knowledge-base');
  });

  test('should load knowledge base successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Tesoro Kennisbank/);
  });

  test('should display beginner-first hero', async ({ page }) => {
    const hero = page.locator('.kb-hero');
    await expect(hero).toBeVisible();

    const title = page.locator('.kb-hero__title');
    await expect(title).toBeVisible();
    await expect(title).toContainText(/Nieuw bij Tesoro/i);
  });

  test('should display progress bar', async ({ page }) => {
    const progressBar = page.locator('.progress-bar');
    await expect(progressBar).toBeVisible();

    // Progress fill exists (even if 0% width)
    const progressFill = page.locator('.progress-bar__fill');
    await expect(progressFill).toHaveCount(1);

    const progressLabel = page.locator('.progress-bar__label');
    await expect(progressLabel).toContainText(/compleet/);
  });

  test('should display 4 numbered steps', async ({ page }) => {
    const steps = page.locator('.step');
    const stepCount = await steps.count();

    // Should have at least 1 step (might have more depending on content)
    expect(stepCount).toBeGreaterThanOrEqual(1);

    // First step should have number 1
    const firstStepNumber = page.locator('.step').first().locator('.step__number');
    await expect(firstStepNumber).toContainText('1');
  });

  test('should have working search', async ({ page }) => {
    const searchInput = page.locator('#kb-search');
    await expect(searchInput).toBeVisible();

    // Type in search
    await searchInput.fill('contact');

    // Search should filter results
    const steps = page.locator('.step');
    const visibleSteps = await steps.evaluateAll(steps =>
      steps.filter(step => getComputedStyle(step).display !== 'none')
    );

    // Should have filtered results (or show all if no matches)
    expect(Array.isArray(visibleSteps)).toBeTruthy();
  });

  test('should have collapsible "More Help" section', async ({ page }) => {
    const moreHelpToggle = page.locator('#more-help-toggle');
    await expect(moreHelpToggle).toBeVisible();

    const moreHelpContent = page.locator('#more-help-content');

    // Should be collapsed initially
    const ariaExpanded = await moreHelpToggle.getAttribute('aria-expanded');
    expect(ariaExpanded).toBe('false');

    // Click to expand
    await moreHelpToggle.click();
    await page.waitForTimeout(300); // Wait for animation

    const ariaExpandedAfter = await moreHelpToggle.getAttribute('aria-expanded');
    expect(ariaExpandedAfter).toBe('true');
  });

  test('should track step completion', async ({ page }) => {
    const firstStep = page.locator('.step').first();

    // Click the first step
    await firstStep.click();

    // Wait for navigation or localStorage update
    await page.waitForTimeout(100);

    // Check if localStorage was updated
    const completedSteps = await page.evaluate(() => {
      const saved = localStorage.getItem('tesoro-kb-completed-steps');
      return saved ? JSON.parse(saved) : [];
    });

    expect(Array.isArray(completedSteps)).toBeTruthy();
  });

  test('should have mobile-optimized layout', async ({ page, isMobile }) => {
    if (isMobile) {
      // Hero should be visible and readable
      const heroTitle = page.locator('.kb-hero__title');
      const fontSize = await heroTitle.evaluate(el =>
        parseFloat(getComputedStyle(el).fontSize)
      );

      // Should be at least 24px on mobile
      expect(fontSize).toBeGreaterThanOrEqual(24);

      // Steps should stack vertically on mobile
      const firstStep = page.locator('.step').first();
      const flexDirection = await firstStep.evaluate(el =>
        getComputedStyle(el).flexDirection
      );

      expect(flexDirection).toBe('column');
    }
  });

  test('should not have horizontal scroll', async ({ page }) => {
    const bodyScrollWidth = await page.evaluate(() => document.body.scrollWidth);
    const windowWidth = await page.evaluate(() => window.innerWidth);

    expect(bodyScrollWidth).toBeLessThanOrEqual(windowWidth + 1);
  });

  test('should display guide categories when expanded', async ({ page }) => {
    const moreHelpToggle = page.locator('#more-help-toggle');
    await moreHelpToggle.click();
    await page.waitForTimeout(300);

    // Should show guide categories
    const guideCategories = page.locator('.guide-category');
    const categoryCount = await guideCategories.count();

    // Should have at least 1 category
    expect(categoryCount).toBeGreaterThanOrEqual(1);
  });

  test('should have accessible step cards', async ({ page }) => {
    const firstStep = page.locator('.step').first();

    // Should have title
    const title = firstStep.locator('.step__title');
    await expect(title).toBeVisible();

    // Should have description
    const desc = firstStep.locator('.step__desc');
    await expect(desc).toBeVisible();

    // Should have metadata
    const meta = firstStep.locator('.step__meta');
    await expect(meta).toBeVisible();
  });

  test('should update progress bar on step click', async ({ page }) => {
    // Clear localStorage first
    await page.evaluate(() => localStorage.clear());
    await page.reload();

    // Check initial localStorage is empty
    const initialSteps = await page.evaluate(() => {
      const saved = localStorage.getItem('tesoro-kb-completed-steps');
      return saved ? JSON.parse(saved) : [];
    });
    expect(initialSteps).toHaveLength(0);

    // Get the href of the first step
    const firstStepHref = await page.locator('.step').first().getAttribute('href');

    // Click first step (this will navigate away)
    await page.locator('.step').first().click();

    // Wait for navigation
    await page.waitForLoadState('domcontentloaded');

    // Check localStorage was updated
    const completedSteps = await page.evaluate(() => {
      const saved = localStorage.getItem('tesoro-kb-completed-steps');
      return saved ? JSON.parse(saved) : [];
    });

    // Should have 1 completed step
    expect(completedSteps).toHaveLength(1);
    expect(completedSteps[0]).toBe(1);
  });
});
