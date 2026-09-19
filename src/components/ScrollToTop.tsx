import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Wait for the page-transition curtain to cover the viewport before
    // jumping, so the scroll reset is never exposed mid-wipe.
    const t = setTimeout(() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' }), 420);
    return () => clearTimeout(t);
  }, [pathname]);

  return null;
};
