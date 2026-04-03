export default function IntroModal({ onContinue, onBlankSlate }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-xl shadow-lg max-w-xl w-full p-6">
        <h3 className="text-lg font-semibold mb-2">Note about example content</h3>
        <p className="text-sm text-gray-700 mb-4">
          This editor defaults to having example text and photos from another
          creator's checkout page to help with the organization of your text and
          photos.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onContinue}
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition cursor-pointer"
          >
            Continue
          </button>
          <button
            onClick={onBlankSlate}
            className="px-4 py-2 bg-gray-100 rounded-md text-sm hover:bg-gray-200 transition cursor-pointer"
          >
            Start with blank slate
          </button>
        </div>
      </div>
    </div>
  );
}
