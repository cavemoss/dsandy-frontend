import { ImageWithFallback } from '@/shared/shadcd/figma/ImageWithFallback';
import { useInitStore, useNavStore } from '@/widgets/init';

export default function Logo({ className }: { className: string }) {
  const navStore = useNavStore();

  const subdomainConfig = useInitStore((state) => state.subdomain.config);

  const { fontBased, src } = subdomainConfig.logo;

  const goToLandingPage = () => navStore.push(subdomainConfig.landingPage);

  if (fontBased) {
    const style: React.CSSProperties = {
      fontFamily: fontBased.font,
      color: fontBased.color,
      fontWeight: fontBased.bold ? 'bold' : 'normal',
      fontStyle: fontBased.italic ? 'italic' : 'normal',
      cursor: 'pointer',
    };

    return (
      <div onClick={goToLandingPage} className={className} style={style}>
        {subdomainConfig.storeName}
      </div>
    );
  }

  if (src) {
    return <ImageWithFallback onClick={goToLandingPage} src={src} />;
  }
}
