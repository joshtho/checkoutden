import { useState, useRef, useEffect } from 'react';

export default function EditableImage({ src, onChangeSrc, alt, className = '' }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(src);
  const inputRef = useRef(null);

  useEffect(() => { setDraft(src); }, [src]);
  useEffect(() => { if (editing && inputRef.current) inputRef.current.focus(); }, [editing]);

  const commit = () => { onChangeSrc(draft); setEditing(false); };

  if (editing) {
    return (
      <div className={`relative w-full ${className}`}>
        <div className="flex flex-col gap-2 w-full bg-gray-50 border-2 border-dashed border-blue-400 rounded-lg p-4">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Image URL</label>
          <input
            ref={inputRef}
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && commit()}
            placeholder="/images/your-image.jpg"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="flex gap-2">
            <button onClick={commit} className="px-4 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition">Done</button>
            <button onClick={() => { setDraft(src); setEditing(false); }} className="px-4 py-1.5 bg-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-300 transition">Cancel</button>
          </div>
        </div>
      </div>
    );
  }

  if (!src) {
    return (
      <button
        onClick={() => setEditing(true)}
        className={`w-full border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center py-12 text-gray-400 hover:border-blue-400 hover:text-blue-500 transition cursor-pointer ${className}`}
      >
        <svg className="w-10 h-10 mb-2" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
        </svg>
        <span className="text-sm font-medium">Click to add image</span>
      </button>
    );
  }

  return (
    <div className="relative group cursor-pointer" onClick={() => setEditing(true)}>
      <img src={src} alt={alt} className={`rounded-lg w-full object-cover ${className}`} />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition rounded-lg flex items-center justify-center">
        <span className="opacity-0 group-hover:opacity-100 transition text-white font-semibold text-sm bg-black/60 px-3 py-1.5 rounded-full">
          Click to change
        </span>
      </div>
    </div>
  );
}
