import ImageUploader from "../media/ImageUploader";
import VideoUploader from "../media/VideoUploader";
import DocumentUploader from "../media/DocumentUploader";

export default function MediaStep() {
  return (
    <div className="space-y-8">

      <ImageUploader />

      <VideoUploader />

      <DocumentUploader />

    </div>
  );
}