import { CountryCode, CurrencyCode, Locale } from '@/shared/lib/types';
import { ViewerParams } from '@/widgets/init';

export interface CustomerInfoDTO {
  fistName: string;
  lastName: string;
  phone: string;
}

export interface CustomerPreferencesDTO {
  currency: CurrencyCode;
  country: CountryCode;
  language: Locale;
}

export interface CustomerDTO {
  id: number;
  subdomainName: string;
  email: string;
  info: CustomerInfoDTO;
  preferences: ViewerParams;
}

export interface CreateCustomerDTO {
  email: string;
  password: string;
  info: CustomerInfoDTO;
  preferences: ViewerParams;
}
