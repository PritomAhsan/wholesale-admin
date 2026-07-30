
import * as Icons from "../icons";
import { NavigationGroup } from "@/types/navigation";

export const SUPPLIER_NAV: NavigationGroup[] = [
  {
    label: "SUPPLIER",
    items: [
      {
        title: "Dashboard",
        url: "/",
        icon: Icons.HomeIcon,
        items: [],
      },
      {
        title: "My Products",
        url: "/supplier/products",
        icon: Icons.Table,
        items: [],
      },
      {
        title: "Inventory",
        url: "/supplier/inventory",
        icon: Icons.Table,
        items: [],
      },
      {
        title: "RFQs",
        url: "/supplier/rfqs",
        icon: Icons.Alphabet,
        items: [],
      },
      {
        title: "Orders",
        url: "/supplier/orders",
        icon: Icons.Table,
        items: [],
      },
      {
        title: "Company Profile",
        url: "/supplier/profile",
        icon: Icons.User,
        items: [],
      },
    ],
  },
];