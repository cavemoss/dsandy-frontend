import { Client, PlaceAutocompleteType } from '@googlemaps/google-maps-services-js';

const client = new Client({});

export async function getPlaceAutocomplete(input: string, countryCode: string) {
  try {
    const response = await client.placeAutocomplete({
      params: {
        input,
        key: process.env.GOOGLE_MAPS_API_KEY,
        components: [`country:${countryCode.toLowerCase()}`],
        types: PlaceAutocompleteType.address,
      },
    });
    return response.data.predictions;
  } catch (error) {
    console.error('Autocomplete error:', error);
    return [];
  }
}

export async function getPlaceDetails(placeId: string) {
  try {
    const response = await client.placeDetails({
      params: {
        place_id: placeId,
        key: process.env.GOOGLE_MAPS_API_KEY,
        fields: ['address_components', 'geometry'],
      },
    });
    return response.data.result;
  } catch (error) {
    console.error('Details error:', error);
    return null;
  }
}
