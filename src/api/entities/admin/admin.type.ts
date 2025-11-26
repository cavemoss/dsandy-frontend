import { CustomerDTO } from '../customers';
import { DProductDTO, OrderDTO } from '../orders';

export interface SubdomainConfig {
  storeName: string;
  logo: {
    src?: string;
    fontBased?: {
      font: string;
      color: string;
      bold?: boolean;
      italic?: boolean;
    };
  };
  countries: string[];
  autoCalculateDiscountMult: boolean;
}

export interface SubdomainDTO {
  name: string;
  tenantId: number;
  config: SubdomainConfig;
  dProducts: DProductDTO[];
  orders: OrderDTO[];
  customers: CustomerDTO[];
}

export interface TenantDTO {
  id: number;
  email: string;
  name: string;
  subdomains: SubdomainDTO[];
}
