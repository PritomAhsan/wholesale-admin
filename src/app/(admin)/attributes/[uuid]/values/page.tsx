import PageBreadcrumb from "@/components/common/PageBreadCrumb";

import AttributeValuesManager from "@/features/attributes/values/AttributeValuesManager";

interface Props {
  params: Promise<{
    uuid: string;
  }>;
}

export default async function AttributeValuesPage({ params }: Props) {
  const { uuid } = await params;

  return (
    <>
      <PageBreadcrumb pageTitle="Attribute Values" />

      <AttributeValuesManager uuid={uuid} />
    </>
  );
}
