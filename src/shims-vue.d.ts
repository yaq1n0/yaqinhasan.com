import { DefineComponent } from 'vue';

// Declare module for Vue to recognize global components
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    RouterLink: typeof import('vue-router')['RouterLink'];
    RouterView: typeof import('vue-router')['RouterView'];
    FontAwesomeIcon: typeof import('@fortawesome/vue-fontawesome')['FontAwesomeIcon'];
  }
}

// Default export for .vue files
declare module '*.vue' {
  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, unknown>;
  export default component;
} 