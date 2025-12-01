import { useInitStore } from '../model';
import { CountryData, ViewerParams } from '../types';

export async function getAnonViewerParams(): Promise<ViewerParams> {
  const initStore = useInitStore.getState();

  const result: ViewerParams = {
    country: 'US',
    currency: 'USD',
    language: 'en',
  };

  try {
    const data = await fetch('https://ipapi.co/json/').then((r) => r.json());
    console.info('Anon viewer params', data);

    const { countries } = initStore.subdomain.config;

    if (countries.includes(data.country_code)) {
      result.country = data.country_code;
      result.currency = data.currency;
    } else {
      const data = initStore.countryData.find(({ code }) => code === countries[0]);
      if (data) {
        result.country = data.code;
        result.currency = data.currencies[0].code;
      }
    }
  } catch (error) {
    console.error('Error fetching geolocation data', { error });
  } finally {
    return result;
  }
}

export async function fetchCountryData() {
  let result: CountryData[] = [];

  try {
    const data: {
      cca2: string;
      currencies: {
        [code: string]: {
          name: string;
          symbol: string;
        };
      };
    }[] = await fetch('https://restcountries.com/v3.1/all?fields=cca2,currencies').then((r) => r.json());

    result = data.map((el) => ({
      code: el.cca2,
      currencies: Object.entries(el.currencies).map(([code, { name, symbol }]) => ({ code, name, symbol })),
    }));
  } catch (error) {
    console.error('Error fetching country data', { error });
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
