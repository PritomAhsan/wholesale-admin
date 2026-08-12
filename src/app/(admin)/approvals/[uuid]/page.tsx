import PageBreadcrumb from "@/components/common/PageBreadCrumb";

import ProductApprovalDetail from "@/features/approvals/ProductApprovalDetail";

interface Props {
  params: Promise<{
    uuid: string;
  }>;
}

export default async function ApprovalDetailPage({ params }: Props) {
  const { uuid } = await params;

  return (
    <>
      <PageBreadcrumb pageTitle="Product Review" />

      <ProductApprovalDetail uuid={uuid} />
    </>
  );
}
