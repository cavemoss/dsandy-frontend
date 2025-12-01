import { ViewerParams } from '@/widgets/init';

export interface CustomerInfoDTO {
  firstName: string;
  lastName: string;
  phone: string;
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

export type UpdateCustomerDTO = Partial<CreateCustomerDTO>;
