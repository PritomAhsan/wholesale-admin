import {
  GridIcon,
  BoxCubeIcon,
  UserCircleIcon,
  ListIcon,
  TableIcon,
  PieChartIcon,
  TaskIcon,
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

export const SUPPLIER_NAVIGATION: NavigationGroup[] = [
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
        name: "My Products",
        icon: BoxCubeIcon,
        path: "/products",
      },
    ],
  },
];

// Route prefixes a supplier-only account may access. Anything not
// under one of these gets redirected — this is defense-in-depth on
// top of the backend's own authorization checks, not a replacement
// for them.
export const SUPPLIER_ALLOWED_PATH_PREFIXES = [
  "/",
  "/products",
];

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
            path: "/products",
          },
          {
            name: "Categories",
            path: "/categories",
          },
          {
            name: "Brands",
            path: "/brands",
          },
          {
            name: "Units",
            path: "/units",
          },
          {
            name: "Attributes",
            path: "/attributes",
          },
        ],
      },
    ],
  },

  {
    title: "Approvals",
    items: [
      {
        name: "Approvals",
        icon: TaskIcon,
        path: "/approvals",
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