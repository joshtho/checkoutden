import { useState, useRef, useEffect } from 'react';

export default function ColorPickerDot({ color, onChange, presets }) {
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
      setDropUp(rect.top > 200);
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
