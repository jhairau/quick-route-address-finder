import * as z from 'zod/mini';
import { QuickRouteStandardAddress } from './types/quick-route';
import {
  TomTomSearchParams,
  type TomTomSearchResult,
  type TomTomSearchResults,
} from './types/tom-tom';

export function buildQueryString(
  apiKey: string,
  options: FindAddressesOptions
): string {
  const parsedOptions = findAddressesOptionsSchema.parse(options);
  const params: TomTomSearchParams = {
    limit: String(parsedOptions.limit || 5),
    minFuzzyLevel: String(parsedOptions.minFuzzyLevel || 1),
    maxFuzzyLevel: String(parsedOptions.maxFuzzyLevel || 2),
    typeahead: 'true',
    countrySet: 'AUS', // hardcoded for Australia
    view: 'Unified',
    relatedPois: 'off',
    key: apiKey,
  };

  const { geoBias } = parsedOptions;

  if (geoBias) {
    params['geoBias'] = `point:${geoBias.lat},${geoBias.lon}`;
  }

  return new URLSearchParams(params).toString();
}

/**
 * Search options that we pass to Tom Tom API.
 */
const findAddressesOptionsSchema = z.object({
  limit: z.optional(z.number()),
  minFuzzyLevel: z.optional(z.number()),
  maxFuzzyLevel: z.optional(z.number()),
  geoBias: z.optional(
    z.object({
      lat: z.number(),
      lon: z.number(),
    })
  ),
});

export type FindAddressesOptions = z.infer<typeof findAddressesOptionsSchema>;

export function tomTomSearchResultToQuickRouteStandardAddress({
  address,
  position,
}: TomTomSearchResult): QuickRouteStandardAddress {
  return {
    formatted: address.freeformAddress,
    components: address,
    latitude: position.lat,
    longitude: position.lon,
  };
}

export async function addressFinder({
  query,
  apiKey,
  options = {},
  timeoutMs = 1000,
  abortSignal,
}: {
  query: string;
  apiKey: string;
  options?: FindAddressesOptions;
  timeoutMs?: number;
  abortSignal?: AbortSignal;
}): Promise<{
  addresses: QuickRouteStandardAddress[];
  _raw: TomTomSearchResults;
}> {
  const queryEncoded = encodeURIComponent(query);
  const queryString = buildQueryString(apiKey, options);

  // Set up timeout handling
  const abortController = new AbortController();
  const timer = setTimeout(() => abortController.abort(), timeoutMs);
  const _abortSignal = abortSignal ?? abortController.signal;

  const result = await fetch(
    `https://api.tomtom.com/search/2/search/${queryEncoded}.json?${queryString}`,
    { signal: _abortSignal }
  );

  clearTimeout(timer);

  if (!result.ok) {
    throw new Error(
      `TomTom API request failed with status ${result.status}: ${
        result.statusText
      } and body ${await result.text()}`
    );
  }

  const data = (await result.json()) as TomTomSearchResults; // Parse the JSON response

  return {
    addresses: data.results.map(tomTomSearchResultToQuickRouteStandardAddress),
    _raw: data,
  };
}
