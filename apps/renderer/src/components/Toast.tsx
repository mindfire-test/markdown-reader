import { useEffect } from 'react';
import { ToastProps } from '../types/component-types';

//gives toast message
export function Toast({ message, show, onDone, duration = 2000 }: ToastProps) {
  useEffect(() => {
    if (!show) return;

    const timer = setTimeout(onDone, duration);
    return () => clearTimeout(timer);
  }, [show, onDone, duration]);

  if (!show) return null;

  return (
    <div className="fixed top-4 right-4 z-50 bg-toast-bg text-white px-4 py-2 rounded-lg text-sm shadow-lg">
      {message}
    </div>
  );
}
