export type ButtonProps = {
  label: string;
  labelPos?: "left" | "right" | "above" | "below";
  icon?: string;
  iconPrefix?: "fas" | "fab" | "far";
  iconSize?: "sm" | "md" | "lg";
  border?: "thin" | "thick" | "none";
  shape?: "rounded" | "squircle";
  background?: string;
  to?: string | object;
  href?: string;
};

export type ContactItem = Pick<ButtonProps, "label" | "href" | "to" | "icon" | "iconPrefix" | "iconSize">;
