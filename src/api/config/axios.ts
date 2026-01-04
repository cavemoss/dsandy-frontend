import _axios from 'axios';

import { useCustomersStore } from '@/entities/customers';
import { useInitStore } from '@/widgets/init';

const axios = _axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axios.interceptors.request.use((cfg) => {
  const { headers } = cfg;

  const token = localStorage.getItem('jwtToken');
  if (token) headers.Authorization = `Bearer ${token}`;

  if (useInitStore.getState().isAdminPanel()) {
    return cfg;
  }

  const customerId = useCustomersStore.getState().customer?.id;
  if (customerId) headers['x-customer-id'] = customerId;

  const { viewerParams } = useInitStore.getState();
  Object.assign((cfg.params ??= {}), viewerParams);

  return cfg;
});

export default axios;
