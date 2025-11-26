import { useEffect } from 'react';

import { ImageWithFallback } from '@/shared/shadcd/figma/ImageWithFallback';

import { useInitStore } from '../model';

export default function Logo() {
  const subdomainConfig = useInitStore((state) => state.subdomain.config);

  const { fontBased, src } = subdomainConfig.logo;

  useEffect(() => {
    if (fontBased?.font) {
      const link = document.createElement('link');
      const fontEncoded = encodeURIComponent(fontBased.font);

      link.href = `https://fonts.googleapis.com/css2?family=${fontEncoded}&display=swap`;
      link.rel = 'stylesheet';
      document.head.appendChild(link);

      return () => {
        document.head.removeChild(link);
      };
    }
  }, []);

  if (fontBased) {
    const style: React.CSSProperties = {
      fontFamily: fontBased.font,
      color: fontBased.color,
      fontWeight: fontBased.bold ? 'bold' : 'normal',
      fontStyle: fontBased.italic ? 'italic' : 'normal',
    };

    return (
      <div className="text-[1.6rem]" style={style}>
        {subdomainConfig.storeName}
      </div>
    );
  }

  if (src) {
    return <ImageWithFallback src={src} />;
  }
}
