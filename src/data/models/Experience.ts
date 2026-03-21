import { CV } from "./CV";

/** (jsonResume compliant! derive from CV type) experience (called "work" in the jsonresume schema) type in the CV type */
export type CVExperience = NonNullable<CV["work"]>[number];
