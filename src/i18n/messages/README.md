# Modular Translation System

This project uses a modular translation system that separates translations by feature/module, making it easier to maintain and scale translations across the application.

## 📁 Directory Structure

```
src/
├── i18n/
│   └── messages/          # Modular translation files
│       ├── en/           # English translations
│       │   ├── common.json
│       │   ├── residents.json
│       │   ├── buildings.json
│       │   └── ...
│       ├── fr/           # French translations
│       │   ├── common.json
│       │   ├── residents.json
│       │   ├── buildings.json
│       │   └── ...
│       └── ar/           # Arabic translations
│           ├── common.json
│           ├── residents.json
│           ├── buildings.json
│           └── ...
└── messages/             # Combined files (auto-generated)
    ├── en.json
    ├── fr.json
    └── ar.json
```

## 🚀 How It Works

1. **Modular Files**: Each feature/module has its own translation file in each language directory
2. **Build Process**: The build script combines all module files into single language files
3. **next-intl Integration**: The combined files work seamlessly with next-intl

## 📝 Usage

### Adding New Translations

1. **Add to Module Files**: Edit the appropriate module file in each language:

   ```bash
   # English
   src/i18n/messages/en/residents.json

   # French
   src/i18n/messages/fr/residents.json

   # Arabic
   src/i18n/messages/ar/residents.json
   ```

2. **Build Combined Files**: Run the build script to combine modules:

   ```bash
   npm run build:translations
   ```

3. **Use in Code**: Use translations normally with next-intl:
   ```tsx
   const t = useTranslations('residents');
   return <h1>{t('title')}</h1>; // "Residents"
   ```

### Creating New Modules

1. **Create Module Files**: Add new JSON files for each locale:

   ```bash
   src/i18n/messages/en/buildings.json
   src/i18n/messages/fr/buildings.json
   src/i18n/messages/ar/buildings.json
   ```

2. **Structure the Translations**:

   ```json
   {
     "title": "Buildings",
     "subtitle": "Manage your building portfolio",
     "form": {
       "name": "Building Name",
       "address": "Address"
     },
     "actions": {
       "add": "Add Building",
       "edit": "Edit Building"
     }
   }
   ```

3. **Build and Use**: Run the build script and use in your components.

## 🛠️ Available Scripts

- **`npm run build:translations`** - Combines all modular files into single language files
- **Manual build** - Import and run `buildCombinedTranslations()` from code

## 📚 Module Organization

### Core Modules

- **`common.json`** - Shared UI text (save, cancel, loading, etc.)
- **`navigation.json`** - Menu items, links, breadcrumbs
- **`table.json`** - Data table UI (pagination, search, etc.)

### Feature Modules

- **`residents.json`** - Resident management
- **`buildings.json`** - Building management
- **`units.json`** - Unit management
- **`portal.json`** - Resident portal
- **`dashboard.json`** - Dashboard screens
- **`articles.json`** - Help articles and user guide

### Form Modules

- **`forms.json`** - Form validation messages
- **`errors.json`** - Error messages and handling

## 🎯 Benefits

1. **🔧 Maintainability**: Each module can be edited independently
2. **👥 Team Collaboration**: Different team members can work on different modules
3. **📦 Scalability**: Easy to add new features without bloating main files
4. **🔍 Organization**: Find translations easily by feature area
5. **🔄 Backward Compatible**: Works with existing next-intl setup

## 🔄 Migration Strategy

If migrating from monolithic translation files:

1. **Keep Existing Files**: Don't delete the current large translation files yet
2. **Extract Modules**: Gradually move sections to module files
3. **Build and Test**: Run build script and test translations work
4. **Replace Gradually**: Once confident, remove old sections from main files

## 🛠️ TypeScript Support

The system includes TypeScript definitions for type-safe translations:

```typescript
// Import types for your modules
import type {
  ResidentsTranslations,
  CommonTranslations,
} from '@/i18n/messages/types';

// Use in components with full type safety
const t = useTranslations('residents');
t('title'); // ✅ Type-safe
t('invalidKey'); // ❌ TypeScript error
```

## 🚨 Important Notes

- **Always run build script** after changing module files
- **Consistent structure** across all three languages (en, fr, ar)
- **Test translations** after building to ensure no broken keys
- **Version control** both module files and generated combined files

## 🏗️ Build Process Details

The build script:

1. Reads all `.json` files from each locale directory
2. Combines them into a single object with module names as top-level keys
3. Writes the combined file to `src/messages/{locale}.json`
4. Preserves the existing next-intl workflow

## 💡 Tips

- **Use consistent naming** across modules (e.g., `form.title`, `actions.save`)
- **Group related translations** in nested objects
- **Keep common terms** in the `common` module
- **Document new modules** in this README when created
