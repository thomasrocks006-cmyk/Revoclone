import { useEffect, useRef, useState } from 'react';

export const useFocusManagement = (isOpen: boolean) => {
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      setTimeout(() => {
        containerRef.current?.focus();
      }, 100);
    } else if (previousFocusRef.current) {
      previousFocusRef.current.focus();
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && isOpen) {
      return true;
    }
    return false;
  };

  return { containerRef, handleKeyDown };
};

export const useKeyboardNavigation = <T,>(items: T[], onSelect: (item: T) => void) => {
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex((prev) => Math.min(prev + 1, items.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex((prev) => Math.max(prev - 1, 0));
        break;
      case 'Enter':
        if (focusedIndex >= 0) onSelect(items[focusedIndex]!);
        break;
    }
  };

  return { focusedIndex, handleKeyDown };
};

