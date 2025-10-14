#!/usr/bin/env node

/**
 * Screenshot Helper - Manage screenshot manifest and prevent duplicates
 * Usage: node screenshot-helper.js <command> [options]
 */

const fs = require('fs');
const path = require('path');

const MANIFEST_PATH = path.join(__dirname, 'screenshots-manifest.json');

class ScreenshotHelper {
  constructor() {
    this.manifest = this.loadManifest();
  }

  loadManifest() {
    try {
      const data = fs.readFileSync(MANIFEST_PATH, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error loading manifest:', error.message);
      process.exit(1);
    }
  }

  saveManifest() {
    try {
      fs.writeFileSync(
        MANIFEST_PATH,
        JSON.stringify(this.manifest, null, 2),
        'utf8'
      );
      console.log('✓ Manifest saved successfully');
    } catch (error) {
      console.error('Error saving manifest:', error.message);
      process.exit(1);
    }
  }

  /**
   * Check if a screenshot already exists
   * @param {Object} criteria - Search criteria
   * @returns {Object|null} - Found screenshot or null
   */
  exists(criteria) {
    const { category, module, description, filename } = criteria;

    // Get all screenshots from all categories
    const allScreenshots = [
      ...(this.manifest.videos || []),
      ...(this.manifest.comprehensiveScreenshots || []),
      ...(this.manifest.crmModuleScreenshots || []),
      ...(this.manifest.marketingWebsiteScreenshots || []),
      ...(this.manifest.knowledgeBaseScreenshots || []),
      ...(this.manifest.crmWorkflowScreenshots || []),
      ...(this.manifest.videoSequenceScreenshots || []),
      ...(this.manifest.miscellaneousScreenshots || [])
    ];

    // Search by filename (exact match)
    if (filename) {
      const found = allScreenshots.find(s => s.filename === filename);
      if (found) return found;
    }

    // Search by module + description similarity
    if (module && description) {
      const found = allScreenshots.find(s => {
        const moduleMatch = s.module === module;
        const descSimilar = this.isSimilar(s.description, description);
        return moduleMatch && descSimilar;
      });
      if (found) return found;
    }

    // Search by category + module
    if (category && module) {
      const found = allScreenshots.find(s =>
        s.category === category && s.module === module
      );
      if (found) return found;
    }

    return null;
  }

  /**
   * Check if two descriptions are similar (fuzzy match)
   */
  isSimilar(desc1, desc2) {
    const normalize = (str) => str.toLowerCase().replace(/[^a-z0-9]/g, '');
    const n1 = normalize(desc1);
    const n2 = normalize(desc2);

    // Check if one contains the other
    if (n1.includes(n2) || n2.includes(n1)) return true;

    // Check word overlap
    const words1 = desc1.toLowerCase().split(/\s+/);
    const words2 = desc2.toLowerCase().split(/\s+/);
    const overlap = words1.filter(w => words2.includes(w)).length;
    const threshold = Math.min(words1.length, words2.length) * 0.6;

    return overlap >= threshold;
  }

  /**
   * Add a new screenshot to the manifest
   */
  add(screenshot) {
    const { category, filename, module, description, purpose, videoFile } = screenshot;

    if (!filename || !category || !module || !description) {
      console.error('Error: Missing required fields (filename, category, module, description)');
      process.exit(1);
    }

    // Check if already exists
    const existing = this.exists({ filename, module, description });
    if (existing) {
      console.log('⚠ Screenshot already exists:');
      console.log(JSON.stringify(existing, null, 2));
      return false;
    }

    // Determine which array to add to
    let targetArray;
    switch (category) {
      case 'crm-workflows':
        if (filename.includes('videos/') && filename.endsWith('.mp4')) {
          targetArray = 'videos';
        } else if (filename.includes('comprehensive-screenshots/')) {
          targetArray = 'comprehensiveScreenshots';
        } else {
          targetArray = 'crmWorkflowScreenshots';
        }
        break;
      case 'crm-modules':
        targetArray = 'crmModuleScreenshots';
        break;
      case 'marketing-website':
        targetArray = 'marketingWebsiteScreenshots';
        break;
      case 'knowledge-base':
        targetArray = 'knowledgeBaseScreenshots';
        break;
      case 'video-sequences':
        targetArray = 'videoSequenceScreenshots';
        break;
      default:
        targetArray = 'miscellaneousScreenshots';
    }

    // Create entry
    const entry = {
      filename,
      category,
      module,
      description,
      created: new Date().toISOString().split('T')[0]
    };

    if (purpose) entry.purpose = purpose;
    if (videoFile) entry.videoFile = videoFile;

    // Add to manifest
    this.manifest[targetArray].push(entry);

    // Update metadata
    this.manifest.metadata.lastUpdated = new Date().toISOString().split('T')[0];
    this.manifest.metadata.totalAssets++;
    if (filename.endsWith('.mp4')) {
      this.manifest.metadata.totalVideos++;
    } else {
      this.manifest.metadata.totalScreenshots++;
    }

    this.saveManifest();
    console.log('✓ Screenshot added to manifest:');
    console.log(JSON.stringify(entry, null, 2));
    return true;
  }

  /**
   * Search screenshots by criteria
   */
  search(criteria) {
    const { category, module, keyword } = criteria;

    const allScreenshots = [
      ...(this.manifest.videos || []),
      ...(this.manifest.comprehensiveScreenshots || []),
      ...(this.manifest.crmModuleScreenshots || []),
      ...(this.manifest.marketingWebsiteScreenshots || []),
      ...(this.manifest.knowledgeBaseScreenshots || []),
      ...(this.manifest.crmWorkflowScreenshots || []),
      ...(this.manifest.videoSequenceScreenshots || []),
      ...(this.manifest.miscellaneousScreenshots || [])
    ];

    let results = allScreenshots;

    if (category) {
      results = results.filter(s => s.category === category);
    }

    if (module) {
      results = results.filter(s => s.module === module);
    }

    if (keyword) {
      const kw = keyword.toLowerCase();
      results = results.filter(s =>
        s.description.toLowerCase().includes(kw) ||
        s.filename.toLowerCase().includes(kw)
      );
    }

    return results;
  }

  /**
   * List all screenshots for a module
   */
  listByModule(moduleName) {
    const results = this.search({ module: moduleName });
    console.log(`\nScreenshots for module "${moduleName}":\n`);
    results.forEach(s => {
      console.log(`- ${s.filename}`);
      console.log(`  ${s.description}`);
      console.log(`  Category: ${s.category}`);
      console.log('');
    });
    console.log(`Total: ${results.length} screenshots`);
  }

  /**
   * Get statistics
   */
  stats() {
    console.log('\n=== Screenshot Manifest Statistics ===\n');
    console.log(`Total Assets: ${this.manifest.metadata.totalAssets}`);
    console.log(`Total Videos: ${this.manifest.metadata.totalVideos}`);
    console.log(`Total Screenshots: ${this.manifest.metadata.totalScreenshots}`);
    console.log(`Last Updated: ${this.manifest.metadata.lastUpdated}\n`);

    console.log('Breakdown by category:');
    console.log(`- Videos: ${this.manifest.videos.length}`);
    console.log(`- Comprehensive Screenshots: ${this.manifest.comprehensiveScreenshots.length}`);
    console.log(`- CRM Module Screenshots: ${this.manifest.crmModuleScreenshots.length}`);
    console.log(`- Marketing Website Screenshots: ${this.manifest.marketingWebsiteScreenshots.length}`);
    console.log(`- Knowledge Base Screenshots: ${this.manifest.knowledgeBaseScreenshots.length}`);
    console.log(`- CRM Workflow Screenshots: ${this.manifest.crmWorkflowScreenshots.length}`);
    console.log(`- Video Sequence Screenshots: ${this.manifest.videoSequenceScreenshots.length}`);
    console.log(`- Miscellaneous: ${this.manifest.miscellaneousScreenshots.length}`);
    console.log('');
  }
}

// CLI Interface
function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  const helper = new ScreenshotHelper();

  switch (command) {
    case 'exists':
    case 'check': {
      const module = args[1];
      const description = args.slice(2).join(' ');
      if (!module) {
        console.error('Usage: node screenshot-helper.js exists <module> [description]');
        process.exit(1);
      }
      const result = helper.exists({ module, description });
      if (result) {
        console.log('✓ Screenshot exists:');
        console.log(JSON.stringify(result, null, 2));
        process.exit(0);
      } else {
        console.log('✗ Screenshot does not exist');
        process.exit(1);
      }
      break;
    }

    case 'add': {
      // Usage: node screenshot-helper.js add <filename> <category> <module> <description>
      const [filename, category, module, ...descParts] = args.slice(1);
      const description = descParts.join(' ');

      if (!filename || !category || !module || !description) {
        console.error('Usage: node screenshot-helper.js add <filename> <category> <module> <description>');
        process.exit(1);
      }

      helper.add({ filename, category, module, description });
      break;
    }

    case 'search': {
      const keyword = args.slice(1).join(' ');
      if (!keyword) {
        console.error('Usage: node screenshot-helper.js search <keyword>');
        process.exit(1);
      }
      const results = helper.search({ keyword });
      console.log(`\nFound ${results.length} results:\n`);
      results.forEach(s => {
        console.log(`- ${s.filename}`);
        console.log(`  ${s.description}`);
        console.log(`  Module: ${s.module} | Category: ${s.category}`);
        console.log('');
      });
      break;
    }

    case 'list': {
      const module = args[1];
      if (!module) {
        console.error('Usage: node screenshot-helper.js list <module>');
        process.exit(1);
      }
      helper.listByModule(module);
      break;
    }

    case 'stats': {
      helper.stats();
      break;
    }

    default:
      console.log('Screenshot Manifest Helper\n');
      console.log('Usage: node screenshot-helper.js <command> [options]\n');
      console.log('Commands:');
      console.log('  exists <module> [description]     Check if screenshot exists');
      console.log('  add <file> <cat> <mod> <desc>     Add new screenshot to manifest');
      console.log('  search <keyword>                  Search screenshots by keyword');
      console.log('  list <module>                     List all screenshots for a module');
      console.log('  stats                             Show manifest statistics');
      console.log('\nExamples:');
      console.log('  node screenshot-helper.js exists dashboard "KPIs and metrics"');
      console.log('  node screenshot-helper.js add "dashboard-new.png" crm-modules dashboard "Dashboard overview"');
      console.log('  node screenshot-helper.js search "property matching"');
      console.log('  node screenshot-helper.js list deals');
      console.log('  node screenshot-helper.js stats');
      process.exit(0);
  }
}

// Export for use in other scripts
if (require.main === module) {
  main();
} else {
  module.exports = ScreenshotHelper;
}
