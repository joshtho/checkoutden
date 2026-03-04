import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function DynamicCheckoutPage() {
  const { pageId } = useParams();
  const navigate = useNavigate();
  const [pageData, setPageData] = useState(null);
  const formRef = useRef(null);

  useEffect(() => {
    // Load page data from localStorage
    const savedPages = JSON.parse(localStorage.getItem('checkoutPages') || '{}');
    const data = savedPages[pageId];
    
    if (data) {
      setPageData(data);
    } else {
      // Redirect to home if page not found
      navigate('/');
    }
  }, [pageId, navigate]);

  const handleScrollToCheckout = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
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

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-8">
      <div className="bg-white rounded-2xl shadow-lg max-w-xl w-full flex flex-col items-center overflow-hidden p-8">
        {pageData.mainImage && (
          <img src={pageData.mainImage} alt="Product" className="rounded-lg mb-4 w-full object-cover" />
        )}
        
        <p className="text-gray-600 mb-4 text-center whitespace-pre-line">
          {pageData.description}
          <br/><br/>
          <button
            onClick={handleScrollToCheckout}
            className="mb-1 px-6 py-2 bg-green-900 text-white rounded font-semibold shadow hover:bg-green-800 transition cursor-pointer"
          >
            Scroll to Checkout
          </button>
        </p>

        {pageData.price && (
          <>
            <div className="text-2xl font-bold text-green-900 mb-2">${pageData.price}</div>
            <div className="text-green-600 font-semibold mb-4">You're almost there!</div>
          </>
        )}

        {pageData.italicText && (
          <p className="text-green-900 mb-4 text-center italic text-lg whitespace-pre-line">
            {pageData.italicText}
          </p>
        )}

        {pageData.additionalImages && pageData.additionalImages.filter(img => img).map((img, idx) => (
          <img key={idx} src={img} alt={`Additional ${idx + 1}`} className="rounded-lg mb-4 w-full object-cover" />
        ))}

        <div ref={formRef} className="w-full flex flex-col items-center">
          <br/>
          <h1 className="text-2xl font-bold text-green-800 mb-4">{pageData.title}</h1>
          
          {pageData.checkoutUrl && (
            <a
              href={pageData.checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-gray-200 text-black py-3 rounded font-bold text-lg mt-4 hover:bg-gray-300 transition cursor-pointer text-center flex items-center justify-center gap-2"
            >
              <img
                src="/images/Square_LogoLockup_Black.png"
                alt="Square"
                className="h-18 w-auto"
              />
              ({pageData.price} USD)
            </a>
          )}

          <div className="flex items-center justify-center gap-2 mt-6">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 11V7a4 4 0 1 1 8 0v4M5 11V7a7 7 0 0 1 14 0v4M5 11v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V11"></path>
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
