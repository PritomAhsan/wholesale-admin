export default function DocumentUploader() {
  return (
    <div className="rounded-xl border border-gray-200 p-6">

      <h3 className="mb-4 text-lg font-semibold">
        Product Documents
      </h3>

      <p className="mb-5 text-gray-500">
        Catalogue, Manual, Datasheet, PDF
      </p>

      <input
        multiple
        type="file"
        accept=".pdf,.doc,.docx"
      />

    </div>
  );
}