import { SelectProps } from '@radix-ui/react-select';

import { USStates } from './constants';
import { createZustand } from './utils';

export enum SupplierEnum {
  ALIEXPRESS,
}

export type DisplayPrice = { original: string; discounted: string };

export type USStateCode = (typeof USStates)[number]['code'];

export type InputModel = Required<Pick<React.ComponentProps<'input'>, 'id' | 'type' | 'value' | 'onChange'>>;

export type SelectModel = Required<Pick<SelectProps, 'value' | 'onValueChange'>>;

export type ZustandStoreInstance<T> = ReturnType<typeof createZustand<T>>;
