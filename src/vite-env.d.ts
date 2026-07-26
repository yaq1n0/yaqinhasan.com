/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** CV contact email — set locally (.env.local) only; never present on the deployed build. */
  readonly VITE_CV_EMAIL?: string;
  /** CV contact phone — set locally (.env.local) only; never present on the deployed build. */
  readonly VITE_CV_PHONE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
