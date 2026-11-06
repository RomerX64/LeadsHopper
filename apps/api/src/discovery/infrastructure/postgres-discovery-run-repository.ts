import type { OnApplicationShutdown } from "@nestjs/common";
import type { Pool } from "pg";
import { DiscoveryRun } from "../domain/discovery-run.js";
import type { DiscoveryRunRepository } from "../application/discovery-run-repository.js";
import type { DiscoveryRunSnapshot } from "../domain/discovery-run.js";

type RunRow = {
  id: string;
  category: string;
  region: string;
  result_limit: number;
  status: "completed" | "failed";
  results: DiscoveryRunSnapshot["results"];
  error: string | null;
  created_at: Date;
  expires_at: Date;
};

export class PostgresDiscoveryRunRepository
  implements DiscoveryRunRepository, OnApplicationShutdown
{
  constructor(private readonly pool: Pool) {}

  async save(run: DiscoveryRun): Promise<void> {
    const snapshot = run.snapshot();
    await this.pool.query(
      `INSERT INTO discovery_runs
        (id, category, region, result_limit, status, results, error, created_at, expires_at)
       VALUES ($1, $2, $3, $4, $5, $6::jsonb, $7, $8, $9)
       ON CONFLICT (id) DO UPDATE SET status = EXCLUDED.status,
         results = EXCLUDED.results, error = EXCLUDED.error`,
      [
        snapshot.id,
        snapshot.category,
        snapshot.region,
        snapshot.limit,
        snapshot.status,
        JSON.stringify(snapshot.results),
        snapshot.error,
        snapshot.createdAt,
        snapshot.expiresAt,
      ],
    );
  }

  async findById(id: string): Promise<DiscoveryRun | null> {
    const result = await this.pool.query<RunRow>("SELECT * FROM discovery_runs WHERE id = $1", [
      id,
    ]);
    const row = result.rows[0];
    return row ? this.toRun(row) : null;
  }

  async list(): Promise<DiscoveryRun[]> {
    const result = await this.pool.query<RunRow>(
      "SELECT * FROM discovery_runs ORDER BY created_at DESC",
    );
    return result.rows.map((row) => this.toRun(row));
  }

  async deleteExpired(now: Date): Promise<void> {
    await this.pool.query("DELETE FROM discovery_runs WHERE expires_at <= $1", [now]);
  }

  async onApplicationShutdown(): Promise<void> {
    await this.pool.end();
  }

  private toRun(row: RunRow): DiscoveryRun {
    const run = DiscoveryRun.rehydrate({
      id: row.id,
      category: row.category,
      region: row.region,
      limit: row.result_limit,
      status: row.status,
      results: row.results,
      error: row.error,
      createdAt: row.created_at,
      expiresAt: row.expires_at,
    });
    return run;
  }
}
