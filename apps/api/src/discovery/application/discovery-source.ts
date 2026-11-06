import { createDiscoverySearchRequest } from "../domain/discovery.js";
import type { DiscoverySearchRequest, RawDiscoveryResult } from "../domain/discovery.js";

export type DiscoverySourceErrorKind = "timeout" | "source";

export class DiscoverySourceError extends Error {
  constructor(
    message: string,
    readonly kind: DiscoverySourceErrorKind,
    options?: { cause?: unknown },
  ) {
    super(message, options);
    this.name = "DiscoverySourceError";
  }
}

export interface DiscoverySourcePort {
  search(request: DiscoverySearchRequest): Promise<RawDiscoveryResult[]>;
}

export type DiscoverySource = DiscoverySourcePort;

export class DiscoveryService {
  constructor(private readonly source: DiscoverySourcePort) {}

  createRequest(input: {
    category: string;
    region: string;
    limit?: number;
  }): DiscoverySearchRequest {
    return createDiscoverySearchRequest(input);
  }

  searchRequest(request: DiscoverySearchRequest): Promise<RawDiscoveryResult[]> {
    return this.source.search(request);
  }

  search(input: {
    category: string;
    region: string;
    limit?: number;
  }): Promise<RawDiscoveryResult[]> {
    return this.searchRequest(this.createRequest(input));
  }
}
