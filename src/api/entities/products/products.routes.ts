import axios from '@/api/config/axios';

import { Product } from './products.types';

const ROUTE = '/products';

export const get = () => axios.get<Product[]>(ROUTE).then((r) => r.data || []);

export const getDynamic = () => axios.get<Product[]>(ROUTE + '/dynamic').then((r) => r.data || []);
