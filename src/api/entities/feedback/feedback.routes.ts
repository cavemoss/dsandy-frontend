import axios from '@/api/config/axios';

import { Review } from './feedback.types';

const ROUTE = '/feedback';

export const get = (productId: number) =>
  axios.get<Review[]>(ROUTE, { params: { productId } }).then((r) => r.data || []);
