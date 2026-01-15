import axios from '@/api/config/axios';

import { AuthErrorResponseDTO, LoginDTO, LoginResponseDTO, ResetPasswordDTO } from './auth.type';

const ROUTE = '/auth';

export const loginCustomer = (dto: LoginDTO) =>
  axios.post<LoginResponseDTO>(ROUTE + '/login-customer', dto).then((res) => res.data);

export const loginTenant = (dto: LoginDTO) =>
  axios.post<LoginResponseDTO>(ROUTE + '/login-tenant', dto).then((res) => res.data);

export const forgotPassword = (email: string) =>
  axios
    .post<AuthErrorResponseDTO>(ROUTE + '/forgot-password?email=' + encodeURIComponent(email))
    .then((res) => res.data);

export const resetPassword = (dto: ResetPasswordDTO) => axios.post(ROUTE + '/reset-password', dto);
