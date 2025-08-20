import { useEffect } from 'react';

export const useScrollLock = (isLocked: boolean) => {
  useEffect(() => {
    if (!isLocked) return;

    const originalStyles = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      width: document.body.style.width,
      top: document.body.style.top,
    } as const;

    const scrollY = window.scrollY;

    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.top = `-${scrollY}px`;

    return () => {
      document.body.style.overflow = originalStyles.overflow;
      document.body.style.position = originalStyles.position;
      document.body.style.width = originalStyles.width;
      document.body.style.top = originalStyles.top;
      window.scrollTo(0, scrollY);
    };
  }, [isLocked]);
};

