import { THEME_PRESETS } from './constants';

export default function EditorToolbar({ pageData, onPreview, onSave, onApplyTheme }) {
  return (
    <div className="sticky top-0 z-50 w-full max-w-xl lg:max-w-5xl bg-white/95 backdrop-blur-md shadow-sm border border-gray-200 rounded-xl mb-4 overflow-hidden">
      <div className="flex justify-between items-center px-4 sm:px-6 py-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-sm font-medium text-gray-600 tracking-wide hidden sm:inline">Editing</span>
        </div>
        <p className="text-xs text-gray-400 hidden md:block">Click any text or image to edit</p>
        <div className="flex gap-2">
          <button
            onClick={onPreview}
            className="px-3 sm:px-4 py-1.5 bg-gray-100 text-gray-700 text-xs sm:text-sm rounded-lg hover:bg-gray-200 transition border border-gray-200"
          >
            👁 Preview
          </button>
          <button
            onClick={onSave}
            className="px-3 sm:px-4 py-1.5 bg-green-600 text-white text-xs sm:text-sm rounded-lg hover:bg-green-700 transition shadow-sm"
          >
            Save &amp; Publish
          </button>
        </div>
      </div>
      {/* Theme colour selector */}
      <div className="border-t border-gray-100 px-4 sm:px-6 py-2 flex items-center gap-3 overflow-x-auto">
        <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">Theme</span>
        {THEME_PRESETS.map((preset) => (
          <button
            key={preset.name}
            onClick={() => onApplyTheme(preset)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition whitespace-nowrap cursor-pointer ${
              pageData.theme.primary === preset.primary
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <span
              className="w-3 h-3 rounded-full border border-white/50 shadow-sm inline-block"
              style={{ backgroundColor: preset.primary }}
            />
            {preset.name}
          </button>
        ))}
      </div>
    </div>
  );
}
