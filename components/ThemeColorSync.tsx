'use client';

import { useEffect } from 'react';

const colors = { light: '#f7f7f3', dark: '#0b0f0e' };

// Points the mobile browser bar at the active theme. Next can (re)insert the
// theme-color tags during hydration, so re-apply whenever <head> or the theme changes.
export default function ThemeColorSync() {
  useEffect(() => {
    const root = document.documentElement;
    const apply = () => {
      const color = root.classList.contains('dark') ? colors.dark : colors.light;
      document.querySelectorAll('meta[name="theme-color"]').forEach((m) => {
        if (m.getAttribute('content') !== color) m.setAttribute('content', color);
      });
    };
    apply();
    const headObserver = new MutationObserver(apply);
    headObserver.observe(document.head, { childList: true });
    const themeObserver = new MutationObserver(apply);
    themeObserver.observe(root, { attributes: true, attributeFilter: ['class'] });
    return () => {
      headObserver.disconnect();
      themeObserver.disconnect();
    };
  }, []);

  return null;
}
