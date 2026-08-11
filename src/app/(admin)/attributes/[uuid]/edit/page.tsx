import PageBreadcrumb from "@/components/common/PageBreadCrumb";

import EditAttributeManager from "@/features/attributes/EditAttributeManager";

interface Props {
  params: Promise<{
    uuid: string;
  }>;
}

export default async function EditAttributePage({ params }: Props) {
  const { uuid } = await params;

  return (
    <>
      <PageBreadcrumb pageTitle="Edit Attribute" />

      <EditAttributeManager uuid={uuid} />
    </>
  );
}
