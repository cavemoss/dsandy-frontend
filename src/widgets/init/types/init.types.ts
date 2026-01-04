import { SubdomainDTO } from '@/api/entities';

export interface ViewerParams {
  currency: string;
  country: string;
  language: string;
}

type Country = { code: string; name: string; flag: string };

type Currency = { code: string; name: string; symbol: string };

export interface CountryData {
  code: string;
  currencies: Currency[];
}

export interface InitState {
  initialized: boolean;
  subdomain: SubdomainDTO;
  countryData: CountryData[];
  viewerParams: ViewerParams;
  // getters
  isAdminPanel: () => boolean;
  getAvailableCountries: () => Country[];
  getCurrentCountry: () => Country;
  getAvailableCurrencies: () => Currency[];
  // actions
  init: () => Promise<void>;
  loadSubdomainData: () => Promise<void>;
  loadLogoFont: () => void;
  setViewerParams: () => Promise<void>;
  saveViewerParams: () => Promise<void>;
  setState: (clb: (s: this) => void) => void;
}

export interface NavState {
  push: (href: string) => void;
  replace: (href: string) => void;
  back: () => void;
  prefetch: (href: string) => void;
}
