import { useInitStore } from '../model';
import { CountryData, ViewerParams } from '../types';
import { localeOptions } from './init.const';

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

    const locales = (data.languages || '').split(',').map((lang: string) => lang.slice(0, 2));
    const language = localeOptions.find((opt) => locales.includes(opt.value))?.value ?? 'en';

    if (countries.includes(data.country_code)) {
      result.country = data.country_code;
      result.currency = data.currency;
      result.language = language;
    } else {
      const data = initStore.countryData.find(({ code }) => code === countries[0]);
      if (data) {
        result.country = data.code;
        result.currency = data.currencies[0].code;
        result.language = language;
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

export function formatPrice(amount: number, currency?: string, digits = 2) {
  const { viewerParams: params } = useInitStore.getState();

  return new Intl.NumberFormat(params.language, {
    style: 'currency',
    currency: currency ?? params.currency,
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(amount);
}

export const isoToFlag = (iso: string) =>
  iso
    .split('')
    .map((char) => String.fromCodePoint(0x1f1e6 + char.charCodeAt(0) - 'A'.charCodeAt(0)))
    .join('');
