import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { THEME_PRESETS, TIPS, BLANK_TEMPLATE, DEFAULT_PAGE_DATA } from './builder/constants';
import BuilderTip from './builder/BuilderTip';
import EditableText from './builder/EditableText';
import EditableImage from './builder/EditableImage';
import IntroModal from './builder/IntroModal';
import EditorToolbar from './builder/EditorToolbar';
import PreviewMode from './builder/PreviewMode';
import Navbar from './Navbar';

export default function CheckoutBuilder() {
  const navigate = useNavigate();
  const formRef = useRef(null);

  const [showIntro, setShowIntro] = useState(true);
  const [pageData, setPageData] = useState({ ...DEFAULT_PAGE_DATA });
  const [preview, setPreview] = useState(false);

  // --- helpers ---
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
    setPageData((prev) => ({ ...prev, theme: { ...preset }, colors: {} }));
  };

  const handleSave = () => {
    const pageId = Date.now().toString();
    const saved = JSON.parse(localStorage.getItem('checkoutPages') || '{}');
    saved[pageId] = pageData;
    localStorage.setItem('checkoutPages', JSON.stringify(saved));
    navigate(`/checkout/${pageId}`);
  };

  const startBlankSlate = () => {
    setPageData({ ...BLANK_TEMPLATE, closingWord: 'Tagline', isBlank: true });
    setShowIntro(false);
  };

  // --- Preview mode ---
  if (preview) {
    return (
      <PreviewMode
        ref={formRef}
        pageData={pageData}
        getColor={getColor}
        onBack={() => setPreview(false)}
        onScrollToCheckout={handleScrollToCheckout}
      />
    );
  }

  // --- Editor mode ---
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <Navbar />
      <div className="w-full flex flex-col items-center py-4 sm:py-8 px-3 sm:px-4">
      {showIntro && (
        <IntroModal
          onContinue={() => { setShowIntro(false); setPageData((p) => ({ ...p, isBlank: false })); }}
          onBlankSlate={startBlankSlate}
        />
      )}

      <EditorToolbar
        pageData={pageData}
        onPreview={() => setPreview(true)}
        onSave={handleSave}
        onApplyTheme={applyTheme}
      />

      {/* The card — same layout as CheckoutPage */}
      <div className="bg-white rounded-2xl shadow-lg max-w-xl lg:max-w-5xl w-full overflow-visible p-5 sm:p-8">
        <div className="lg:flex lg:gap-10 lg:items-start">
        {/* Left column — content */}
        <div className="flex flex-col items-center lg:flex-1 lg:min-w-0">
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

        {/* CTA button label — always visible in editor, hidden on desktop in preview/published */}
        <div className="w-full">
          <BuilderTip tip={TIPS.ctaButton} className="flex flex-col items-center justify-center gap-1">
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
            <span className="hidden lg:inline-flex items-center gap-1 text-[11px] text-amber-600 bg-amber-50 border border-amber-200 rounded-full px-2.5 py-0.5 mt-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z" /></svg>
              Hidden on desktop — only visible on mobile &amp; tablet
            </span>
          </BuilderTip>
        </div>

        <div className="h-6" />

        {/* Price */}
        <BuilderTip tip={TIPS.price}>
          <div className="flex flex-col items-center mb-2">
            <div className="flex flex-nowrap items-center justify-center gap-3">
              {pageData.discountMode && (
                <div className="flex items-center gap-0.5">
                  <span className="text-2xl font-bold line-through text-gray-700 align-middle leading-none">$</span>
                  <EditableText
                    value={pageData.originalPrice}
                    onChange={set('originalPrice')}
                    placeholder="49.00"
                    className="text-2xl font-bold align-middle leading-none inline-block min-w-[3rem] text-gray-700"
                    tag="span"
                  />
                </div>
              )}
              <div className="flex items-center gap-0.5">
                <span className="text-2xl font-bold align-middle leading-none" style={{ color: getColor('price', 'primary') }}>$</span>
                <EditableText
                  value={pageData.price}
                  onChange={set('price')}
                  placeholder="0.00"
                  className="text-2xl font-bold align-middle leading-none inline-block"
                  tag="span"
                  style={{ color: getColor('price', 'primary') }}
                  pickerColor={getColor('price', 'primary')}
                  onColorChange={setColor('price')}
                  colorPresets={colorPresets}
                />
              </div>
            </div>
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
        </div>{/* end left column */}

        {/* Right column — buy section (sticky on desktop) */}
        <div ref={formRef} className="w-full flex flex-col items-center pt-8 lg:pt-0 lg:w-96 lg:shrink-0 lg:sticky lg:top-24">
          <BuilderTip tip={TIPS.checkoutTitle}>
            <EditableText
              value={pageData.title}
              onChange={set('title')}
              placeholder="A question they want to say yes to"
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
            <span className="font-bold text-lg text-black">(${pageData.price || '0.00'} USD)</span>
          </div>

          <div className="flex items-center justify-center gap-2 mt-6">
            <svg className="w-6 h-6" style={{ color: getColor('secure', 'secondary') }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 11V7a4 4 0 1 1 8 0v4M5 11V7a7 7 0 0 1 14 0v4M5 11v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V11" />
            </svg>
            <span className="text-gray-600 text-sm">100% Secure Checkout</span>
          </div>

          <BuilderTip tip={TIPS.footer}>
            <footer className="mt-8 text-center text-gray-600 text-sm">
              <EditableText
                value={pageData.footerName}
                onChange={set('footerName')}
                placeholder="Your Name"
                className="text-gray-600 text-sm text-center"
              />
              <p>&copy; {new Date().getFullYear()}. All rights reserved.</p>
            </footer>
          </BuilderTip>
        </div>{/* end right column */}
        </div>{/* end lg:flex */}
      </div>{/* end card */}

      <button
        onClick={() => navigate('/')}
        className="mt-6 px-6 py-2 text-gray-500 text-sm hover:text-gray-700 transition"
      >
        ← Back to Home
      </button>
      </div>
    </div>
  );
}
