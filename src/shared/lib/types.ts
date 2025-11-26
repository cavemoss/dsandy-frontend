import { SelectProps } from '@radix-ui/react-select';

import { USStates } from './constants';
import { createZustand } from './utils';

export type CurrencyCode =
  | 'USD'
  | 'GBP'
  | 'CAD'
  | 'EUR'
  | 'UAH'
  | 'MXN'
  | 'TRY'
  | 'RUB'
  | 'BRL'
  | 'AUD'
  | 'INR'
  | 'JPY'
  | 'IDR'
  | 'SEK'
  | 'KRW'
  | 'ILS'
  | 'THB'
  | 'CLP'
  | 'VND';

export type CountryCode =
  | 'US'
  | 'EN'
  | 'RU'
  | 'PT'
  | 'ES'
  | 'FR'
  | 'ID'
  | 'IT'
  | 'TH'
  | 'JA'
  | 'AR'
  | 'VI'
  | 'TR'
  | 'DE'
  | 'HE'
  | 'KO'
  | 'NL'
  | 'PL'
  | 'MX'
  | 'CL'
  | 'IN';

export type Locale =
  | 'en'
  | 'ru'
  | 'pt'
  | 'es'
  | 'fr'
  | 'id'
  | 'it'
  | 'th'
  | 'ja'
  | 'ar'
  | 'vi'
  | 'tr'
  | 'de'
  | 'he'
  | 'ko'
  | 'nl'
  | 'pl'
  | 'mx'
  | 'cl'
  | 'in';

export enum SupplierEnum {
  ALIEXPRESS,
}

export type DisplayPrice = { original: string; discounted: string };

export type USStateCode = (typeof USStates)[number]['code'];

export type InputModel = Required<Pick<React.ComponentProps<'input'>, 'id' | 'type' | 'value' | 'onChange'>> & {
  error?: string | false;
};

export type SelectModel = Required<Pick<SelectProps, 'value' | 'onValueChange'>> & {
  error?: string | false;
};

export type ZustandStoreInstance<T> = ReturnType<typeof createZustand<T>>;

export type SelectOption = { value: string; label: string; icon?: React.ReactNode };
