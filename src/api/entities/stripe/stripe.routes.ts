import axios from '@/api/config/axios';

import { CreateConfirmIntentBody, CreatePaymentIntentBody, CreatePaymentIntentResponse } from './stripe.types';

const ROUTE = '/stripe';

export const createPaymentIntent = (body: CreatePaymentIntentBody) =>
  axios.post<CreatePaymentIntentResponse>(ROUTE + '/create-payment-intent', body).then((r) => r.data);

export const createConfirmIntent = (body: CreateConfirmIntentBody) =>
  axios.post<CreatePaymentIntentResponse>(ROUTE + '/create-confirm-intent', body).then((r) => r.data);

export const updatePaymentIntent = (clientSecret: string, body: CreatePaymentIntentBody) =>
  axios.post(ROUTE + '/update-payment-intent', body, { params: { clientSecret } });

export const retrievePaymentIntent = (clientSecret: string) =>
  axios.get(ROUTE + '/retrieve-payment-intent', { params: { clientSecret } }).then((r) => r.data);

export const cancelOrder = (orderId: number, reason: string) =>
  axios.post(ROUTE + `/cancel-order/${orderId}`, { reason });
