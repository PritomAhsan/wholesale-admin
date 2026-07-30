export interface ProductRow {
  id: number;
  image: string;
  name: string;
  sku: string;
  supplier: string;
  category: string;
  price: string;
 stock: number;
  approval: "Published" | "Pending" | "Rejected";
  status: "Active" | "Draft";
}

export const products: ProductRow[] = [
  {
    id: 1,
    image: "/images/product/product-1.jpg",
    name: "Industrial Safety Helmet",
    sku: "PRD-1001",
    supplier: "ABC Industries",
    category: "Safety",
    price: "$25.00",
    stock: 240,
    approval: "Published",
    status: "Active",
  },
  {
    id: 2,
    image: "/images/product/product-2.jpg",
    name: "Office Executive Chair",
    sku: "PRD-1002",
    supplier: "Modern Furniture",
    category: "Furniture",
    price: "$135.00",
    stock: 42,
    approval: "Pending",
    status: "Draft",
  },
  {
    id: 3,
    image: "/images/product/product-3.jpg",
    name: "Barcode Scanner",
    sku: "PRD-1003",
    supplier: "Smart Devices",
    category: "Electronics",
    price: "$49.00",
    stock: 120,
    approval: "Published",
    status: "Active",
  },
  {
    id: 4,
    image: "/images/product/product-4.jpg",
    name: "Packaging Carton Box",
    sku: "PRD-1004",
    supplier: "Pack World",
    category: "Packaging",
    price: "$2.30",
    stock: 6500,
    approval: "Rejected",
    status: "Draft",
  },
];