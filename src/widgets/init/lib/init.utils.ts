import { useInitStore } from '../model';
import { ViewerParams } from '../types';

export async function getAnonViewerParams(): Promise<ViewerParams> {
  const result: ViewerParams = {
    country: 'US',
    currency: 'USD',
    language: 'en',
  };

  try {
    const data = await fetch('https://ipapi.co/json/').then((r) => r.json());
    console.info('Anon viewer params', data);

    result.country = data.country_code;
    result.currency = data.currency;
  } catch (error) {
    console.error('Error fetching geolocation data', { error });
  } finally {
    return result;
  }
}

export function formatPrice(amount: number) {
  const { viewerParams: params } = useInitStore.getState();

  return new Intl.NumberFormat(params.language, {
    style: 'currency',
    currency: params.currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}
