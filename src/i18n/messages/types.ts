/**
 * TypeScript types for the modular translation system
 */

// Base translation value types
export type TranslationValue =
  | string
  | number
  | boolean
  | TranslationObject
  | TranslationArray;
export type TranslationObject = { [key: string]: TranslationValue };
export type TranslationArray = TranslationValue[];

// Module-specific translation interfaces
export interface CommonTranslations extends TranslationObject {
  save: string;
  cancel: string;
  delete: string;
  edit: string;
  add: string;
  search: string;
  loading: string;
  error: string;
  success: string;
  // Add more common keys as needed
}

export interface ResidentsTranslations extends TranslationObject {
  title: string;
  subtitle: string;
  addNew: string;
  addResident: string;
  editResident: string;
  deleteResident: string;
  form: TranslationObject;
  // Add more resident-specific keys
}

export interface BuildingsTranslations extends TranslationObject {
  title: string;
  subtitle: string;
  addNew: string;
  // Add more building-specific keys
}

export interface UnitsTranslations extends TranslationObject {
  title: string;
  subtitle: string;
  addNew: string;
  // Add more unit-specific keys
}

export interface PortalTranslations extends TranslationObject {
  title: string;
  welcomeMessage: string;
  nextPayment: string;
  // Add more portal-specific keys
}

export interface DashboardTranslations extends TranslationObject {
  title: string;
  overview: string;
  // Add more dashboard-specific keys
}

export interface NavigationTranslations extends TranslationObject {
  home: string;
  about: string;
  dashboard: string;
  buildings: string;
  units: string;
  residents: string;
  // Add more navigation keys
}

export interface ArticlesTranslations extends TranslationObject {
  sidebar: TranslationObject;
  // Add more article-specific keys
}

// Combined translations interface
export interface CombinedTranslations {
  common: CommonTranslations;
  residents: ResidentsTranslations;
  buildings: BuildingsTranslations;
  units: UnitsTranslations;
  portal: PortalTranslations;
  dashboard: DashboardTranslations;
  navigation: NavigationTranslations;
  articles: ArticlesTranslations;
  // Add more modules as needed
}

// Helper type for partial translations during development
export type PartialTranslations = {
  [K in keyof CombinedTranslations]?: Partial<CombinedTranslations[K]>;
};
