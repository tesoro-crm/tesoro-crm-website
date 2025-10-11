import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    // Navigate to blog post
    console.log('🔍 Navigating to blog post...');
    await page.goto('http://localhost:4321/blog/makelaar-website-transformatie', { 
      timeout: 30000,
      waitUntil: 'domcontentloaded'
    });
    
    await page.waitForTimeout(1000);
    
    // Get initial TOC position
    const tocSelector = 'nav[aria-labelledby="toc-heading"]';
    const toc = await page.$(tocSelector);
    
    if (!toc) {
      console.log('❌ TOC not found!');
      await browser.close();
      return;
    }
    
    // Get initial position
    const initialBox = await toc.boundingBox();
    console.log('\n📍 Initial TOC position:', {
      top: Math.round(initialBox.y),
      left: Math.round(initialBox.x),
      width: Math.round(initialBox.width),
      height: Math.round(initialBox.height)
    });
    
    // Get computed style
    const initialStyle = await page.evaluate((sel) => {
      const el = document.querySelector(sel);
      const style = window.getComputedStyle(el);
      return {
        position: style.position,
        top: style.top,
        overflow: style.overflow
      };
    }, tocSelector);
    console.log('🎨 TOC CSS:', initialStyle);
    
    // Check ALL parent properties that can break sticky
    const parentIssues = await page.evaluate((sel) => {
      const el = document.querySelector(sel);
      let parent = el.parentElement;
      const issues = [];
      
      while (parent && parent !== document.body) {
        const style = window.getComputedStyle(parent);
        const hasIssue = 
          style.overflow !== 'visible' || 
          style.overflowX !== 'visible' || 
          style.overflowY !== 'visible' ||
          style.display === 'flex' ||
          style.display === 'grid' ||
          style.height !== 'auto' ||
          style.maxHeight !== 'none';
          
        if (hasIssue) {
          issues.push({
            element: parent.className || parent.tagName,
            overflow: style.overflow,
            overflowX: style.overflowX,
            overflowY: style.overflowY,
            display: style.display,
            height: style.height,
            maxHeight: style.maxHeight
          });
        }
        parent = parent.parentElement;
      }
      return issues;
    }, tocSelector);
    
    if (parentIssues.length > 0) {
      console.log('\n⚠️  Parent containers with potential sticky-breaking properties:');
      parentIssues.forEach((issue, i) => {
        console.log(`\n   ${i + 1}. ${issue.element}`);
        console.log(`      display: ${issue.display}`);
        console.log(`      overflow: ${issue.overflow} / ${issue.overflowX} / ${issue.overflowY}`);
        console.log(`      height: ${issue.height}`);
        console.log(`      maxHeight: ${issue.maxHeight}`);
      });
    } else {
      console.log('\n✅ No parent issues found');
    }
    
    // Scroll down 500px
    console.log('\n📜 Scrolling down 500px...');
    await page.evaluate(() => window.scrollBy(0, 500));
    await page.waitForTimeout(500);
    
    const afterScrollBox = await toc.boundingBox();
    console.log('📍 TOC position after scroll:', {
      top: Math.round(afterScrollBox.y),
      left: Math.round(afterScrollBox.x),
      width: Math.round(afterScrollBox.width),
      height: Math.round(afterScrollBox.height)
    });
    
    // Calculate if it's sticky
    const topDifference = Math.abs(afterScrollBox.y - initialBox.y);
    const isSticky = topDifference < 50; // Should stay roughly in same viewport position
    
    console.log('\n🎯 Sticky Test Result:');
    console.log(`   Initial top: ${Math.round(initialBox.y)}px`);
    console.log(`   After scroll top: ${Math.round(afterScrollBox.y)}px`);
    console.log(`   Difference: ${Math.round(topDifference)}px`);
    
    if (isSticky) {
      console.log('   ✅ TOC IS STICKY! (position stayed roughly the same)');
    } else {
      console.log('   ❌ TOC IS NOT STICKY! (scrolled away)');
    }
    
    // Scroll more to see if it stays
    console.log('\n📜 Scrolling down another 1000px...');
    await page.evaluate(() => window.scrollBy(0, 1000));
    await page.waitForTimeout(500);
    
    const finalBox = await toc.boundingBox();
    console.log('📍 Final TOC position:', {
      top: Math.round(finalBox.y),
      left: Math.round(finalBox.x)
    });
    
    const finalDifference = Math.abs(finalBox.y - afterScrollBox.y);
    console.log(`   Difference from previous: ${Math.round(finalDifference)}px`);
    
    if (finalDifference < 50) {
      console.log('   ✅ Still sticky after more scrolling!');
    } else {
      console.log('   ❌ Lost stickiness!');
    }
    
    // Take screenshot
    await page.screenshot({ path: 'toc-sticky-test.png', fullPage: false });
    console.log('\n📸 Screenshot saved: toc-sticky-test.png');
    
    // Keep browser open for 5 seconds to see the result
    console.log('\n⏳ Keeping browser open for 5 seconds...');
    await page.waitForTimeout(5000);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await browser.close();
  }
})();
