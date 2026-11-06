import type { DiscoveryRun } from "../domain/discovery-run.js";

export interface DiscoveryRunRepository {
  save(run: DiscoveryRun): Promise<void>;
  findById(id: string): Promise<DiscoveryRun | null>;
  list(): Promise<DiscoveryRun[]>;
  deleteExpired(now: Date): Promise<void>;
}

export class InMemoryDiscoveryRunRepository implements DiscoveryRunRepository {
  private readonly runs = new Map<string, DiscoveryRun>();

  async save(run: DiscoveryRun): Promise<void> {
    this.runs.set(run.snapshot().id, run);
  }

  async findById(id: string): Promise<DiscoveryRun | null> {
    return this.runs.get(id) ?? null;
  }

  async list(): Promise<DiscoveryRun[]> {
    return [...this.runs.values()].sort(
      (left, right) => right.snapshot().createdAt.getTime() - left.snapshot().createdAt.getTime(),
    );
  }

  async deleteExpired(now: Date): Promise<void> {
    for (const [id, run] of this.runs) {
      if (run.snapshot().expiresAt <= now) this.runs.delete(id);
    }
  }
}
