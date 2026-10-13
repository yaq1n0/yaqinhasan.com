import type { CVExperience } from "@/data/models/Experience";

/**
 * CV-specific overrides per experience ID.
 * Only experiences listed here appear in the CV.
 * Key = BaseExperience.id from experiences.ts.
 *
 * Overrides are merged on top of the auto-generated CV shape
 * (which flattens highlights and recombines title + techStack into position).
 */
export const experienceCvOverrides: Record<string, Partial<CVExperience>> = {
  portswigger: {},
  "cambridge-kinetics": {
    // Condensed for the CV; the website keeps the full tagged list.
    highlights: [
      "Reduced customer onboarding configuration from hours to seconds by leading end-to-end delivery of LLM-powered workflow automation.",
      "Architected a data synchronisation service aggregating thousands of daily updates from multiple external systems, and delivered Stripe, Xero and QuickBooks integrations.",
      "Cut MongoDB Atlas costs by ~£1000/month through query profiling and a migration to dedicated Atlas Search nodes.",
      "Mentored engineers and SDETs from zero experience to full team contribution."
    ]
  }
};
