import { Metadata } from "next";

import CreateAttributeManager from "@/features/attributes/CreateAttributeManager";

export const metadata: Metadata = {
  title: "Create Attribute",
};

export default function CreateAttributePage() {
  return <CreateAttributeManager />;
}
