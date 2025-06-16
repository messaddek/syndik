/**
 * Modular translation system for Syndik
 *
 * This system allows each module to have its own translation files,
 * making it easier to maintain and scale translations.
 *
 * Directory structure:
 * /i18n/messages/
 *   /en/
 *     common.json
 *     residents.json
 *     buildings.json
 *     ...
 *   /fr/
 *     common.json
 *     residents.json
 *     buildings.json
 *     ...
 *   /ar/
 *     common.json
 *     residents.json
 *     buildings.json
 *     ...
 */

import { readdir, readFile } from 'fs/promises';
import { join } from 'path';

interface TranslationModule {
  [key: string]: unknown;
}

interface CombinedTranslations {
  [key: string]: TranslationModule;
}

/**
 * Dynamically loads and combines all translation modules for a given locale
 */
async function loadTranslationsForLocale(
  locale: string
): Promise<CombinedTranslations> {
  const messagesDir = join(process.cwd(), 'src/i18n/messages', locale);
  const combined: CombinedTranslations = {};

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
    console.warn(
      `Warning: Could not load translations for locale ${locale}:`,
      error
    );
  }

  return combined;
}

/**
 * Pre-build the combined translation files for next-intl
 * This should be run during build time or as a build step
 */
export async function buildCombinedTranslations() {
  const locales = ['en', 'fr', 'ar'];

  for (const locale of locales) {
    const combined = await loadTranslationsForLocale(locale);

    // Write the combined file to the original messages directory
    const outputPath = join(process.cwd(), 'src/messages', `${locale}.json`);
    const fs = await import('fs/promises');
    await fs.writeFile(outputPath, JSON.stringify(combined, null, 2));

    console.log(
      `✅ Built combined translations for ${locale} (${Object.keys(combined).length} modules)`
    );
  }
}

/**
 * Development helper: Watch for changes and rebuild translations
 * Note: You can manually run buildCombinedTranslations() when files change
 */
export async function watchTranslations() {
  console.log(
    '💡 Tip: Run buildCombinedTranslations() manually when translation files change'
  );
  console.log(
    '💡 Or install chokidar and uncomment the file watching code in this file'
  );

  // Uncomment the following lines if you install chokidar:
  // if (process.env.NODE_ENV === 'development') {
  //   try {
  //     const chokidar = await import('chokidar');
  //     const watcher = chokidar.watch('src/i18n/messages/**/*.json');
  //
  //     watcher.on('change', async (filePath: string) => {
  //       console.log(`🔄 Translation file changed: ${filePath}`);
  //       await buildCombinedTranslations();
  //     });
  //
  //     console.log('👀 Watching translation files for changes...');
  //   } catch (_error) {
  //     console.warn('File watching not available. Install chokidar for automatic rebuilds.');
  //   }
  // }
}
