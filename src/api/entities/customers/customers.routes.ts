import axios from '@/api/config/axios';

import { AuthErrorResponseDTO } from '../auth';
import { CreateCustomerDTO, CustomerDTO, UpdateCustomerDTO } from './customers.types';

export const ROUTE = '/customers';

export const getByJwtToken = async () => {
  if (!localStorage.getItem('jwtToken')) return null;
  return axios.get<CustomerDTO>(ROUTE + '/by-jwt-token').then((res) => res.data);
};

export const create = (dto: CreateCustomerDTO) =>
  axios.post<CustomerDTO | AuthErrorResponseDTO>(ROUTE, dto).then((res) => res.data);

export const patch = (dto: UpdateCustomerDTO) => axios.patch<CustomerDTO>(ROUTE, dto).then((res) => res.data);
