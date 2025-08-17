export type QuickRouteStandardAddress = {
  formatted: string;
  components: QuickRouteAddressComponents; // Tech Interview Note: I'm taking a shortcut here, I don't want to code my own for the interview
  latitude: number;
  longitude: number;
};

// Tech Interview Note: I'm taking a shortcut here, I don't want to code my own for the interview
export type QuickRouteAddressComponents = {
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
