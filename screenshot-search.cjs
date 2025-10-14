const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto('http://localhost:4321/knowledge-base', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  // Screenshot van de hele hero section
  await page.screenshot({
    path: '.playwright-mcp/search-icon-position.png',
    fullPage: false
  });

  // Screenshot van alleen de search bar
  const searchBar = await page.locator('.hero__search').first();
  await searchBar.screenshot({
    path: '.playwright-mcp/search-bar-closeup.png'
  });

  console.log('Screenshots saved to .playwright-mcp/');
  await browser.close();
  process.exit(0);
})();
