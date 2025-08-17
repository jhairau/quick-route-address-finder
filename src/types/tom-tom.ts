/*
Types were generate from JSON responses on the api documentation site
and then converted to TypeScript types .

*/

// Loose types for the TomTom Search API
export type TomTomSearchParams = {
  limit: string;
  minFuzzyLevel: string;
  maxFuzzyLevel: string;
  typeahead: "true" | "false";
  countrySet: "aus"; // this does support more countries, but we are hardcoding to Australia for now
  view: string;
  relatedPois: string;
  key: string;
  geoBias?: string; // point:lat,lon
};

export type TomTomSearchResults = {
  summary: Summary;
  results: TomTomSearchResult[];
};

export type Summary = {
  query: string;
  queryType: string;
  queryTime: number;
  numResults: number;
  offset: number;
  totalResults: number;
  fuzzyLevel: number;
  geoBias: GeoBias;
  queryIntent: string[];
};

export type GeoBias = {
  lat: number;
  lon: number;
};

export type TomTomSearchResult = {
  type: string;
  id: string;
  score: number;
  dist: number;
  info: string;
  entityType: string;
  poi: Poi;
  relatedPois: RelatedPoi[];
  address: Address;
  position: Position;
  mapcodes: Mapcode[];
  viewport: Viewport;
  entryPoints: EntryPoint[];
  addressRanges: AddressRanges;
  chargingPark: ChargingPark;
  dataSources: DataSources;
};

export type Poi = {
  name: string;
  phone: string;
  url: string;
  brands: Brand[];
  categorySet: CategorySet[];
  categories: string[];
  openingHours: OpeningHours;
  classifications: Classification[];
  timeZone: TimeZone;
};

export type Brand = {
  name: string;
};

export type CategorySet = {
  id: number;
};

export type OpeningHours = {
  mode: string;
  timeRanges: TimeRange[];
};

export type TimeRange = {
  startTime: StartTime;
  endTime: EndTime;
};

export type StartTime = {
  date: string;
  hour: number;
  minute: number;
};

export type EndTime = {
  date: string;
  hour: number;
  minute: number;
};

export type Classification = {
  code: string;
  names: Name[];
};

export type Name = {
  nameLocale: string;
  name: string;
};

export type TimeZone = {
  ianaId: string;
};

export type RelatedPoi = {
  relationType: string;
  id: string;
};

export type Address = {
  streetNumber: string;
  streetName: string;
  municipalitySubdivision: string;
  municipality: string;
  countrySecondarySubdivision: string;
  countryTertiarySubdivision: string;
  countrySubdivision: string;
  postalCode: string;
  extendedPostalCode: string;
  countryCode: string;
  country: string;
  countryCodeISO3: string;
  freeformAddress: string;
  countrySubdivisionName: string;
  localName: string;
};

export type Position = {
  lat: number;
  lon: number;
};

export type Mapcode = {
  type: string;
  fullMapcode: string;
  territory?: string;
  code?: string;
};

export type Viewport = {
  topLeftPoint: TopLeftPoint;
  btmRightPoint: BtmRightPoint;
};

export type TopLeftPoint = {
  lat: number;
  lon: number;
};

export type BtmRightPoint = {
  lat: number;
  lon: number;
};

export type EntryPoint = {
  type: string;
  position: Position2;
  functions?: string[];
};

export type Position2 = {
  lat: number;
  lon: number;
};

export type AddressRanges = {
  rangeLeft: string;
  rangeRight: string;
  from: From;
  to: To;
};

export type From = {
  lat: number;
  lon: number;
};

export type To = {
  lat: number;
  lon: number;
};

export type ChargingPark = {
  connectors: Connector[];
};

export type Connector = {
  connectorType: string;
  ratedPowerKW: number;
  currentA: number;
  currentType: string;
  voltageV: number;
};

export type DataSources = {
  chargingAvailability: ChargingAvailability;
  parkingAvailability: ParkingAvailability;
  fuelPrice: FuelPrice;
  geometry: Geometry;
};

export type ChargingAvailability = {
  id: string;
};

export type ParkingAvailability = {
  id: string;
};

export type FuelPrice = {
  id: string;
};

export type Geometry = {
  id: string;
};
