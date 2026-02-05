import axios from '@/api/config/axios';

import { SubdomainDTO, TenantDTO } from './admin.types';

const ROUTE = '/admin';

export const getByJwtToken = async () => {
  if (!localStorage.getItem('jwtToken')) return null;
  return axios.get<TenantDTO>(ROUTE + '/by-jwt-token').then((res) => res.data);
};

export const loadSubdomainData = () => axios.get<SubdomainDTO>(ROUTE + '/subdomain').then((res) => res.data);
