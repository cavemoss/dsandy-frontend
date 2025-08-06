import { create, StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';

export const objectByKey = <T extends object>(array: T[], key: keyof T): Record<string, T> =>
  Object.fromEntries(array.map((obj) => [obj[key], obj]));

export const createZustand = <T>(name: string, init: StateCreator<T>) => create(devtools(init, { name }));

export const deepClone = <T>(object: T): T => JSON.parse(JSON.stringify(object));

export const deepCompare = (...args: object[]): boolean =>
  args.map((obj) => JSON.stringify(obj)).every((json, idx, array) => json === array[0]);
