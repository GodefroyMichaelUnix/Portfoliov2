import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const resetScroll = () => {
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  window.scrollTo(0, 0);
  window.dispatchEvent(new Event('portfolio:scroll-top'));
  requestAnimationFrame(() => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  });
};

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(resetScroll, [pathname]);

  return null;
};
