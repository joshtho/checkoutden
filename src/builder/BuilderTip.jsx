import { useState, useRef, useEffect } from 'react';

export default function BuilderTip({ tip, children, className = '' }) {
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
