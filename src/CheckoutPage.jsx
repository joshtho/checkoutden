import { useRef } from "react";

export default function CheckoutPage() {
  const formRef = useRef(null);

  const handleScrollToCheckout = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-4 sm:py-8 px-4">
      <div className="bg-white rounded-2xl shadow-lg max-w-xl w-full flex flex-col items-center overflow-hidden p-5 sm:p-8">
        <img src="/images/explore-your-nature.jpeg" alt="Product" className="rounded-lg mb-4 w-full" />
        
        <div className="text-gray-600 mb-6 text-center space-y-4">
          <p>
            This course is designed to help you discover insights towards the connection to oneself as well as a greater connection to all. 
            Whether you’re looking for personal growth, inspiration, or simply a new approach to your inner landscape, this course has something for everyone.
          </p>
          <p>
            <strong>Unlock instant access to Jordan River’s course on how to “Explore your Nature”</strong>
          </p>
          <button
            onClick={handleScrollToCheckout}
            className="px-6 py-2 bg-green-900 text-white rounded font-semibold shadow hover:bg-green-800 transition cursor-pointer"
          >
            Scroll to Checkout
          </button>
        </div>
        <div className="text-2xl font-bold text-green-900 mb-2">$33.00</div>
        <div className="text-green-600 font-semibold mb-4">You’re almost there!</div>
        <div className="text-green-900 mb-6 text-center italic text-lg space-y-4">
          <p>Feeling disconnected in a fast-paced world? Your true nature is waiting to be explored.</p>
          <p>In a world that moves fast, pause and come home to yourself.</p>
          <p>You weren’t made to keep up — you were made to root down, remember, and rise up!</p>
          <p>If you’re feeling lost, uninspired, and overwhelmed: That’s not who you are — it’s just a sign you’ve been too far from your nature.</p>
          <p>Behind the noise of modern life is a quiet truth: your nature holds the key to your joy.</p>
        </div>
        <div className="text-gray-600 mb-2 text-center space-y-4">
          <p>In an ever-evolving world, it’s easy to feel out of sync — constantly chasing results... yet feeling uninspired, lost, or alone. But your true nature hasn’t gone anywhere. It’s quietly waiting behind the noise.</p>
          <p>And the key to reconnecting?</p>
        </div>
        <p className="text-green-900 mb-8 text-center italic text-2xl">Exploration.</p>
        <img src="/images/receive.png" alt="what youll get" className="rounded-lg mb-4 w-full" />
        <img src="/images/whoami.jpg" alt="what youll get" className="rounded-lg mb-4 w-full" />
        
        {/* Square Checkout Button */}
        <div ref={formRef} className="w-full flex flex-col items-center pt-8">
            <h1 className="text-2xl font-bold text-green-800 mb-4">Ready to explore your nature?</h1>
            <p className="text-gray-600 text-sm text-center">Click below for a one on one exploration with a trusted guide:</p>
          <a
            href="https://square.link/u/JaOryQ09"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-gray-200 text-black py-3 rounded font-bold text-lg mt-4 hover:bg-gray-300 transition cursor-pointer text-center flex items-center justify-center gap-2"
          >
            <img
              src="/images/Square_LogoLockup_Black.png"
              alt="Square"
              className="h-18 w-auto"
            />
            (33.00 USD)
          </a>
          {/* Trust Badges */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 11V7a4 4 0 1 1 8 0v4M5 11V7a7 7 0 0 1 14 0v4M5 11v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V11"></path></svg>
            <span className="text-gray-600 text-sm">100% Secure Checkout</span>
          </div>
        </div>
      <footer className="mt-8 text-center text-gray-600 text-sm">
        <p>&copy; {new Date().getFullYear()} Jordan Rivers. All rights reserved.</p>
      </footer>
      </div>

    </div>
  );
}