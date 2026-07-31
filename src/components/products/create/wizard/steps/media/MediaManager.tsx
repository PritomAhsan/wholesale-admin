"use client";

import ImageUploader from "./ImageUploader";
import ImageGallery from "./ImageGallery";
import MediaStatistics from "./MediaStatistics";
import MediaValidation from "./MediaValidation";

export default function MediaManager() {
  return (
    <div className="space-y-6">
      <ImageUploader />

      <ImageGallery />

      <MediaStatistics />

      <MediaValidation />
    </div>
  );
}