import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function DynamicCheckoutPage() {
  const { pageId } = useParams();
  const navigate = useNavigate();
  const [pageData, setPageData] = useState(null);
  const formRef = useRef(null);

  useEffect(() => {
    const savedPages = JSON.parse(localStorage.getItem('checkoutPages') || '{}');
    const data = savedPages[pageId];
    if (data) {
      setPageData(data);
    } else {
      navigate('/');
    }
  }, [pageId, navigate]);

  const handleScrollToCheckout = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!pageData) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const getColor = (field, themeKey = 'primary') =>
    pageData.colors?.[field] || pageData.theme?.[themeKey] || '#14532d';

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-4 sm:py-8 px-4">
      <div className="bg-white rounded-2xl shadow-lg max-w-xl lg:max-w-5xl w-full overflow-visible p-5 sm:p-8">
        <div className="lg:flex lg:gap-10 lg:items-start">
          {/* Left column — content */}
          <div className="flex flex-col items-center lg:flex-1 lg:min-w-0">
            {pageData.mainImage && (
              <img src={pageData.mainImage} alt="Product" className="rounded-lg mb-4 w-full object-cover" />
            )}

            {pageData.description && (
              <div className="text-gray-600 mb-6 text-center whitespace-pre-line">
                <p>{pageData.description}</p>
                <div className="mt-6 flex justify-center lg:hidden">
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
                    <span className="text-2xl font-bold line-through text-gray-400">
                      ${pageData.originalPrice}
                    </span>
                  )}
                  <span className="text-2xl font-bold" style={{ color: getColor('price', 'primary') }}>
                    ${pageData.price}
                  </span>
                </div>
                <div className="font-semibold" style={{ color: getColor('almostThere', 'secondary') }}>
                  {pageData.almostThere || "You're almost there!"}
                </div>
              </div>
            )}

            {pageData.italicText && (
              <p className="mb-6 text-center italic text-lg whitespace-pre-line" style={{ color: getColor('italicText', 'accent') }}>
                {pageData.italicText}
              </p>
            )}

            {pageData.secondaryText && (
              <p className="text-gray-600 mb-2 text-center whitespace-pre-line">
                {pageData.secondaryText}
              </p>
            )}

            {pageData.closingWord && (
              <p className="mb-8 text-center italic text-2xl" style={{ color: getColor('closingWord', 'primary') }}>
                {pageData.closingWord}
              </p>
            )}

            {pageData.additionalImages && pageData.additionalImages.filter(Boolean).map((img, i) => (
              <img key={i} src={img} alt={`Supplementary ${i + 1}`} className="rounded-lg mb-4 w-full object-cover" />
            ))}
          </div>

          {/* Right column — buy section (sticky on desktop) */}
          <div ref={formRef} className="w-full flex flex-col items-center pt-8 lg:pt-0 lg:w-96 lg:shrink-0 lg:sticky lg:top-8">
            <h1 className="text-2xl font-bold mb-4 text-center" style={{ color: getColor('title', 'accent') }}>
              {pageData.title || 'Your heading here'}
            </h1>

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
                {pageData.buyButtonLabel || `($${pageData.price || '—'} USD)`}
              </a>
            )}

            <div className="flex items-center justify-center gap-2 mt-6">
              <svg className="w-6 h-6" style={{ color: getColor('secure', 'secondary') }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 11V7a4 4 0 1 1 8 0v4M5 11V7a7 7 0 0 1 14 0v4M5 11v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V11" />
              </svg>
              <span className="text-gray-600 text-sm">100% Secure Checkout</span>
            </div>

            <footer className="mt-8 text-center text-gray-600 text-sm">
              <p>&copy; {new Date().getFullYear()} {pageData.footerName || 'Your Name'}. All rights reserved.</p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}
