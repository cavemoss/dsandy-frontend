export interface FavoritesState {
  items: { [key: `${number}:${number}`]: 1 };
  // actions
  init: () => void;
  toggle: (productId: number, scuId: number) => void;
}
