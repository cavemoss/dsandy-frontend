import countryPhoneMasks from 'countries-phone-masks';
import { City, Country, State } from 'country-state-city';

import { createZustand, deepClone } from '@/shared/lib/utils';
import { useInitStore } from '@/widgets/init';

import { POSTAL_CODES_FETCH_API } from '../lib';
import { PostalCodeDTO, ShippingFormState } from '../types';

export const useShippingFormStore = createZustand<ShippingFormState>('shipping-form', (set, get) => ({
  data: {
    country: useInitStore.getState().viewerParams.country,
    province: '',
    city: '',
    zipCode: '',
    address: '',
    apartment: '',
  },

  postalCodes: [],

  // Getters

  getCountries: () => Country.getAllCountries().map((c) => ({ value: c.isoCode, label: c.name })),

  getProvinces: () => {
    const { country } = get().data;

    if (!country) return [];
    return State.getStatesOfCountry(get().data.country).map((c) => ({ value: c.isoCode, label: c.name }));
  },

  getCities: () => {
    const { country, province } = get().data;

    if (!country || !province) return [];
    return City.getCitiesOfState(country, province).map((c) => ({ value: c.name, label: c.name }));
  },

  getPhoneMask: () => {
    const { code = '+1', mask = '(###) ###-####' } = countryPhoneMasks.find((c) => c.iso === get().data.country) ?? {};
    return `${code} ${typeof mask === 'string' ? mask.replace(/\)+/g, ') ') : mask}`;
  },

  getPostalCode: () => {
    const { postalCodes, data } = get();
    return postalCodes.find((pc) => pc.iso === data.country) ?? null;
  },

  // Actions

  init() {
    return get().loadPostalCodes();
  },

  async loadPostalCodes() {
    if (get().postalCodes.length) return;

    try {
      const postalCodesDTO: PostalCodeDTO[] = await fetch(POSTAL_CODES_FETCH_API).then((res) => res.json());
      set({
        postalCodes: postalCodesDTO
          .filter((dto) => dto.Regex)
          .map((dto) => ({
            iso: dto.ISO,
            mask: dto.Format.slice(0, dto.Format.indexOf(' (o')),
            regEx: dto.Regex,
          })),
      });
    } catch (error) {
      console.debug('Error fetching postal codes', { error });
    }
  },

  unsetData(keys) {
    set((state) => {
      for (const key in state.data) {
        type K = keyof typeof state.data;
        if (!keys.includes(key as K)) {
          state.data[key as K] = '';
        }
      }
      return deepClone(state);
    });
  },

  setData: (clb) => set((s) => (clb(s.data), deepClone(s))),
}));
