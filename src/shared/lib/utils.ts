import { create, StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';

import { InputModel, SelectModel } from './types';

export const objectByKey = <T extends object>(array: T[] = [], key: keyof T): Record<string, T> =>
  Object.fromEntries(array.map((obj) => [obj[key], obj]));

export const createZustand = <T>(name: string, init: StateCreator<T>) => create(devtools(init, { name }));

export const deepClone = <T>(object: T): T => JSON.parse(JSON.stringify(object));

export const deepCompare = (...args: object[]): boolean =>
  args.map((obj) => JSON.stringify(obj || {})).every((json, idx, array) => json === array[0]);

export class Model<S extends { setState: (clb: (s: S) => void) => void }> {
  constructor(
    private readonly state: S,
    private readonly trigger?: boolean,
    private readonly config?: {
      onChange: () => void;
    }
  ) {}

  private readonly errors: (React.ReactNode | false)[] = [];

  private setError<T extends InputModel | SelectModel>(ptr: T, error: React.ReactNode | false): T {
    this.errors.push(!!error);
    ptr.error = this.trigger && error;
    return ptr;
  }

  get isAllValid() {
    return this.errors.every((error) => !error);
  }

  newInput<T extends object>(
    clb: (state: S) => T,
    key: keyof T,
    config: {
      /** Error display condition */
      error?: React.ReactNode | false;
    } = {},
    params: {
      id?: string;
      type?: InputModel['type'];
    } = {}
  ) {
    const result: InputModel = {
      value: clb(this.state)[key] as InputModel['value'],
      id: params.id,
      type: params.type ?? 'text',

      onChange: (e) => {
        this.state.setState((s) => {
          clb(s)[key] = e.target.value as T[keyof T];
        });
        this.config?.onChange();
      },
    };

    this.setError(result, config.error);
    return result;
  }

  newSelect<T extends object>(
    clb: (state: S) => T,
    key: keyof T,
    config: {
      error?: React.ReactNode | false;
    } = {}
  ) {
    const result: SelectModel = {
      value: clb(this.state)[key] as SelectModel['value'],

      onValueChange: (value) => {
        this.state.setState((s) => {
          clb(s)[key] = value as T[keyof T];
        });
        this.config?.onChange();
      },
    };

    this.setError(result, config.error);
    return result;
  }
}
