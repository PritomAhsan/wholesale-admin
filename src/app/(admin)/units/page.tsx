import { Metadata } from "next";

import UnitManager from "@/features/units/UnitManager";

export const metadata: Metadata = {
  title: "Units",
};

export default function UnitsPage() {
  return <UnitManager />;
}
