import { useState, useRef, useEffect } from 'react';
import ColorPickerDot from './ColorPickerDot';

export default function EditableText({
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
