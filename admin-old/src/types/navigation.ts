import { LucideIcon } from "lucide-react";

export interface NavigationItem {
  title: string;
  url?: string;
  icon?: LucideIcon | React.ComponentType<any>;
  items?: NavigationItem[];
}

export interface NavigationGroup {
  label: string;
  items: NavigationItem[];
}