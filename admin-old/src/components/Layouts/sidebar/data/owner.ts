import * as Icons from "../icons";
import { NavigationGroup } from "@/types/navigation";

export const OWNER_NAV: NavigationGroup[] = [
  {
    label: "DASHBOARD",
    items: [
      {
        title: "Dashboard",
        url: "/",
        icon: Icons.HomeIcon,
        items: [],
      },
    ],
  },
  {
    label: "CATALOG",
    items: [
      {
        title: "Products",
        icon: Icons.Table,
        items: [
          {
            title: "Products",
            url: "/catalog/products",
          },
          {
            title: "Categories",
            url: "/catalog/categories",
          },
          {
            title: "Brands",
            url: "/catalog/brands",
          },
          {
            title: "Units",
            url: "/catalog/units",
          },
          {
            title: "Attributes",
            url: "/catalog/attributes",
          },
          {
            title: "Inventory",
            url: "/catalog/inventory",
          },
        ],
      },
    ],
  },
  {
    label: "MARKETPLACE",
    items: [
      {
        title: "Suppliers",
        url: "/suppliers",
        icon: Icons.User,
        items: [],
      },
      {
        title: "Customers",
        url: "/customers",
        icon: Icons.User,
        items: [],
      },
      {
        title: "RFQs",
        url: "/rfqs",
        icon: Icons.Alphabet,
        items: [],
      },
      {
        title: "Orders",
        url: "/orders",
        icon: Icons.Table,
        items: [],
      },
    ],
  },
  {
    label: "SYSTEM",
    items: [
      {
        title: "Reports",
        url: "/reports",
        icon: Icons.PieChart,
        items: [],
      },
      {
        title: "Settings",
        url: "/pages/settings",
        icon: Icons.FourCircle,
        items: [],
      },
    ],
  },
];