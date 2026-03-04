import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// ---------------------------------------------------------------------------
// Inline‑editable text block (Medium‑style: click to type, placeholder shown)
// ---------------------------------------------------------------------------
function EditableText({
  value,
  onChange,
  placeholder,
  className = '',
  tag: Tag = 'p',
  multiline = false,
}) {
  const ref = useRef(null);
  const [focused, setFocused] = useState(false);

  // Sync the DOM when the value prop changes externally
  useEffect(() => {
    if (ref.current && ref.current.innerText !== value) {
      ref.current.innerText = value;
    }
  }, [value]);

  const handleInput = () => {
    onChange(ref.current.innerText);
  };

  const handleKeyDown = (e) => {
    if (!multiline && e.key === 'Enter') {
      e.preventDefault();
    }
  };

  const isEmpty = !value || value.trim() === '';

  return (
    <div className="relative group w-full">
      <Tag
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onKeyDown={handleKeyDown}
        className={`
          outline-none transition-all min-h-[1.5em]
          ${className}
          ${!focused ? 'hover:ring-2 hover:ring-blue-300 hover:ring-offset-2 rounded' : ''}
          ${focused ? 'ring-2 ring-blue-500 ring-offset-2 rounded' : ''}
        `}
      />
      {isEmpty && !focused && (
        <span
          className={`absolute inset-0 pointer-events-none select-none ${className} opacity-40`}
          aria-hidden
        >
          {placeholder}
        </span>
      )}
      {isEmpty && !focused && (
        <span className="absolute -top-5 left-0 text-[10px] font-medium text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
          Click to edit
        </span>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Inline‑editable image block — click the area to set/change URL
// ---------------------------------------------------------------------------
function EditableImage({ src, onChangeSrc, alt, className = '' }) {
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

// ===========================================================================
// Main Builder
// ===========================================================================
export default function CheckoutBuilder() {
  const navigate = useNavigate();
  const formRef = useRef(null);

  const [pageData, setPageData] = useState({
    mainImage: '',
    description: '',
    price: '',
    italicText: '',
    secondaryText: '',
    closingWord: '',
    additionalImages: ['', ''],
    title: '',
    checkoutUrl: '',
    ctaLabel: 'Scroll to Checkout',
  });

  const [preview, setPreview] = useState(false);

  const set = (field) => (val) =>
    setPageData((prev) => ({ ...prev, [field]: val }));

  const handleAdditionalImage = (idx, val) => {
    const imgs = [...pageData.additionalImages];
    imgs[idx] = val;
    setPageData((prev) => ({ ...prev, additionalImages: imgs }));
  };

  const addImage = () =>
    setPageData((prev) => ({
      ...prev,
      additionalImages: [...prev.additionalImages, ''],
    }));

  const removeImage = (idx) =>
    setPageData((prev) => ({
      ...prev,
      additionalImages: prev.additionalImages.filter((_, i) => i !== idx),
    }));

  const handleScrollToCheckout = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSave = () => {
    const pageId = Date.now().toString();
    const saved = JSON.parse(localStorage.getItem('checkoutPages') || '{}');
    saved[pageId] = pageData;
    localStorage.setItem('checkoutPages', JSON.stringify(saved));
    navigate(`/checkout/${pageId}`);
  };

  // -----------------------------------------------------------------------
  // Preview mode — exact replica of CheckoutPage layout
  // -----------------------------------------------------------------------
  if (preview) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
        <div className="sticky top-0 z-50 w-full max-w-xl flex justify-between items-center bg-white/90 backdrop-blur border-b border-gray-200 px-6 py-3 rounded-t-2xl mb-0">
          <span className="text-sm font-semibold text-gray-500">Preview Mode</span>
          <button
            onClick={() => setPreview(false)}
            className="px-4 py-1.5 bg-gray-700 text-white text-sm rounded-lg hover:bg-gray-800 transition"
          >
            ← Back to Editor
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg max-w-xl w-full flex flex-col items-center overflow-hidden p-8">
          {pageData.mainImage && (
            <img src={pageData.mainImage} alt="Product" className="rounded-lg mb-4 w-full object-cover" />
          )}
          <p className="text-gray-600 mb-4 text-center whitespace-pre-line">
            {pageData.description}
            {pageData.description && (
              <>
                <br /><br />
                <button
                  onClick={handleScrollToCheckout}
                  className="mb-1 px-6 py-2 bg-green-900 text-white rounded font-semibold shadow hover:bg-green-800 transition cursor-pointer"
                >
                  {pageData.ctaLabel || 'Scroll to Checkout'}
                </button>
              </>
            )}
          </p>
          {pageData.price && (
            <>
              <div className="text-2xl font-bold text-green-900 mb-2">${pageData.price}</div>
              <div className="text-green-600 font-semibold mb-4">You're almost there!</div>
            </>
          )}
          {pageData.italicText && (
            <p className="text-green-900 mb-4 text-center italic text-lg whitespace-pre-line">{pageData.italicText}</p>
          )}
          {pageData.secondaryText && (
            <p className="text-gray-600 mb-2 text-center whitespace-pre-line">{pageData.secondaryText}</p>
          )}
          {pageData.closingWord && (
            <p className="text-green-900 mb-6 text-center italic text-2xl">{pageData.closingWord}</p>
          )}
          {pageData.additionalImages.filter(Boolean).map((img, i) => (
            <img key={i} src={img} alt={`Supplementary ${i + 1}`} className="rounded-lg mb-4 w-full object-cover" />
          ))}
          <div ref={formRef} className="w-full flex flex-col items-center">
            <br />
            <h1 className="text-2xl font-bold text-green-800 mb-4">{pageData.title || 'Your heading here'}</h1>
            {pageData.checkoutUrl && (
              <a
                href={pageData.checkoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gray-200 text-black py-3 rounded font-bold text-lg mt-4 hover:bg-gray-300 transition cursor-pointer text-center flex items-center justify-center gap-2"
              >
                <img src="/images/Square_LogoLockup_Black.png" alt="Square" className="h-18 w-auto" />
                ({pageData.price ? `$${pageData.price}` : '—'} USD)
              </a>
            )}
            <div className="flex items-center justify-center gap-2 mt-6">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 11V7a4 4 0 1 1 8 0v4M5 11V7a7 7 0 0 1 14 0v4M5 11v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V11" />
              </svg>
              <span className="text-gray-600 text-sm">100% Secure Checkout</span>
            </div>
          </div>
          <footer className="mt-8 text-center text-gray-600 text-sm">
            <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
          </footer>
        </div>
      </div>
    );
  }

  // -----------------------------------------------------------------------
  // Editor mode — the card IS the form (Medium‑style)
  // -----------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 px-4">
      {/* Sticky toolbar */}
      <div className="sticky top-0 z-50 w-full max-w-xl flex justify-between items-center bg-white/90 backdrop-blur shadow-sm border-b border-gray-200 px-6 py-3 rounded-t-2xl">
        <span className="text-sm font-semibold text-gray-500 tracking-wide">Editing checkout page</span>
        <div className="flex gap-2">
          <button
            onClick={() => setPreview(true)}
            className="px-4 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
          >
            Preview
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition"
          >
            Save &amp; Publish
          </button>
        </div>
      </div>

      {/* The "card" — same layout as CheckoutPage */}
      <div className="bg-white rounded-b-2xl shadow-lg max-w-xl w-full flex flex-col items-center overflow-hidden p-8">
        {/* Hero image */}
        <EditableImage
          src={pageData.mainImage}
          onChangeSrc={set('mainImage')}
          alt="Product"
          className="mb-4"
        />

        {/* Description */}
        <EditableText
          value={pageData.description}
          onChange={set('description')}
          placeholder="Write your product description here…"
          className="text-gray-600 mb-4 text-center whitespace-pre-wrap"
          multiline
        />

        {/* CTA button label */}
        <EditableText
          value={pageData.ctaLabel}
          onChange={set('ctaLabel')}
          placeholder="Scroll to Checkout"
          className="mb-1 inline-block px-6 py-2 bg-green-900 text-white rounded font-semibold shadow text-center"
          tag="span"
        />

        <div className="h-4" />

        {/* Price */}
        <div className="flex items-center gap-1 mb-2">
          <span className="text-2xl font-bold text-green-900">$</span>
          <EditableText
            value={pageData.price}
            onChange={set('price')}
            placeholder="0.00"
            className="text-2xl font-bold text-green-900"
            tag="span"
          />
        </div>
        <div className="text-green-600 font-semibold mb-4">You're almost there!</div>

        {/* Italic emphasis text */}
        <EditableText
          value={pageData.italicText}
          onChange={set('italicText')}
          placeholder="Add compelling emphasis text here…"
          className="text-green-900 mb-4 text-center italic text-lg whitespace-pre-wrap"
          multiline
        />

        {/* Secondary body text */}
        <EditableText
          value={pageData.secondaryText}
          onChange={set('secondaryText')}
          placeholder="Add more details about your offering…"
          className="text-gray-600 mb-2 text-center whitespace-pre-wrap"
          multiline
        />

        {/* Closing word */}
        <EditableText
          value={pageData.closingWord}
          onChange={set('closingWord')}
          placeholder="Exploration."
          className="text-green-900 mb-6 text-center italic text-2xl"
          tag="span"
        />

        {/* Additional images */}
        <div className="w-full space-y-4 mb-4">
          {pageData.additionalImages.map((img, idx) => (
            <div key={idx} className="relative">
              <EditableImage
                src={img}
                onChangeSrc={(val) => handleAdditionalImage(idx, val)}
                alt={`Additional ${idx + 1}`}
              />
              {pageData.additionalImages.length > 1 && (
                <button
                  onClick={() => removeImage(idx)}
                  className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full opacity-70 hover:opacity-100 transition"
                >
                  ✕ Remove
                </button>
              )}
            </div>
          ))}
          <button
            onClick={addImage}
            className="w-full border-2 border-dashed border-gray-200 rounded-lg py-3 text-gray-400 text-sm hover:border-blue-400 hover:text-blue-500 transition cursor-pointer"
          >
            + Add another image
          </button>
        </div>

        {/* Checkout section */}
        <div ref={formRef} className="w-full flex flex-col items-center">
          <EditableText
            value={pageData.title}
            onChange={set('title')}
            placeholder="Ready to explore your nature?"
            className="text-2xl font-bold text-green-800 mb-4 text-center"
            tag="h1"
          />

          <p className="text-gray-600 text-sm mb-2 text-center">Checkout link (paste your Square or payment URL)</p>
          <input
            type="url"
            value={pageData.checkoutUrl}
            onChange={(e) => set('checkoutUrl')(e.target.value)}
            placeholder="https://square.link/u/…"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
          />

          <div className="w-full bg-gray-200 text-black py-3 rounded font-bold text-lg text-center flex items-center justify-center gap-2">
            <img src="/images/Square_LogoLockup_Black.png" alt="Square" className="h-18 w-auto" />
            ({pageData.price ? `$${pageData.price}` : '—'} USD)
          </div>

          <div className="flex items-center justify-center gap-2 mt-6">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 11V7a4 4 0 1 1 8 0v4M5 11V7a7 7 0 0 1 14 0v4M5 11v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V11" />
            </svg>
            <span className="text-gray-600 text-sm">100% Secure Checkout</span>
          </div>
        </div>

        <footer className="mt-8 text-center text-gray-600 text-sm">
          <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
        </footer>
      </div>

      <button
        onClick={() => navigate('/')}
        className="mt-6 px-6 py-2 text-gray-500 text-sm hover:text-gray-700 transition"
      >
        ← Back to Home
      </button>
    </div>
  );
}
