import PageBreadcrumb from "@/components/common/PageBreadCrumb";

import EditBrandManager from "@/features/brands/EditBrandManager";

interface Props {
  params: Promise<{
    uuid: string;
  }>;
}

export default async function EditBrandPage({
  params,
}: Props) {
  const { uuid } = await params;

  return (
    <>
      <PageBreadcrumb
        pageTitle="Edit Brand"
      />

      <EditBrandManager
        uuid={uuid}
      />
    </>
  );
}