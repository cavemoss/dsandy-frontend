import { deepCompare } from '@/shared/lib/utils';

import { CartItem } from '../types';

export const compareCartItems = (...args: [CartItem, CartItem]) => {
  const cmp = (item: CartItem) => [item.quantity, item.variantIdx];
  return deepCompare(cmp(args[0]), cmp(args[1]));
};
