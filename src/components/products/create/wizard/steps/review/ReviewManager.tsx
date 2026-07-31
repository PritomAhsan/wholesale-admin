"use client";

import ReviewSummary from "./ReviewSummary";
import ProductStatus from "./ProductStatus";
import FinalValidation from "./FinalValidation";
import SubmitProduct from "./SubmitProduct";

export default function ReviewManager() {
  return (
    <div className="space-y-6">
      <ReviewSummary />

      <ProductStatus />

      <FinalValidation />

      <SubmitProduct />
    </div>
  );
}