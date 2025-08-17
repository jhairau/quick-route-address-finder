import {
  type TomTomSearchResult,
  type TomTomSearchResults,
} from "../types/tom-tom";

export const mockSearchResult: TomTomSearchResult = {
  type: "POI",
  id: "test-id",
  score: 0.95,
  dist: 100,
  info: "test",
  entityType: "Municipality",
  poi: {
    name: "Test Location",
    phone: "+61123456789",
    url: "https://example.com",
    brands: [],
    categorySet: [],
    categories: [],
    openingHours: {
      mode: "nextSevenDays",
      timeRanges: [],
    },
    classifications: [],
    timeZone: {
      ianaId: "Australia/Sydney",
    },
  },
  relatedPois: [],
  address: {
    streetNumber: "123",
    streetName: "Collins Street",
    municipalitySubdivision: "Melbourne",
    municipality: "Melbourne",
    countrySecondarySubdivision: "Melbourne",
    countryTertiarySubdivision: "",
    countrySubdivision: "Victoria",
    postalCode: "3000",
    extendedPostalCode: "",
    countryCode: "AU",
    country: "Australia",
    countryCodeISO3: "AUS",
    freeformAddress: "123 Collins Street, Melbourne VIC 3000, Australia",
    countrySubdivisionName: "Victoria",
    localName: "Melbourne",
  },
  position: {
    lat: -37.8136,
    lon: 144.9631,
  },
  mapcodes: [],
  viewport: {
    topLeftPoint: { lat: -37.8135, lon: 144.963 },
    btmRightPoint: { lat: -37.8137, lon: 144.9632 },
  },
  entryPoints: [],
  addressRanges: {
    rangeLeft: "",
    rangeRight: "",
    from: { lat: 0, lon: 0 },
    to: { lat: 0, lon: 0 },
  },
  chargingPark: {
    connectors: [],
  },
  dataSources: {
    chargingAvailability: { id: "" },
    parkingAvailability: { id: "" },
    fuelPrice: { id: "" },
    geometry: { id: "" },
  },
};

export const mockTomTomResponse: TomTomSearchResults = {
  summary: {
    query: "123 Collins Street, Melbourne",
    queryType: "NON_NEAR",
    queryTime: 123,
    numResults: 1,
    offset: 0,
    totalResults: 1,
    fuzzyLevel: 1,
    geoBias: { lat: -37.8136, lon: 144.9631 },
    queryIntent: [],
  },
  results: [mockSearchResult],
};
