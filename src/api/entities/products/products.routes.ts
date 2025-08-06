import axios from '@/api/config/axios';
import { SubdomainName } from '@/widgets/init';

import { Product } from './products.types';

const ROUTE = '/products';

export const get = (subdomain: SubdomainName) =>
  axios.get<Product[]>(ROUTE, { params: { subdomain } }).then((r) => r.data || []);
