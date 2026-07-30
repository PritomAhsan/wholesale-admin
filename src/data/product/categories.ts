export interface ChildCategory {
  id: number;
  name: string;
}

export interface SubCategory {
  id: number;
  name: string;
  children: ChildCategory[];
}

export interface Category {
  id: number;
  name: string;
  subCategories: SubCategory[];
}

export const PRODUCT_CATEGORIES: Category[] = [
  {
    id: 1,
    name: "Electronics",
    subCategories: [
      {
        id: 101,
        name: "Mobile Phones",
        children: [
          { id: 1001, name: "Smartphones" },
          { id: 1002, name: "Feature Phones" },
          { id: 1003, name: "Accessories" },
        ],
      },
      {
        id: 102,
        name: "Computers",
        children: [
          { id: 1004, name: "Laptops" },
          { id: 1005, name: "Desktop PCs" },
          { id: 1006, name: "Monitors" },
        ],
      },
    ],
  },

  {
    id: 2,
    name: "Machinery",
    subCategories: [
      {
        id: 201,
        name: "Industrial Machines",
        children: [
          { id: 2001, name: "CNC Machines" },
          { id: 2002, name: "Packaging Machines" },
        ],
      },
    ],
  },

  {
    id: 3,
    name: "Furniture",
    subCategories: [
      {
        id: 301,
        name: "Office Furniture",
        children: [
          { id: 3001, name: "Office Chairs" },
          { id: 3002, name: "Office Desks" },
        ],
      },
    ],
  },
];