import { Metadata } from "next";

import BrandManager from "@/features/brands/BrandManager";

export const metadata: Metadata = {
  title: "Brands",
};

export default function BrandsPage() {
  return <BrandManager />;
}