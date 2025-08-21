# Quick Route Address Finder

[![CI](https://github.com/jhairau/quick-route-address-finder/actions/workflows/ci.yml/badge.svg)](https://github.com/jhairau/quick-route-address-finder/actions/workflows/ci.yml)
[![codecov](https://codecov.io/github/jhairau/quick-route-address-finder/graph/badge.svg?token=M1L1IQFJSX)](https://codecov.io/github/jhairau/quick-route-address-finder)
[![npm version](https://badge.fury.io/js/quick-route-address-finder.svg)](https://badge.fury.io/js/quick-route-address-finder)
[![Node.js Version](https://img.shields.io/node/v/quick-route-address-finder.svg)](https://nodejs.org/)

A TypeScript library for finding and geocoding Australian addresses using the TomTom Search API. Built with modern ESM modules and full type safety.

## Features

- 🇦🇺 **Australia-focused**: Optimized for Australian address search
- 🔍 **Fuzzy search**: Intelligent matching with configurable fuzzy levels
- 📍 **Geo-biased results**: Get more relevant results based on location
- 🛡️ **Type-safe**: Full TypeScript support with Zod validation
- 🚀 **Modern**: ESM modules, Node.js 20+ support
- ⚡ **Lightweight**: Minimal dependencies
- 🧪 **Well-tested**: Comprehensive test coverage

## Installation

```bash
npm install quick-route-address-finder
```

## Prerequisites

- Node.js 20.0.0 or higher
- A TomTom API key ([Get one here](https://developer.tomtom.com/))

## Quick Start

```typescript
import { addressFinder } from 'quick-route-address-finder';

const results = await addressFinder({
  query: '1 Martin Place Sydney',
  apiKey: 'your-tomtom-api-key'
});

console.log(results.addresses);
// [
//   {
//     formatted: "1 Martin Place, Sydney NSW 2000, Australia",
//     components: { ... },
//     latitude: -33.8688,
//     longitude: 151.2093
//   }
// ]
```

## API Reference

### `addressFinder(params)`

Search for addresses using the TomTom Search API.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `query` | `string` | ✅ | The address search query |
| `apiKey` | `string` | ✅ | Your TomTom API key |
| `options` | `FindAddressesOptions` | ❌ | Search configuration options |

**Options:**

```typescript
interface FindAddressesOptions {
  limit?: number;        // Max results (default: 5)
  minFuzzyLevel?: number; // Minimum fuzzy level (default: 1)
  maxFuzzyLevel?: number; // Maximum fuzzy level (default: 2)
  geoBias?: {            // Bias results towards a location
    lat: number;
    lon: number;
  };
}
```

**Returns:**

```typescript
{
  addresses: QuickRouteStandardAddress[];
  _raw: TomTomSearchResults; // Raw TomTom API response
}
```

**Address Format:**

```typescript
interface QuickRouteStandardAddress {
  formatted: string;    // Human-readable address
  components: object;   // Structured address components
  latitude: number;     // Latitude coordinate
  longitude: number;    // Longitude coordinate
}
```

## Examples

### Basic Search

```typescript
import { addressFinder } from 'quick-route-address-finder';

const results = await addressFinder({
  query: 'Opera House Sydney',
  apiKey: process.env.TOMTOM_API_KEY
});

console.log(`Found ${results.addresses.length} addresses`);
```

### Advanced Search with Options

```typescript
const results = await addressFinder({
  query: 'Collins St Melbourne',
  apiKey: process.env.TOMTOM_API_KEY,
  options: {
    limit: 10,
    minFuzzyLevel: 1,
    maxFuzzyLevel: 3,
    geoBias: {
      lat: -37.8136,  // Melbourne CBD
      lon: 144.9631
    }
  }
});
```
