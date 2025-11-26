import { create } from 'zustand';

import { NavState } from '../types';

export const useNavStore = create<NavState>(() => ({
  push: () => console.warn('Router not ready yet'),
  replace: () => console.warn('Router not ready yet'),
  back: () => console.warn('Router not ready yet'),
  prefetch: () => {},
}));
