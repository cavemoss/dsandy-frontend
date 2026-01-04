import { SelectProps } from '@radix-ui/react-select';
import React from 'react';

import { createZustand } from './utils';

export type DisplayPrice = { original: string; discounted: string };

export type InputModel = Required<Pick<React.ComponentProps<'input'>, 'value' | 'onChange'>> &
  Pick<React.ComponentProps<'input'>, 'id' | 'type'> & {
    error?: React.ReactNode | false;
  };

export type SelectModel = Required<Pick<SelectProps, 'value' | 'onValueChange'>> & {
  error?: React.ReactNode | false;
};

export type ZustandStoreInstance<T> = ReturnType<typeof createZustand<T>>;

export type SelectOption = {
  value: string;
  label: string | React.ReactNode;
  icon?: React.ReactNode;
};

export interface Locale {
  code: string;
  name: string;
}

export type LocalStorageKey = 'cartItems' | 'favorites' | 'orders' | 'jwtToken' | 'viewerParams';
