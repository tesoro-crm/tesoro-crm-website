/**
 * Tesoro CRM Video Recording Script
 * Records browser interactions for marketing and training videos
 */

import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const VIDEO_DIR = join(__dirname, '../.playwright-mcp/videos');
const CRM_URL = 'https://crm.tesoro.estate';

// Helper function to wait and scroll
async function smoothScroll(page, distance = 300, duration = 1000) {
  await page.evaluate(({ distance, duration }) => {
    return new Promise(resolve => {
      const start = window.pageYOffset;
      const startTime = performance.now();

      function scroll() {
        const now = performance.now();
        const time = Math.min(1, (now - startTime) / duration);
        const easing = time < 0.5 ? 2 * time * time : -1 + (4 - 2 * time) * time;

        window.scrollTo(0, start + (distance * easing));

        if (time < 1) {
          requestAnimationFrame(scroll);
        } else {
          resolve();
        }
      }

      scroll();
    });
  }, { distance, duration });
}

// Video 1: AI Property Matching Workflow
async function recordAIPropertyMatching(browser) {
  console.log('🎥 Recording: AI Property Matching Workflow...');

  const context = await browser.newContext({
    recordVideo: {
      dir: VIDEO_DIR,
      size: { width: 1920, height: 1080 }
    },
    viewport: { width: 1920, height: 1080 }
  });

  const page = await context.newPage();

  try {
    // Navigate to CRM
    await page.goto(CRM_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // Click on Deals in sidebar
    await page.click('text=Deals');
    await page.waitForTimeout(3000);

    // Show the full Kanban board
    await page.waitForSelector('.kanban-board, [class*="deal"], [class*="pipeline"]');
    await page.waitForTimeout(2000);

    // Scroll to show all stages
    await smoothScroll(page, 500, 1500);
    await page.waitForTimeout(1500);
    await smoothScroll(page, -500, 1500);
    await page.waitForTimeout(1000);

    // Click on Juan Esteves deal (in First Visit stage)
    await page.click('text=Juan Esteves');
    await page.waitForTimeout(3000);

    // Scroll within deal detail to show property matching section
    await smoothScroll(page, 400, 1500);
    await page.waitForTimeout(2000);

    // Click on Property Matching or Properties tab
    const matchingTab = await page.$('text=Property Matching, text=Properties, text=Matching');
    if (matchingTab) {
      await matchingTab.click();
      await page.waitForTimeout(3000);
    }

    // Scroll through matched properties
    await smoothScroll(page, 600, 2000);
    await page.waitForTimeout(2000);
    await smoothScroll(page, 600, 2000);
    await page.waitForTimeout(2000);

    // Click on a property to show detail
    const firstProperty = await page.$('[class*="property-card"], [class*="PropertyCard"]');
    if (firstProperty) {
      await firstProperty.click();
      await page.waitForTimeout(3000);

      // Scroll in property detail modal
      await smoothScroll(page, 300, 1500);
      await page.waitForTimeout(1500);

      // Close modal
      await page.keyboard.press('Escape');
      await page.waitForTimeout(1000);
    }

    // Show Deal Summary section
    await smoothScroll(page, -800, 1500);
    await page.waitForTimeout(2000);

    console.log('✅ AI Property Matching video recorded');

  } catch (error) {
    console.error('❌ Error recording AI Property Matching:', error.message);
  } finally {
    await context.close();
  }
}

// Video 2: Deal Pipeline Management
async function recordDealPipeline(browser) {
  console.log('🎥 Recording: Deal Pipeline Management...');

  const context = await browser.newContext({
    recordVideo: {
      dir: VIDEO_DIR,
      size: { width: 1920, height: 1080 }
    },
    viewport: { width: 1920, height: 1080 }
  });

  const page = await context.newPage();

  try {
    await page.goto(CRM_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // Navigate to Deals
    await page.click('text=Deals');
    await page.waitForTimeout(3000);

    // Show full pipeline
    await page.waitForSelector('.kanban-board, [class*="deal"], [class*="pipeline"]');
    await page.waitForTimeout(2000);

    // Slow horizontal scroll through pipeline stages
    await page.evaluate(() => {
      return new Promise(resolve => {
        const container = document.querySelector('.kanban-board, [class*="pipeline-container"]') || document.documentElement;
        const startScroll = container.scrollLeft || 0;
        const maxScroll = (container.scrollWidth || document.body.scrollWidth) - window.innerWidth;
        const duration = 8000;
        const startTime = performance.now();

        function scroll() {
          const now = performance.now();
          const time = Math.min(1, (now - startTime) / duration);
          const easing = time < 0.5 ? 2 * time * time : -1 + (4 - 2 * time) * time;

          const scrollTo = startScroll + (maxScroll * easing);
          if (container.scrollTo) {
            container.scrollTo({ left: scrollTo });
          } else {
            window.scrollTo({ left: scrollTo });
          }

          if (time < 1) {
            requestAnimationFrame(scroll);
          } else {
            resolve();
          }
        }

        scroll();
      });
    });

    await page.waitForTimeout(2000);

    // Scroll back
    await page.evaluate(() => {
      const container = document.querySelector('.kanban-board, [class*="pipeline-container"]') || document.documentElement;
      if (container.scrollTo) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        window.scrollTo({ left: 0, behavior: 'smooth' });
      }
    });

    await page.waitForTimeout(3000);

    // Hover over deal cards to show details
    const dealCards = await page.$$('[class*="deal-card"], [class*="DealCard"]');
    for (let i = 0; i < Math.min(3, dealCards.length); i++) {
      await dealCards[i].hover();
      await page.waitForTimeout(1500);
    }

    await page.waitForTimeout(2000);

    console.log('✅ Deal Pipeline video recorded');

  } catch (error) {
    console.error('❌ Error recording Deal Pipeline:', error.message);
  } finally {
    await context.close();
  }
}

// Video 3: Contact Management
async function recordContactManagement(browser) {
  console.log('🎥 Recording: Contact Management...');

  const context = await browser.newContext({
    recordVideo: {
      dir: VIDEO_DIR,
      size: { width: 1920, height: 1080 }
    },
    viewport: { width: 1920, height: 1080 }
  });

  const page = await context.newPage();

  try {
    await page.goto(CRM_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // Navigate to Contacts
    await page.click('text=Contacts');
    await page.waitForTimeout(3000);

    // Show the contacts list
    await page.waitForSelector('table, [class*="contact"]');
    await page.waitForTimeout(2000);

    // Scroll through contacts
    await smoothScroll(page, 400, 2000);
    await page.waitForTimeout(1500);
    await smoothScroll(page, 400, 2000);
    await page.waitForTimeout(1500);

    // Use filters
    const filterButton = await page.$('button:has-text("Filter"), [class*="filter"]');
    if (filterButton) {
      await filterButton.click();
      await page.waitForTimeout(2000);
      await page.keyboard.press('Escape');
      await page.waitForTimeout(1000);
    }

    // Click on a contact to show detail
    await page.click('text=Adrian Prueba, text=Juan Esteves');
    await page.waitForTimeout(3000);

    // Show different tabs
    const tabs = ['Activities', 'Emails', 'Calls', 'Deals'];
    for (const tab of tabs) {
      const tabElement = await page.$(`text=${tab}`);
      if (tabElement) {
        await tabElement.click();
        await page.waitForTimeout(2000);

        // Scroll in tab content
        await smoothScroll(page, 200, 1000);
        await page.waitForTimeout(1000);
      }
    }

    await page.waitForTimeout(2000);

    console.log('✅ Contact Management video recorded');

  } catch (error) {
    console.error('❌ Error recording Contact Management:', error.message);
  } finally {
    await context.close();
  }
}

// Video 4: Properties Management
async function recordPropertiesManagement(browser) {
  console.log('🎥 Recording: Properties Management...');

  const context = await browser.newContext({
    recordVideo: {
      dir: VIDEO_DIR,
      size: { width: 1920, height: 1080 }
    },
    viewport: { width: 1920, height: 1080 }
  });

  const page = await context.newPage();

  try {
    await page.goto(CRM_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // Navigate to Properties
    await page.click('text=Properties, text=Propiedades');
    await page.waitForTimeout(3000);

    // Show properties list
    await page.waitForSelector('table, [class*="property"]');
    await page.waitForTimeout(2000);

    // Show total count prominently
    await page.waitForTimeout(1500);

    // Scroll through properties
    await smoothScroll(page, 500, 2500);
    await page.waitForTimeout(1500);
    await smoothScroll(page, 500, 2500);
    await page.waitForTimeout(1500);

    // Use column visibility or filters
    const columnsButton = await page.$('button:has-text("Columns"), [class*="column"]');
    if (columnsButton) {
      await columnsButton.click();
      await page.waitForTimeout(2000);
      await page.keyboard.press('Escape');
      await page.waitForTimeout(1000);
    }

    // Apply a filter (e.g., by MLS source)
    const filterButton = await page.$('button:has-text("Filter"), [class*="filter"]');
    if (filterButton) {
      await filterButton.click();
      await page.waitForTimeout(2000);

      // Select a filter option
      const mlsFilter = await page.$('text=MLS, text=Source');
      if (mlsFilter) {
        await mlsFilter.click();
        await page.waitForTimeout(2000);
      }

      await page.keyboard.press('Escape');
      await page.waitForTimeout(1000);
    }

    // Click on a property to show detail
    const firstProperty = await page.$('tr:has-text("Apartment"), tr:has-text("Villa")');
    if (firstProperty) {
      await firstProperty.click();
      await page.waitForTimeout(3000);

      // Scroll in property detail
      await smoothScroll(page, 400, 2000);
      await page.waitForTimeout(1500);

      // Close detail
      await page.keyboard.press('Escape');
      await page.waitForTimeout(1000);
    }

    await page.waitForTimeout(2000);

    console.log('✅ Properties Management video recorded');

  } catch (error) {
    console.error('❌ Error recording Properties Management:', error.message);
  } finally {
    await context.close();
  }
}

// Main execution
async function main() {
  console.log('🎬 Starting Tesoro CRM Video Recording...\n');

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    await recordAIPropertyMatching(browser);
    await recordDealPipeline(browser);
    await recordContactManagement(browser);
    await recordPropertiesManagement(browser);

    console.log('\n✅ All videos recorded successfully!');
    console.log(`📁 Videos saved to: ${VIDEO_DIR}`);
    console.log('\nNote: Videos are saved in WebM format by default.');
    console.log('You can convert to MP4 using ffmpeg if needed.');

  } catch (error) {
    console.error('\n❌ Error during recording:', error);
  } finally {
    await browser.close();
  }
}

main();
