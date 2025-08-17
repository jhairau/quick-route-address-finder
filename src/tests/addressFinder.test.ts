import { describe, it, expect } from "@jest/globals";
import { ZodError } from "zod";
import { $ZodError } from "zod/v4/core";
import { buildQueryString, addressFinder } from "../addressFinder";
import { mockTomTomResponse } from "./test-data";

const validApiKey = "test-key";

// Helper to mock fetch without using 'any'
type MockFetchResponse = {
  ok?: boolean;
  status?: number;
  statusText?: string;
  json?: () => Promise<unknown>;
  text?: () => Promise<string>;
};

describe("addressFinder", () => {
  function mockFetch(response: MockFetchResponse) {
    global.fetch = jest.fn().mockResolvedValue({
      ok: response.ok ?? true,
      status: response.status ?? 200,
      statusText: response.statusText ?? "OK",
      json: response.json ?? (async () => ({})),
      text: response.text ?? (async () => ""),
    });
  }

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should resolve with addresses on successful fetch", async () => {
    mockFetch({
      ok: true,
      status: 200,
      statusText: "OK",
      json: async () => mockTomTomResponse,
    });
    const result = await addressFinder({ query: "test", apiKey: validApiKey });
    expect(result.addresses.length).toBe(1);
    expect(result._raw.summary.query).toBe("123 Collins Street, Melbourne");
  });

  it("should throw error on failed fetch", async () => {
    mockFetch({
      ok: false,
      status: 404,
      statusText: "Not Found",
      text: async () => "Not Found Body",
    });
    await expect(
      addressFinder({ query: "test", apiKey: validApiKey })
    ).rejects.toThrow(
      /TomTom API request failed with status 404: Not Found and body Not Found Body/
    );
  });
});

describe("buildQueryString", () => {
  it("should build a default query string with no options", () => {
    const qs = buildQueryString(validApiKey, {});
    expect(qs).toContain("limit=5");
    expect(qs).toContain("minFuzzyLevel=1");
    expect(qs).toContain("maxFuzzyLevel=2");
    expect(qs).toContain(`key=${validApiKey}`);
    expect(qs).toContain("countrySet=aus");
    expect(qs).not.toContain("geoBias");
  });

  it("should build a query string with custom options", () => {
    const qs = buildQueryString(validApiKey, {
      limit: 10,
      minFuzzyLevel: 2,
      maxFuzzyLevel: 3,
      geoBias: { lat: -37.8136, lon: 144.9631 },
    });
    expect(qs).toContain("limit=10");
    expect(qs).toContain("minFuzzyLevel=2");
    expect(qs).toContain("maxFuzzyLevel=3");
    expect(qs).toContain("geoBias=point%3A-37.8136%2C144.9631");
  });

  it("should encode geoBias correctly for boundary values", () => {
    const qs = buildQueryString(validApiKey, {
      geoBias: { lat: 90, lon: 180 },
    });
    expect(qs).toContain("geoBias=point%3A90%2C180");
  });

  it("should throw Zod validation error for invalid limit type", () => {
    try {
      // @ts-expect-error: purposely invalid type for test
      buildQueryString(validApiKey, { limit: "not-a-number" });
      throw new Error("Did not throw");
    } catch (err) {
      expect(err).toBeInstanceOf($ZodError);
      const zodErr = err as ZodError;
      expect(zodErr.issues).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            path: ["limit"],
            message: "Invalid input",
            expected: "number",
            code: "invalid_type",
          }),
        ])
      );
    }
  });

  it("should throw Zod validation error for invalid geoBias lat", () => {
    try {
      // @ts-expect-error: purposely invalid type for test
      buildQueryString(validApiKey, { geoBias: { lat: "invalid" } });
      throw new Error("Did not throw");
    } catch (err) {
      expect(err).toBeInstanceOf($ZodError);
      const zodErr = err as ZodError;
      expect(zodErr.issues).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            path: ["geoBias", "lat"],
            message: "Invalid input",
            expected: "number",
            code: "invalid_type",
          }),
        ])
      );
    }
  });

  it("should throw Zod validation error for missing geoBias lon", () => {
    try {
      // @ts-expect-error: purposely invalid type for test
      buildQueryString(validApiKey, { geoBias: { lat: 10 } });
      throw new Error("Did not throw");
    } catch (err) {
      expect(err).toBeInstanceOf($ZodError);
      const zodErr = err as ZodError;
      expect(zodErr.issues).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            path: ["geoBias", "lon"],
            message: "Invalid input",
            expected: "number",
            code: "invalid_type",
          }),
        ])
      );
    }
  });
});
