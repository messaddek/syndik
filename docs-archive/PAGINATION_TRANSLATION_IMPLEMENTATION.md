# DataTable and Pagination Translation Implementation (Updated)

## Overview

This document summarizes the implementation of internal translations for DataTable and pagination components, with a logical separation between table-specific and pagination-specific translations for better reusability.

## Translation Architecture

### Logical Separation 🎯

- **`table`** - Table-specific UI elements (search, columns, row selection, no results)
- **`pagination`** - Generic pagination controls (reusable with tables, cards, grids, lists, etc.)

This separation allows pagination components to be used with any data presentation format, not just tables.

## Changes Made

### 1. DataTable Component (`src/components/ui/data-table.tsx`)

**Current Implementation:**

- ✅ Uses `useTranslations('table')` for table-specific translations
- ✅ Translates search placeholder, columns button, and "no results" message

**Translation Keys Used:**

```tsx
const t = useTranslations('table');

// Table-specific translations:
-t('search') - // Search placeholder
  t('columns') - // Columns button
  t('noResults'); // No results message
```

### 2. DataTablePagination Component (`src/components/ui/data-table-pagination.tsx`)

**Newly Implemented:**

- ✅ Uses both `useTranslations('table')` and `useTranslations('pagination')`
- ✅ Logical separation: table-specific vs pagination-specific translations
- ✅ Updated accessibility labels for screen readers

**Translation Keys Used:**

```tsx
const tTable = useTranslations('table');
const tPagination = useTranslations('pagination');

// Table-specific:
-tTable('selected', { count: selectedRows, total: totalRows }) -
  // Pagination-specific:
  tPagination('rowsPerPage') -
  tPagination('page') -
  tPagination('of') -
  tPagination('first') -
  tPagination('previous') -
  tPagination('next') -
  tPagination('last');
```

### 3. SimplePagination Component (`src/modules/buildings/ui/components/buildings-view.tsx`)

**Refactored:**

- ✅ Uses `useTranslations('pagination')` for logical consistency
- ✅ Self-contained pagination component (no external props needed)
- ✅ Reusable for any listing format (cards, grids, etc.)

**Translation Keys Used:**

```tsx
const t = useTranslations('pagination');

-t('showingPage', { page: currentPage, total: totalPages }) -
  t('previous') -
  t('next');
```

## Translation Files Structure

### English (`src/messages/en.json`)

```json
{
  "table": {
    "search": "Search...",
    "columns": "Columns",
    "noResults": "No results.",
    "selected": "{count} of {total} row(s) selected"
  },
  "pagination": {
    "rows": "rows",
    "rowsPerPage": "Rows per page",
    "page": "Page",
    "of": "of",
    "go": "Go",
    "first": "First",
    "last": "Last",
    "showingEntries": "Showing {from} to {to} of {total} entries",
    "showingPage": "Showing page {page} of {total}",
    "previous": "Previous",
    "next": "Next"
  }
}
```

### French (`src/messages/fr.json`)

```json
{
  "table": {
    "search": "Rechercher...",
    "columns": "Colonnes",
    "noResults": "Aucun résultat.",
    "selected": "{count} sur {total} ligne(s) sélectionnée(s)"
  },
  "pagination": {
    "rows": "lignes",
    "rowsPerPage": "Lignes par page",
    "page": "Page",
    "of": "de",
    "go": "Aller",
    "first": "Premier",
    "last": "Dernier",
    "showingEntries": "Affichage de {from} à {to} sur {total} entrées",
    "showingPage": "Affichage de la page {page} sur {total}",
    "previous": "Précédent",
    "next": "Suivant"
  }
}
```

### Arabic (`src/messages/ar.json`)

```json
{
  "table": {
    "search": "بحث...",
    "columns": "الأعمدة",
    "noResults": "لا توجد نتائج.",
    "selected": "تم تحديد {count} من {total} صف"
  },
  "pagination": {
    "rows": "صفوف",
    "rowsPerPage": "صفوف لكل صفحة",
    "page": "صفحة",
    "of": "من",
    "go": "انتقال",
    "first": "الأولى",
    "last": "الأخيرة",
    "showingEntries": "عرض {from} إلى {to} من أصل {total} إدخال",
    "showingPage": "عرض الصفحة {page} من {total}",
    "previous": "السابق",
    "next": "التالي"
  }
}
```

## Benefits

1. **Logical Separation**: Table and pagination concerns are properly separated
2. **Reusability**: Pagination components can be used with cards, grids, lists, etc.
3. **Consistency**: All pagination UI uses the same translation section
4. **Maintainability**: Clear semantic boundaries between UI concepts
5. **Self-contained**: Components don't require external translation props
6. **RTL Support**: Works seamlessly with RTL languages (Arabic)
7. **Accessibility**: Screen reader labels are properly translated

## Use Cases for Pagination Section

The `pagination` translation section can now be used with:

- ✅ **DataTable** pagination
- ✅ **Card grids** with pagination
- ✅ **List views** with pagination
- ✅ **Image galleries** with pagination
- ✅ **Article listings** with pagination
- ✅ **Search results** with pagination
- ✅ **Any data collection** that needs pagination

## Components Affected

### Direct Updates:

- `DataTable` - Uses `table` section for table-specific UI
- `DataTablePagination` - Uses both `table` and `pagination` sections
- `SimplePagination` - Uses `pagination` section

### Automatically Benefit:

- `ResidentsDataTable` - Uses shared DataTable component
- Any future components using DataTable or pagination patterns

## Usage Examples

### DataTable (unchanged interface)

```tsx
<DataTable
  columns={columns}
  data={data}
  showSearch={true}
  // ✅ No translation props needed
/>
```

### SimplePagination (cleaner interface)

```tsx
<SimplePagination
  currentPage={1}
  totalPages={10}
  onPageChange={handlePageChange}
  // ✅ No translation props needed
/>
```

### Future Card Grid with Pagination

```tsx
const CardGridPagination = ({ currentPage, totalPages, onPageChange }) => {
  const t = useTranslations('pagination'); // ✅ Reuse same translations

  return (
    <div>
      {t('showingPage', { page: currentPage, total: totalPages })}
      {/* pagination controls */}
    </div>
  );
};
```

## Testing Checklist

### Table Section

- [ ] DataTable search placeholder is translated
- [ ] DataTable columns button is translated
- [ ] DataTable "no results" message is translated
- [ ] DataTable row selection text is translated

### Pagination Section

- [ ] "Rows per page" label is translated
- [ ] Page navigation text is translated (page X of Y)
- [ ] Navigation buttons are translated (first, previous, next, last)
- [ ] SimplePagination page status is translated
- [ ] SimplePagination navigation buttons are translated

### Cross-cutting

- [ ] Test all languages (EN, FR, AR) display correctly
- [ ] Test RTL layout with Arabic locale
- [ ] Test screen reader accessibility with translated labels
- [ ] Verify pagination works with non-table components

## Future Enhancements

- Consider adding more pagination patterns (numbered pages, infinite scroll, etc.)
- Add specialized translations for different pagination contexts if needed
- Consider adding animation/transition translations for pagination states
