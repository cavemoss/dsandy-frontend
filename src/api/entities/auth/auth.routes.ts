import axios from '@/api/config/axios';

import { LoginDTO, LoginResponseDTO } from './auth.type';

const ROUTE = '/auth';

export const loginCustomer = (dto: LoginDTO) =>
  axios.post<LoginResponseDTO>(ROUTE + '/login-customer', dto).then((res) => res.data);

export const loginTenant = (dto: LoginDTO) =>
  axios.post<LoginResponseDTO>(ROUTE + '/login-tenant', dto).then((res) => res.data);
