import axios from '@/api/config/axios';

import { CreatePaymentIntentBodyDto, CreatePaymentIntentResponseDto } from './stripe.types';

const ROUTE = '/stripe';

export const createPaymentIntent = async (body: CreatePaymentIntentBodyDto) =>
  axios.post<CreatePaymentIntentResponseDto>(ROUTE + '/create-payment-intent', body).then((r) => r.data);
