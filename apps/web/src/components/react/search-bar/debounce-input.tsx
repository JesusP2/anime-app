import { useEffect, useState, type InputHTMLAttributes } from 'react';

export function DebouncedInput({
  delay,
  value,
  onChange,
  ...rest
}: {
  delay: number;
  value?: string;
  onChange: (value: string) => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  const [input, setInput] = useState(value || '');
  useEffect(() => {
    if (typeof value !== 'undefined' && input !== value) {
      setInput(value);
    }
  }, [value]);

  useEffect(() => {
    const timeoutId = setTimeout(() => onChange(input), delay);
    return () => clearTimeout(timeoutId);
  }, [input]);

  return (
    <input value={input} onChange={(e) => setInput(e.target.value)} {...rest} />
  );
}
