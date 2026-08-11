import PageBreadcrumb from "@/components/common/PageBreadCrumb";

import EditUnitManager from "@/features/units/EditUnitManager";

interface Props {
  params: Promise<{
    uuid: string;
  }>;
}

export default async function EditUnitPage({ params }: Props) {
  const { uuid } = await params;

  return (
    <>
      <PageBreadcrumb pageTitle="Edit Unit" />

      <EditUnitManager uuid={uuid} />
    </>
  );
}
