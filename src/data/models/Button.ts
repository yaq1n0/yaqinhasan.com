import { RouteLocationRaw } from "vue-router";

type faPrefix = "fa" | "fas" | "fab" | "far";

// generic all buttons (can either link to an internal vue router route with to or an external link with href)
export type ButtonProps = {
  label?: string;
  hideLabel?: true; // if true, the label will be hidden, but you still get an html title on hover.
  labelPos?: "left" | "right" | "above" | "below";
  icon?: string;
  iconPrefix?: faPrefix;
  iconSize?: "sm" | "md" | "lg";
  border?: "thin" | "thick" | "none";
  shape?: "rounded" | "squircle";
  background?: string;
  to?: RouteLocationRaw; // route location raw is for vue-router links like "/about" or "/projects"
  href?: string; // href is for external links like "https://github.com"
};
