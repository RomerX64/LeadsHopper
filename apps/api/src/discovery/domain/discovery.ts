export const DISCOVERY_MAX_RESULTS = 10;
export const DISCOVERY_SOURCE_TIMEOUT_MS = 90_000;

export type DiscoverySearchRequest = {
  category: string;
  region: string;
  limit: number;
  timeoutMs: number;
};

export type RawDiscoveryResult = {
  name: string | null;
  category: string | null;
  address: string | null;
  city: string | null;
  latitude: number | null;
  longitude: number | null;
  phone: string | null;
  website: string | null;
  socialLinks: string[] | null;
  sourceType: string;
  sourceUrl: string | null;
  collectedAt: Date;
  warnings: string[];
  rawPayload: unknown;
};

export class DiscoveryValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DiscoveryValidationError";
  }
}

export function createDiscoverySearchRequest(input: {
  category: string;
  region: string;
  limit?: number;
}): DiscoverySearchRequest {
  const category = input.category.trim();
  const region = input.region.trim();
  const limit = input.limit ?? DISCOVERY_MAX_RESULTS;

  if (!category) {
    throw new DiscoveryValidationError("Category is required");
  }
  if (!region) {
    throw new DiscoveryValidationError("Region is required");
  }
  if (!Number.isInteger(limit) || limit < 1) {
    throw new DiscoveryValidationError("Limit must be a positive integer");
  }
  if (limit > DISCOVERY_MAX_RESULTS) {
    throw new DiscoveryValidationError(`Limit cannot exceed ${DISCOVERY_MAX_RESULTS} results`);
  }

  return {
    category,
    region,
    limit,
    timeoutMs: DISCOVERY_SOURCE_TIMEOUT_MS,
  };
}
