import axios from '@/api/config/axios';

import { CreatePaymentIntentBody, CreatePaymentIntentResponse } from './stripe.types';

const ROUTE = '/stripe';

export const createPaymentIntent = async (body: CreatePaymentIntentBody) =>
  axios.post<CreatePaymentIntentResponse>(ROUTE + '/create-payment-intent', body).then((r) => r.data);

export const retrievePaymentIntent = async (clientSecret: string) =>
  axios.get(ROUTE + '/retrieve-payment-intent', { params: { clientSecret } }).then((r) => r.data);
