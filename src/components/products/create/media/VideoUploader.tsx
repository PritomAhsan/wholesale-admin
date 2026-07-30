export default function VideoUploader() {
  return (
    <div className="rounded-xl border border-gray-200 p-6">

      <h3 className="mb-4 text-lg font-semibold">
        Product Video
      </h3>

      <div className="space-y-4">

        <input
          placeholder="Youtube Video URL"
          className="w-full rounded-lg border px-4 py-3"
        />

        <div className="text-center text-gray-400">
          OR
        </div>

        <input
          type="file"
          accept="video/*"
        />

      </div>

    </div>
  );
}