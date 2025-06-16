#!/usr/bin/env node

/**
 * Build script for combining modular translation files
 *
 * Run this script when you make changes to translation modules:
 * npx tsx scripts/build-translations.ts
 *
 * Or add it to your package.json scripts:
 * "build:translations": "tsx scripts/build-translations.ts"
 */

import { buildCombinedTranslations } from '../src/i18n/messages/index.js';

async function main() {
  console.log('🚀 Building combined translation files...');

  try {
    await buildCombinedTranslations();
    console.log('✅ Translation build completed successfully!');
  } catch (error) {
    console.error('❌ Translation build failed:', error);
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
