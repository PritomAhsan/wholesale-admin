import { Metadata } from "next";

import CreateUnitManager from "@/features/units/CreateUnitManager";

export const metadata: Metadata = {
  title: "Create Unit",
};

export default function CreateUnitPage() {
  return <CreateUnitManager />;
}
