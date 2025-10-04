import { useEffect } from 'react';

export function CarbonAds() {
  useEffect(() => {
    // Check if script already exists
    if (document.getElementById('_carbonads_js')) {
      return;
    }

    const s = document.createElement('script');
    s.id = '_carbonads_js';
    s.src = '//cdn.carbonads.com/carbon.js?serve=CWBDT27N&placement=zed-themescom&format=cover';
    s.async = true;
    document.getElementById('carbon-container')?.appendChild(s);

    return () => {
      document.getElementById('_carbonads_js')?.remove();
    };
  }, []);

  return <div id="carbon-container" />;
}
