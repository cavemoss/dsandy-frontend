import { ImageWithFallback } from '@/shared/shadcd/figma/ImageWithFallback';
import { useInitStore } from '@/widgets/init';

export default function Logo({ className }: { className: string }) {
  const subdomainConfig = useInitStore((state) => state.subdomain.config);

  const { fontBased, src } = subdomainConfig.logo;

  if (fontBased) {
    const style: React.CSSProperties = {
      fontFamily: fontBased.font,
      color: fontBased.color,
      fontWeight: fontBased.bold ? 'bold' : 'normal',
      fontStyle: fontBased.italic ? 'italic' : 'normal',
    };

    return (
      <div className={className} style={style}>
        {subdomainConfig.storeName}
      </div>
    );
  }

  if (src) {
    return <ImageWithFallback src={src} />;
  }
}
