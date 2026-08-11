import { Metadata } from "next";

import AttributeManager from "@/features/attributes/AttributeManager";

export const metadata: Metadata = {
  title: "Attributes",
};

export default function AttributesPage() {
  return <AttributeManager />;
}
