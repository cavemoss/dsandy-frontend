import { OrderDTO } from '@/api/entities';

const KEY = 'anonOrderIds';

export function getAnonOrderIds(joined: true): string;
export function getAnonOrderIds(joined?: false): number[];

export function getAnonOrderIds(joined = false) {
  const anonOrderIds = (localStorage.getItem(KEY) ?? '')
    .split(';')
    .filter((id) => !isNaN(+id))
    .map(Number);
  return joined ? anonOrderIds.join(';') : anonOrderIds;
}

export const addAnonOrder = (orderId: number) => {
  if (isNaN(+orderId)) throw 'Not a number';
  const anonOrderIds = getAnonOrderIds();
  anonOrderIds.push(orderId);
  localStorage.setItem(KEY, anonOrderIds.join(';'));
};

export const actualizeAnonOrders = (orders: OrderDTO[]) => {
  const anonOrderIds = getAnonOrderIds()
    .filter((id) => orders.some((ord) => ord.id == id))
    .join(';');
  if (!anonOrderIds) localStorage.removeItem(KEY);
  else localStorage.setItem(KEY, anonOrderIds);
};
