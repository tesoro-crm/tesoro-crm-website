import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Go to blog index
  await page.goto('http://localhost:4321/blog', { timeout: 10000 }).catch(() => {
    console.log('Dev server not running. Please start it with: npm run dev');
    process.exit(1);
  });
  await page.waitForTimeout(2000);
  
  // Take screenshot
  await page.screenshot({ path: 'blog-index-screenshot.png', fullPage: true });
  
  console.log('Screenshot saved: blog-index-screenshot.png');
  
  // Check for broken images
  const images = await page.$$eval('img', imgs => 
    imgs.map(img => ({
      src: img.src,
      alt: img.alt,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      width: img.width,
      height: img.height,
      complete: img.complete
    }))
  );
  
  console.log('\nImage analysis:');
  images.forEach((img, i) => {
    console.log(`\nImage ${i + 1}:`);
    console.log(`  src: ${img.src}`);
    console.log(`  alt: ${img.alt}`);
    console.log(`  dimensions: ${img.width}x${img.height}`);
    console.log(`  natural: ${img.naturalWidth}x${img.naturalHeight}`);
    console.log(`  loaded: ${img.complete && img.naturalWidth > 0}`);
  });
  
  await browser.close();
})();
