import {
  GridIcon,
  BoxCubeIcon,
  UserCircleIcon,
  ListIcon,
  TableIcon,
  PieChartIcon,
} from "@/icons";

export interface NavigationSubItem {
  name: string;
  path: string;
  permission?: string;
  badge?: string;
}

export interface NavigationItem {
  name: string;
  icon: React.ElementType;
  path?: string;
  permission?: string;
  badge?: string;
  subItems?: NavigationSubItem[];
}

export interface NavigationGroup {
  title: string;
  items: NavigationItem[];
}

export const OWNER_NAVIGATION: NavigationGroup[] = [
  {
    title: "Dashboard",
    items: [
      {
        name: "Dashboard",
        icon: GridIcon,
        path: "/",
      },
    ],
  },

  {
    title: "Catalog",
    items: [
      {
        name: "Catalog",
        icon: BoxCubeIcon,
        subItems: [
          {
            name: "Products",
            path: "/catalog/products",
          },
          {
            name: "Categories",
            path: "/catalog/categories",
          },
          {
            name: "Brands",
            path: "/catalog/brands",
          },
          {
            name: "Units",
            path: "/catalog/units",
          },
          {
            name: "Attributes",
            path: "/catalog/attributes",
          },
        ],
      },
    ],
  },

  {
    title: "Marketplace",
    items: [
      {
        name: "Suppliers",
        icon: UserCircleIcon,
        path: "/suppliers",
      },
      {
        name: "Customers",
        icon: UserCircleIcon,
        path: "/customers",
      },
      {
        name: "RFQs",
        icon: ListIcon,
        path: "/rfqs",
      },
      {
        name: "Orders",
        icon: TableIcon,
        path: "/orders",
      },
    ],
  },

  {
    title: "Inventory",
    items: [
      {
        name: "Inventory",
        icon: BoxCubeIcon,
        path: "/inventory",
      },
    ],
  },

  {
    title: "Reports",
    items: [
      {
        name: "Reports",
        icon: PieChartIcon,
        path: "/reports",
      },
    ],
  },

  {
    title: "Settings",
    items: [
      {
        name: "Settings",
        icon: ListIcon,
        path: "/settings",
      },
    ],
  },
];