"use client";

import SEOForm from "./SEOForm";
import SearchPreview from "./SearchPreview";
import SEOValidation from "./SEOValidation";

export default function SEOManager() {
  return (
    <div className="space-y-6">
      <SEOForm />

      <SearchPreview />

      <SEOValidation />
    </div>
  );
}