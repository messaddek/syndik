# DataTable and Pagination Translation Implementation

## Overview

This document summarizes the implementation of internal translations for DataTable and pagination components, creating a unified translation system that doesn't require external translation props.

## Changes Made

### 1. DataTable Component (`src/components/ui/data-table.tsx`)

**Already Implemented:**

- ✅ Uses `useTranslations('table')` for internal translations
- ✅ Translates search placeholder, columns button, and "no results" message
- ✅ No longer requires external translation props

**Current Implementation:**

```tsx
const t = useTranslations('table');

// Uses translations for:
- Search placeholder: t('search')
- Columns button: t('columns')
- No results message: t('noResults')
```

### 2. DataTablePagination Component (`src/components/ui/data-table-pagination.tsx`)

**Newly Implemented:**

- ✅ Added `useTranslations('table')` for internal translations
- ✅ Replaced all hardcoded English text with translation keys
- ✅ Updated accessibility labels for screen readers

**Translation Keys Used:**

```tsx
-t('selected', { count: selectedRows, total: totalRows }) - // Row selection status
  t('rowsPerPage') - // "Rows per page" label
  t('page') - // "Page" text
  t('of') - // "of" text (for "Page X of Y")
  t('first') - // First page button (accessibility)
  t('previous') - // Previous page button
  t('next') - // Next page button
  t('last'); // Last page button (accessibility)
```

### 3. SimplePagination Component (`src/modules/buildings/ui/components/buildings-view.tsx`)

**Refactored:**

- ✅ Removed dependency on external translation function prop
- ✅ Added internal `useTranslations('table')`
- ✅ Updated component interface to remove `t` parameter
- ✅ Updated all usage sites to remove the `t={tCommon}` prop

**Translation Keys Used:**

```tsx
-t('showingPage', { page: currentPage, total: totalPages }) - // Page status
  t('previous') - // Previous button
  t('next'); // Next button
```

## Translation Files Structure

### English (`src/messages/en.json`)

```json
{
  "table": {
    "search": "Search...",
    "columns": "Columns",
    "noResults": "No results.",
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
    "next": "Next",
    "selected": "{count} of {total} row(s) selected"
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
    "next": "Suivant",
    "selected": "{count} sur {total} ligne(s) sélectionnée(s)"
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
    "next": "التالي",
    "selected": "تم تحديد {count} من {total} صف"
  }
}
```

## Benefits

1. **Consistency**: All table and pagination components now use the same translation section
2. **Maintainability**: No need to pass translation functions as props
3. **Reusability**: Components are self-contained with their translations
4. **RTL Support**: Works seamlessly with RTL languages (Arabic)
5. **Accessibility**: Screen reader labels are properly translated

## Components Affected

### Direct Updates:

- `DataTable` - Already had internal translations
- `DataTablePagination` - Updated to use internal translations
- `SimplePagination` - Refactored to use internal translations

### Automatically Benefit:

- `ResidentsDataTable` - Uses shared DataTable component
- Any other components using DataTable or DataTablePagination

## Usage

All table and pagination components now work without external translation props:

```tsx
// Before (SimplePagination)
<SimplePagination
  currentPage={1}
  totalPages={10}
  onPageChange={handlePageChange}
  t={tCommon} // ❌ No longer needed
/>

// After (SimplePagination)
<SimplePagination
  currentPage={1}
  totalPages={10}
  onPageChange={handlePageChange} // ✅ Clean interface
/>

// DataTable and DataTablePagination work the same way
<DataTable
  columns={columns}
  data={data}
  showSearch={true}
  // ✅ No translation props needed
/>
```

## Testing Checklist

- [ ] Verify DataTable search placeholder is translated
- [ ] Verify DataTable columns button is translated
- [ ] Verify DataTable "no results" message is translated
- [ ] Verify DataTablePagination row selection text is translated
- [ ] Verify DataTablePagination "rows per page" is translated
- [ ] Verify DataTablePagination page navigation is translated
- [ ] Verify SimplePagination page status is translated
- [ ] Verify SimplePagination navigation buttons are translated
- [ ] Test RTL layout with Arabic locale
- [ ] Test screen reader accessibility with translated labels
- [ ] Verify all languages (EN, FR, AR) display correctly

## Future Enhancements

- Consider adding more granular pagination options (e.g., "Go to page")
- Add keyboard navigation translations if needed
- Consider adding export/filter button translations to the table section
