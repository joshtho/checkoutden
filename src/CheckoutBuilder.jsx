import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// ===========================================================================
// Theme presets & best-practice tips
// ===========================================================================
const THEME_PRESETS = [
  { name: 'Forest', primary: '#14532d', secondary: '#16a34a', accent: '#166534' },
  { name: 'Ocean', primary: '#1e3a8a', secondary: '#3b82f6', accent: '#1d4ed8' },
  { name: 'Royal', primary: '#581c87', secondary: '#a855f7', accent: '#7e22ce' },
  { name: 'Sunset', primary: '#9a3412', secondary: '#f97316', accent: '#ea580c' },
  { name: 'Rose', primary: '#9f1239', secondary: '#fb7185', accent: '#e11d48' },
  { name: 'Slate', primary: '#1e293b', secondary: '#64748b', accent: '#475569' },
];

const TIPS = {
  heroImage:
    "This is the first thing visitors see. Use a high-quality, relevant image (1200\u00d7630px) that immediately communicates what you're offering.",
  description:
    'Keep it concise and benefit-focused. Lead with what the customer gains \u2014 not features. 2-3 short paragraphs is ideal.',
  ctaButton:
    'Use clear, action-driven text like \"Get Instant Access\" or \"Start Now\". Avoid vague labels like \"Submit\".',
  price:
    'Display the price prominently \u2014 no surprises. If offering a discount, show the original crossed out beside the new price.',
  italicText:
    'This is your emotional hook \u2014 speak to the pain point your product solves. Keep it authentic and conversational.',
  secondaryText:
    'Bridge the emotional hook to the call-to-action. Reinforce the transformation your product delivers.',
  closingWord:
    'A single powerful word or phrase that encapsulates your offer \u2014 think of it as your tagline.',
  additionalImage:
    "Supporting visuals build trust: show what's included, a preview, social proof, or your face. People buy from people.",
  checkoutTitle:
    'Restate the offer or ask a yes-question (\"Ready to transform?\"). Last thing they read before paying.',
  subtitle:
    'A brief line that tells the buyer exactly what to do next. Keep it to one sentence.',
  checkoutUrl:
    'Paste your payment link (Square, Stripe, Gumroad, etc.). Always test it before publishing!',
  footer:
    'Your name or brand adds legitimacy. Keep it simple.',
};

// ===========================================================================
// BuilderTip \u2014 hover/tap tooltip with best-practice advice
// ===========================================================================
function BuilderTip({ tip, children, className = '' }) {
  const [show, setShow] = useState(false);
  const [pinned, setPinned] = useState(false);
  const timeoutRef = useRef(null);
  const tipRef = useRef(null);
  const btnRef = useRef(null);
  const [openBelow, setOpenBelow] = useState(false);

  const calcDirection = () => {
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setOpenBelow(rect.top < 200);
    }
  };

  const toggle = (e) => {
    e.stopPropagation();
    e.preventDefault();
    clearTimeout(timeoutRef.current);
    if (!show || !pinned) {
      calcDirection();
      setShow(true);
      setPinned(true);
      // Auto-dismiss after 5 seconds
      timeoutRef.current = setTimeout(() => {
        setShow(false);
        setPinned(false);
      }, 10000);
    } else {
      setShow(false);
      setPinned(false);
    }
  };
  const openOnHover = () => {
    if (pinned) return;
    clearTimeout(timeoutRef.current);
    calcDirection();
    setShow(true);
  };
  const closeOnHover = () => {
    if (pinned) return;
    timeoutRef.current = setTimeout(() => setShow(false), 150);
  };

  useEffect(() => {
    if (!show) return;
    const handler = (e) => {
      if (tipRef.current && !tipRef.current.contains(e.target)) {
        clearTimeout(timeoutRef.current);
        setShow(false);
        setPinned(false);
      }
    };
    document.addEventListener('pointerdown', handler);
    return () => document.removeEventListener('pointerdown', handler);
  }, [show]);

  if (!tip) return <div className={className}>{children}</div>;

  return (
    <div
      ref={tipRef}
      className={`relative group/tip w-full ${className}`}
    >
      {children}
      <button
        ref={btnRef}
        onClick={toggle}
        onMouseEnter={openOnHover}
        onMouseLeave={closeOnHover}
        className="absolute -top-1.5 -left-1.5 z-20 w-5 h-5 bg-amber-400 text-white rounded-full text-[10px] font-bold flex items-center justify-center shadow-sm cursor-pointer select-none sm:opacity-0 sm:group-hover/tip:opacity-80 transition-opacity"
        aria-label="Best practice tip"
      >
        ?
      </button>
      {show && (
        <div className={`absolute left-0 right-0 z-50 px-2 ${openBelow ? 'top-full mt-2' : 'bottom-full mb-2'}`}>
          <div className="bg-gray-900 text-white text-xs leading-relaxed rounded-xl px-4 py-3 shadow-xl max-w-sm mx-auto relative">
            <span className="font-semibold text-amber-300 text-[11px] uppercase tracking-wide block mb-1">
              💡 Best Practice
            </span>
            <p>{tip}</p>
            <div className={`absolute left-1/2 -translate-x-1/2 w-0 h-0 border-x-[6px] border-x-transparent ${openBelow ? 'bottom-full border-b-[6px] border-b-gray-900' : 'top-full border-t-[6px] border-t-gray-900'}`} />
          </div>
        </div>
      )}
    </div>
  );
}

// ===========================================================================
// ColorPickerDot \u2014 per-element color override
// ===========================================================================
function ColorPickerDot({ color, onChange, presets }) {
  const [open, setOpen] = useState(false);
  const [dropUp, setDropUp] = useState(false);
  const [dropLeft, setDropLeft] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('pointerdown', handler);
    return () => document.removeEventListener('pointerdown', handler);
  }, [open]);

  const handleToggle = (e) => {
    e.stopPropagation();
    if (!open && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      // Open upward if there's enough space above
      setDropUp(rect.top > 200);
      // Open leftward if within 160px of the right edge (dropdown is 144px / w-36)
      setDropLeft(window.innerWidth - rect.right < 160);
    }
    setOpen((o) => !o);
  };

  return (
    <div ref={ref} className="absolute -top-1.5 -right-1.5 z-20">
      <button
        onClick={handleToggle}
        className="w-5 h-5 rounded-full border-2 border-white shadow-sm cursor-pointer hover:scale-110 transition-transform"
        style={{ backgroundColor: color }}
        aria-label="Change color"
      />
      {open && (
        <div className={`absolute bg-white rounded-xl shadow-xl border border-gray-200 p-2 flex flex-wrap gap-1.5 w-36 z-50
          ${dropUp ? 'bottom-full mb-1' : 'top-full mt-1'}
          ${dropLeft ? 'right-0' : 'left-1/2 -translate-x-1/2'}
        `}>
          {presets.map((c) => (
            <button
              key={c}
              onClick={(e) => { e.stopPropagation(); onChange(c); setOpen(false); }}
              className={`w-6 h-6 rounded-full border-2 cursor-pointer hover:scale-110 transition-transform ${color === c ? 'border-gray-800 ring-1 ring-gray-400' : 'border-gray-200'}`}
              style={{ backgroundColor: c }}
              aria-label={c}
            />
          ))}
          <label className="w-full mt-1">
            <input type="color" value={color} onChange={(e) => onChange(e.target.value)} className="w-full h-6 cursor-pointer rounded border-0 p-0" />
          </label>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Inline-editable text block (Medium-style: click to type, placeholder shown)
// ---------------------------------------------------------------------------
function EditableText({
  value,
  onChange,
  placeholder,
  className = '',
  tag: Tag = 'p',
  multiline = false,
  style: customStyle,
  pickerColor,
  onColorChange,
  colorPresets,
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

  const isInline = Tag === 'span';

  return (
    <div className={`relative group ${isInline ? 'inline-block' : 'w-full'}`}>
      <Tag
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onKeyDown={handleKeyDown}
        style={customStyle}
        className={`
          outline-none transition-all min-h-[1.5em] cursor-text
          ${className}
          ${!focused ? 'hover:ring-1 hover:ring-blue-200 hover:ring-offset-1 rounded hover:bg-blue-50/30' : ''}
          ${focused ? 'ring-2 ring-blue-500 ring-offset-2 rounded bg-white' : ''}
        `}
      />
      {isEmpty && !focused && (
        <span
          className={`absolute inset-0 pointer-events-none select-none ${className} opacity-30 italic`}
          aria-hidden
        >
          {placeholder}
        </span>
      )}
      {/* Subtle pencil icon on hover — only shown when no color picker is present */}
      {!focused && !pickerColor && (
        <span className="absolute -top-3 -right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] shadow-sm pointer-events-none">
          ✎
        </span>
      )}
      {pickerColor && onColorChange && colorPresets && (
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <ColorPickerDot color={pickerColor} onChange={onColorChange} presets={colorPresets} />
        </div>
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
    theme: { ...THEME_PRESETS[0] },
    mainImage: '/images/explore-your-nature.jpeg',
    description:
      'This course is designed to help you discover insights towards the connection to oneself as well as a greater connection to all.\n\nWhether you\'re looking for personal growth, inspiration, or simply a new approach to your inner landscape, this course has something for everyone.\n\nUnlock instant access to Jordan River\'s course on how to "Explore your Nature"',
    price: '33.00',
    discountMode: false,
    originalPrice: '',
    italicText:
      'Feeling disconnected in a fast-paced world? Your true nature is waiting to be explored.\n\nIn a world that moves fast, pause and come home to yourself.\n\nYou weren\'t made to keep up — you were made to root down, remember, and rise up!\n\nIf you\'re feeling lost, uninspired, and overwhelmed: That\'s not who you are — it\'s just a sign you\'ve been too far from your nature.\n\nBehind the noise of modern life is a quiet truth: your nature holds the key to your joy.',
    secondaryText:
      'In an ever-evolving world, it\'s easy to feel out of sync — constantly chasing results... yet feeling uninspired, lost, or alone. But your true nature hasn\'t gone anywhere. It\'s quietly waiting behind the noise.\n\nAnd the key to reconnecting?',
    closingWord: 'Exploration.',
    additionalImages: ['/images/receive.png', '/images/whoami.jpg'],
    title: 'Ready to explore your nature?',
    subtitle: 'Click below for a one on one exploration with a trusted guide:',
    checkoutUrl: 'https://square.link/u/JaOryQ09',
    ctaLabel: 'Scroll to Checkout',
    footerName: 'Jordan Rivers',
    almostThere: "You're almost there!",
    colors: {},
  });

  const [preview, setPreview] = useState(false);

  const set = (field) => (val) =>
    setPageData((prev) => ({ ...prev, [field]: val }));

  const setColor = (field) => (color) =>
    setPageData((prev) => ({ ...prev, colors: { ...prev.colors, [field]: color } }));

  const getColor = (field, themeKey = 'primary') =>
    pageData.colors[field] || pageData.theme[themeKey];

  const colorPresets = [
    ...THEME_PRESETS.flatMap((t) => [t.primary, t.secondary, t.accent]),
  ].filter((v, i, a) => a.indexOf(v) === i);

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

  const applyTheme = (preset) => {
    setPageData((prev) => ({
      ...prev,
      theme: { ...preset },
      colors: {},
    }));
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
      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-4 sm:py-8 px-4">
        <div className="sticky top-0 z-50 w-full max-w-xl flex justify-between items-center bg-white/90 backdrop-blur border-b border-gray-200 px-4 sm:px-6 py-3 rounded-t-2xl mb-0">
          <span className="text-sm font-semibold text-gray-500">Preview Mode</span>
          <button
            onClick={() => setPreview(false)}
            className="px-4 py-1.5 bg-gray-700 text-white text-sm rounded-lg hover:bg-gray-800 transition"
          >
            ← Back to Editor
          </button>
        </div>

        <div className="bg-white rounded-b-2xl shadow-lg max-w-xl w-full flex flex-col items-center overflow-hidden p-5 sm:p-8">
          {pageData.mainImage && (
            <img src={pageData.mainImage} alt="Product" className="rounded-lg mb-4 w-full object-cover" />
          )}
          {pageData.description && (
            <div className="text-gray-600 mb-6 text-center whitespace-pre-line">
              <p>{pageData.description}</p>
              <div className="mt-6 flex justify-center">
                <button
                  onClick={handleScrollToCheckout}
                  className="px-6 py-2 text-white rounded font-semibold shadow hover:opacity-90 transition cursor-pointer"
                  style={{ backgroundColor: getColor('ctaButton', 'primary') }}
                >
                  {pageData.ctaLabel || 'Scroll to Checkout'}
                </button>
              </div>
            </div>
          )}
          {pageData.price && (
            <div className="mb-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                {pageData.discountMode && pageData.originalPrice && (
                  <span className="text-2xl font-bold line-through text-gray-700">
                    ${pageData.originalPrice}
                  </span>
                )}
                <span className="text-2xl font-bold" style={{ color: getColor('price', 'primary') }}>${pageData.price}</span>
              </div>
              <div className="font-semibold" style={{ color: getColor('almostThere', 'secondary') }}>{pageData.almostThere || "You're almost there!"}</div>
            </div>
          )}
          {pageData.italicText && (
            <p className="mb-6 text-center italic text-lg whitespace-pre-line" style={{ color: getColor('italicText', 'accent') }}>{pageData.italicText}</p>
          )}
          {pageData.secondaryText && (
            <p className="text-gray-600 mb-2 text-center whitespace-pre-line">{pageData.secondaryText}</p>
          )}
          {pageData.closingWord && (
            <p className="mb-8 text-center italic text-2xl" style={{ color: getColor('closingWord', 'primary') }}>{pageData.closingWord}</p>
          )}
          {pageData.additionalImages.filter(Boolean).map((img, i) => (
            <img key={i} src={img} alt={`Supplementary ${i + 1}`} className="rounded-lg mb-4 w-full object-cover" />
          ))}
          <div ref={formRef} className="w-full flex flex-col items-center pt-8">
            <h1 className="text-2xl font-bold mb-4 text-center" style={{ color: getColor('title', 'accent') }}>{pageData.title || 'Your heading here'}</h1>
            {pageData.subtitle && (
              <p className="text-gray-600 text-sm mb-4 text-center">{pageData.subtitle}</p>
            )}
            {pageData.checkoutUrl && (
              <a
                href={pageData.checkoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gray-200 text-black py-3 rounded font-bold text-lg mt-2 hover:bg-gray-300 transition cursor-pointer text-center flex items-center justify-center gap-2"
              >
                <img src="/images/Square_LogoLockup_Black.png" alt="Square" className="h-18 w-auto" />
                ({pageData.price ? `$${pageData.price}` : '—'} USD)
              </a>
            )}
            <div className="flex items-center justify-center gap-2 mt-6">
              <svg className="w-6 h-6" style={{ color: getColor('secure', 'secondary') }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 11V7a4 4 0 1 1 8 0v4M5 11V7a7 7 0 0 1 14 0v4M5 11v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V11" />
              </svg>
              <span className="text-gray-600 text-sm">100% Secure Checkout</span>
            </div>
          </div>
          <footer className="mt-8 text-center text-gray-600 text-sm">
            <p>&copy; {new Date().getFullYear()} {pageData.footerName || 'Your Name'}. All rights reserved.</p>
          </footer>
        </div>
      </div>
    );
  }

  // -----------------------------------------------------------------------
  // Editor mode
  // -----------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-4 sm:py-8 px-3 sm:px-4">
      {/* Sticky toolbar */}
      <div className="sticky top-0 z-50 w-full max-w-xl bg-white/95 backdrop-blur-md shadow-sm border border-gray-200 rounded-xl mb-4 overflow-hidden">
        <div className="flex justify-between items-center px-4 sm:px-6 py-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-medium text-gray-600 tracking-wide hidden sm:inline">Editing</span>
          </div>
          <p className="text-xs text-gray-400 hidden md:block">Click any text or image to edit</p>
          <div className="flex gap-2">
            <button
              onClick={() => setPreview(true)}
              className="px-3 sm:px-4 py-1.5 bg-gray-100 text-gray-700 text-xs sm:text-sm rounded-lg hover:bg-gray-200 transition border border-gray-200"
            >
              👁 Preview
            </button>
            <button
              onClick={handleSave}
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
              onClick={() => applyTheme(preset)}
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

      {/* The card — same layout as CheckoutPage */}
      <div className="bg-white rounded-2xl shadow-lg max-w-xl w-full flex flex-col items-center overflow-visible p-5 sm:p-8">
        {/* Hero image */}
        <BuilderTip tip={TIPS.heroImage}>
          <EditableImage
            src={pageData.mainImage}
            onChangeSrc={set('mainImage')}
            alt="Product"
            className="mb-4"
          />
        </BuilderTip>

        {/* Description */}
        <BuilderTip tip={TIPS.description}>
          <EditableText
            value={pageData.description}
            onChange={set('description')}
            placeholder="Write your product description here…"
            className="text-gray-600 mb-4 text-center whitespace-pre-wrap"
            multiline
          />
        </BuilderTip>

        {/* CTA button label */}
        <BuilderTip tip={TIPS.ctaButton} className="flex justify-center">
          <EditableText
            value={pageData.ctaLabel}
            onChange={set('ctaLabel')}
            placeholder="Scroll to Checkout"
            className="inline-block px-6 py-2 text-white rounded font-semibold shadow text-center"
            tag="span"
            style={{ backgroundColor: getColor('ctaButton', 'primary') }}
            pickerColor={getColor('ctaButton', 'primary')}
            onColorChange={setColor('ctaButton')}
            colorPresets={colorPresets}
          />
        </BuilderTip>

        <div className="h-6" />

        {/* Price */}
        <BuilderTip tip={TIPS.price}>
          <div className="flex flex-col items-center mb-2">
            {/* Price row: [strikeout] [discounted] — always single line */}
            <div className="flex flex-nowrap items-center justify-center gap-3">
              {pageData.discountMode && (
                <div className="flex items-center gap-0.5">
                  <span className="text-2xl font-bold line-through text-gray-700">$</span>
                  <EditableText
                    value={pageData.originalPrice}
                    onChange={set('originalPrice')}
                    placeholder="49.00"
                    className="text-2xl font-bold inline-block min-w-[3rem] text-gray-700"
                    tag="span"
                  />
                </div>
              )}
              <div className="flex items-center gap-0.5">
                <span className="text-2xl font-bold" style={{ color: getColor('price', 'primary') }}>$</span>
                <EditableText
                  value={pageData.price}
                  onChange={set('price')}
                  placeholder="0.00"
                  className="text-2xl font-bold"
                  tag="span"
                  style={{ color: getColor('price', 'primary') }}
                  pickerColor={getColor('price', 'primary')}
                  onColorChange={setColor('price')}
                  colorPresets={colorPresets}
                />
              </div>
            </div>
            {/* Discount toggle — sits below the numbers */}
            <button
              onClick={() => setPageData((prev) => ({ ...prev, discountMode: !prev.discountMode }))}
              className={`mt-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border transition cursor-pointer ${
                pageData.discountMode
                  ? 'bg-red-50 text-red-500 border-red-200 hover:bg-red-100'
                  : 'bg-gray-100 text-gray-500 border-gray-200 hover:bg-gray-200'
              }`}
            >
              {pageData.discountMode ? '✕ Remove discount' : '% Add discount'}
            </button>
          </div>
          <EditableText
            value={pageData.almostThere}
            onChange={set('almostThere')}
            placeholder="You're almost there!"
            className="font-semibold mb-4 text-center"
            style={{ color: getColor('almostThere', 'secondary') }}
            pickerColor={getColor('almostThere', 'secondary')}
            onColorChange={setColor('almostThere')}
            colorPresets={colorPresets}
          />
        </BuilderTip>

        {/* Italic emphasis text */}
        <BuilderTip tip={TIPS.italicText}>
          <EditableText
            value={pageData.italicText}
            onChange={set('italicText')}
            placeholder="Add compelling emphasis text here…"
            className="mb-6 text-center italic text-lg whitespace-pre-wrap"
            multiline
            style={{ color: getColor('italicText', 'accent') }}
            pickerColor={getColor('italicText', 'accent')}
            onColorChange={setColor('italicText')}
            colorPresets={colorPresets}
          />
        </BuilderTip>

        {/* Secondary body text */}
        <BuilderTip tip={TIPS.secondaryText}>
          <EditableText
            value={pageData.secondaryText}
            onChange={set('secondaryText')}
            placeholder="Add more details about your offering…"
            className="text-gray-600 mb-2 text-center whitespace-pre-wrap"
            multiline
          />
        </BuilderTip>

        {/* Closing word */}
        <BuilderTip tip={TIPS.closingWord} className="flex justify-center mb-8">
          <EditableText
            value={pageData.closingWord}
            onChange={set('closingWord')}
            placeholder="Exploration."
            className="text-center italic text-2xl"
            tag="span"
            style={{ color: getColor('closingWord', 'primary') }}
            pickerColor={getColor('closingWord', 'primary')}
            onColorChange={setColor('closingWord')}
            colorPresets={colorPresets}
          />
        </BuilderTip>

        {/* Additional images */}
        <div className="w-full space-y-4 mb-6">
          {pageData.additionalImages.map((img, idx) => (
            <BuilderTip key={idx} tip={TIPS.additionalImage}>
              <div className="relative">
                <EditableImage
                  src={img}
                  onChangeSrc={(val) => handleAdditionalImage(idx, val)}
                  alt={`Additional ${idx + 1}`}
                />
                {pageData.additionalImages.length > 1 && (
                  <button
                    onClick={() => removeImage(idx)}
                    className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full opacity-70 hover:opacity-100 transition z-10"
                  >
                    ✕ Remove
                  </button>
                )}
              </div>
            </BuilderTip>
          ))}
          <button
            onClick={addImage}
            className="w-full border-2 border-dashed border-gray-200 rounded-lg py-3 text-gray-400 text-sm hover:border-blue-400 hover:text-blue-500 transition cursor-pointer"
          >
            + Add another image
          </button>
        </div>

        {/* Checkout section */}
        <div ref={formRef} className="w-full flex flex-col items-center pt-8">
          <BuilderTip tip={TIPS.checkoutTitle}>
            <EditableText
              value={pageData.title}
              onChange={set('title')}
              placeholder="Ready to explore your nature?"
              className="text-2xl font-bold mb-4 text-center"
              tag="h1"
              style={{ color: getColor('title', 'accent') }}
              pickerColor={getColor('title', 'accent')}
              onColorChange={setColor('title')}
              colorPresets={colorPresets}
            />
          </BuilderTip>

          <BuilderTip tip={TIPS.subtitle}>
            <EditableText
              value={pageData.subtitle}
              onChange={set('subtitle')}
              placeholder="Click below for a one on one exploration with a trusted guide:"
              className="text-gray-600 text-sm text-center mb-3"
            />
          </BuilderTip>

          <BuilderTip tip={TIPS.checkoutUrl}>
            <div className="w-full relative mb-4">
              <input
                type="url"
                value={pageData.checkoutUrl}
                onChange={(e) => set('checkoutUrl')(e.target.value)}
                placeholder="https://square.link/u/…"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 text-gray-500"
              />
              <span className="absolute -top-2 left-2 text-[10px] font-medium text-gray-400 bg-white px-1">Payment link</span>
            </div>
          </BuilderTip>

          <div className="w-full bg-gray-200 text-black py-3 rounded font-bold text-lg text-center flex items-center justify-center gap-2">
            <img src="/images/Square_LogoLockup_Black.png" alt="Square" className="h-18 w-auto" />
            ({pageData.price ? `$${pageData.price}` : '—'} USD)
          </div>

          <div className="flex items-center justify-center gap-2 mt-6">
            <svg className="w-6 h-6" style={{ color: getColor('secure', 'secondary') }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 11V7a4 4 0 1 1 8 0v4M5 11V7a7 7 0 0 1 14 0v4M5 11v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V11" />
            </svg>
            <span className="text-gray-600 text-sm">100% Secure Checkout</span>
          </div>
        </div>

        <BuilderTip tip={TIPS.footer}>
          <footer className="mt-8 text-center text-gray-600 text-sm">
            <span>&copy; {new Date().getFullYear()}{' '}</span>
            <EditableText
              value={pageData.footerName}
              onChange={set('footerName')}
              placeholder="Your Name"
              className="inline text-gray-600 text-sm"
              tag="span"
            />
            <span>. All rights reserved.</span>
          </footer>
        </BuilderTip>
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
