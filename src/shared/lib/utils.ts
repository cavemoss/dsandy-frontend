import { create, StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';

import { InputModel, SelectModel } from './types';

export const objectByKey = <T extends object>(array: T[], key: keyof T): Record<string, T> =>
  Object.fromEntries(array.map((obj) => [obj[key], obj]));

export const createZustand = <T>(name: string, init: StateCreator<T>) => create(devtools(init, { name }));

export const deepClone = <T>(object: T): T => JSON.parse(JSON.stringify(object));

export const deepCompare = (...args: object[]): boolean =>
  args.map((obj) => JSON.stringify(obj)).every((json, idx, array) => json === array[0]);

export class Model<S extends { setState: (clb: (s: S) => void) => void }> {
  constructor(private readonly state: S, readonly trigger?: boolean) {}

  #errors: (React.ReactNode | false)[] = [];

  get isAllValid() {
    return this.#errors.every((error) => !error);
  }

  #setError<T extends InputModel | SelectModel>(ptr: T, error: React.ReactNode | false): T {
    this.#errors.push(!!error);
    ptr.error = this.trigger && error;
    return ptr;
  }

  input<T extends object>(
    clb: (state: S) => T,
    key: keyof T,

    params?: {
      id?: string;
      type?: InputModel['type'];
    }
  ): InputModel & {
    setError: (error: React.ReactNode | false) => InputModel;
  } {
    const self = this;

    return {
      value: clb(this.state)[key] as InputModel['value'],

      onChange: (e) => {
        this.state.setState((s) => {
          clb(s)[key] = e.target.value as T[keyof T];
        });
      },

      id: params?.id,
      type: params?.type ?? 'text',

      setError(error) {
        return self.#setError(this, error);
      },
    };
  }

  select<T extends object>(
    clb: (state: S) => T,
    key: keyof T
  ): SelectModel & {
    setError: (error: React.ReactNode | false) => SelectModel;
  } {
    const self = this;

    return {
      value: clb(this.state)[key] as SelectModel['value'],

      onValueChange: (value) => {
        this.state.setState((s) => {
          clb(s)[key] = value as T[keyof T];
        });
      },

      setError(error) {
        return self.#setError(this, error);
      },
    };
  }
}
