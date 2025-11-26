import { SubdomainDTO } from '@/api/entities';

export interface Country {
  code: string;
  name: string;
  flag: string;
}

export interface InitState {
  initialized: boolean;
  subdomain: SubdomainDTO;
  viewerParams: {
    currency: string;
    country: string;
    language: string;
  };
  // getters
  isAdminPanel: () => boolean;
  getAvailableCountries: () => Country[];
  // actions
  init: () => Promise<void>;
  loadSubdomainData: () => Promise<void>;
  setViewerParams: () => Promise<void>;
  setState: (clb: (s: this) => void) => void;
}

export interface NavState {
  push: (href: string) => void;
  replace: (href: string) => void;
  back: () => void;
  prefetch: (href: string) => void;
}

export interface ViewerParams {
  currency: string;
  country: string;
  language: string;
}
