import { RouteLocationRaw } from "vue-router";

export type IconType = {
  name: string;
  prefix?: "fas" | "fab" | "far"; // Font Awesome style prefixes
  position?: "left" | "right";
};

export type DisplayPolicy = "always-show" | "overflow";

export interface NavBarItem {
  label: string;
  icon?: IconType;
  to?: RouteLocationRaw; // For router links
  href?: string; // For external links
  displayPolicy: DisplayPolicy;
  isButton?: boolean; // For special items like theme toggle
  onClick?: () => void; // For clickable items
}

export interface NavBarStructure {
  left: NavBarItem[];
  right: NavBarItem[];
}
