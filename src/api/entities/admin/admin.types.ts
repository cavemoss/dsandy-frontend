import { CustomerDTO } from '../customers';
import { DProductCategoryDTO, DProductDTO, OrderDTO } from '../orders';

export interface SubdomainConfig {
  storeName: string;
  logo: {
    src?: string;
    fontBased?: {
      font?: string;
      color?: string;
      bold?: boolean;
      italic?: boolean;
    };
  };
  description: string;
  countries: string[];
  landingPage: string;
  policies: {
    freeShippingCap: number;
    returnDays: number;
  };
  service: {
    email: string;
    phone: string;
    address: string;
  };
}

export type CustomPageConfig =
  | {
      type: 'catalog';
      ids?: number[];
    }
  | {
      type: 'blog';
      blogId: number;
    };

export interface SubdomainNavigationConfig {
  [url: string]: {
    label: string;
    subLabel: string;
    config?: CustomPageConfig;
    subOptions?: {
      [url: string]: {
        label: string;
        subLabel: string;
        config: CustomPageConfig;
      };
    };
  };
}
export interface SubdomainDTO {
  name: string;
  tenantId: number;
  config: SubdomainConfig;
  navigation: SubdomainNavigationConfig;
  dProducts: DProductDTO[];
  dProductCategories: DProductCategoryDTO[];
  orders: OrderDTO[];
  customers: CustomerDTO[];
}

export interface TenantDTO {
  id: number;
  email: string;
  name: string;
  subdomains: SubdomainDTO[];
}
