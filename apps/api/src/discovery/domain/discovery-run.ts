import { randomUUID } from "node:crypto";
import type { DiscoverySearchRequest, RawDiscoveryResult } from "./discovery.js";

export type DiscoveryRunStatus = "completed" | "failed";

export type DiscoveryRunSnapshot = {
  id: string;
  category: string;
  region: string;
  limit: number;
  status: DiscoveryRunStatus;
  results: RawDiscoveryResult[];
  error: string | null;
  createdAt: Date;
  expiresAt: Date;
};

export class DiscoveryRun {
  private constructor(private readonly state: DiscoveryRunSnapshot) {}

  static start(request: DiscoverySearchRequest, now = new Date()): DiscoveryRun {
    const expiresAt = new Date(now);
    expiresAt.setDate(expiresAt.getDate() + 30);
    return new DiscoveryRun({
      id: randomUUID(),
      category: request.category,
      region: request.region,
      limit: request.limit,
      status: "completed",
      results: [],
      error: null,
      createdAt: now,
      expiresAt,
    });
  }

  static rehydrate(snapshot: DiscoveryRunSnapshot): DiscoveryRun {
    return new DiscoveryRun({ ...snapshot, results: [...snapshot.results] });
  }

  complete(results: RawDiscoveryResult[]): void {
    this.state.status = "completed";
    this.state.results = results;
    this.state.error = null;
  }

  fail(error: string): void {
    this.state.status = "failed";
    this.state.results = [];
    this.state.error = error;
  }

  snapshot(): DiscoveryRunSnapshot {
    return { ...this.state, results: [...this.state.results] };
  }
}
