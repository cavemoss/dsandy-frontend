import axios from '@/api/config/axios';

import { GoogleMapsAutocompleteDTO } from './google.types';

const ROUTE = '/google-maps';

export const autocomplete = (dto: GoogleMapsAutocompleteDTO) =>
  axios.post(ROUTE + '/autocomplete', dto).then((res) => res.data);

export const details = (placeId: string) =>
  axios.post(ROUTE + '/autocomplete', {}, { params: { placeId } }).then((res) => res.data);
