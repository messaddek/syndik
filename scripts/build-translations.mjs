/**
 * Build script for combining modular translation files
 * 
 * Run this script when you make changes to translation modules:
 * node scripts/build-translations.js
 */

import { readdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';

async function loadTranslationsForLocale(locale) {
  const messagesDir = join(process.cwd(), 'src/i18n/messages', locale);
  const combined = {};
  
  try {
    const files = await readdir(messagesDir);
    const jsonFiles = files.filter(file => file.endsWith('.json'));
    
    for (const file of jsonFiles) {
      const moduleName = file.replace('.json', '');
      const filePath = join(messagesDir, file);
      const content = await readFile(filePath, 'utf-8');
      combined[moduleName] = JSON.parse(content);
    }
  } catch (error) {
    console.warn(`Warning: Could not load translations for locale ${locale}:`, error.message);
  }
  
  return combined;
}

async function buildCombinedTranslations() {
  const locales = ['en', 'fr', 'ar'];
  
  for (const locale of locales) {
    const combined = await loadTranslationsForLocale(locale);
    
    // Write the combined file to the original messages directory
    const outputPath = join(process.cwd(), 'src/messages', `${locale}.json`);
    await writeFile(outputPath, JSON.stringify(combined, null, 2));
    
    console.log(`✅ Built combined translations for ${locale} (${Object.keys(combined).length} modules)`);
  }
}

async function main() {
  console.log('🚀 Building combined translation files...');
  
  try {
    await buildCombinedTranslations();
    console.log('✅ Translation build completed successfully!');
    console.log('💡 You can now use the translations normally with next-intl');
  } catch (error) {
    console.error('❌ Translation build failed:', error);
    process.exit(1);
  }
}

main();
