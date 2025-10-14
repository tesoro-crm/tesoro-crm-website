// Combined type definitions for all translation modules
import type common from './common.json';
import type pages from './pages.json';
import type featurePages from './feature-pages.json';
import type websiteApi from './website-api.json';
import type legal from './legal.json';

// Merge all module types
export type Translations = typeof common & typeof pages & typeof featurePages & typeof websiteApi & typeof legal;

export default {} as Translations;
