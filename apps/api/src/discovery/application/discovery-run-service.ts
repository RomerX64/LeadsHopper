import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { DiscoveryService } from "./discovery-source.js";
import type { DiscoveryRunRepository } from "./discovery-run-repository.js";
import { DiscoveryRun } from "../domain/discovery-run.js";

@Injectable()
export class DiscoveryRunService {
  constructor(
    @Inject(DiscoveryService) private readonly discovery: DiscoveryService,
    @Inject("DiscoveryRunRepository") private readonly repository: DiscoveryRunRepository,
  ) {}

  async execute(input: {
    category: string;
    region: string;
    limit?: number;
  }): Promise<DiscoveryRun> {
    const request = this.discovery.createRequest(input);
    await this.repository.deleteExpired(new Date());
    const run = DiscoveryRun.start(request);
    try {
      run.complete(await this.discovery.searchRequest(request));
    } catch (error) {
      run.fail(error instanceof Error ? error.message : "Discovery source failed");
    }
    await this.repository.save(run);
    return run;
  }

  async list(): Promise<DiscoveryRun[]> {
    await this.repository.deleteExpired(new Date());
    return this.repository.list();
  }

  async get(id: string): Promise<DiscoveryRun> {
    await this.repository.deleteExpired(new Date());
    const run = await this.repository.findById(id);
    if (!run) throw new NotFoundException("Discovery run not found");
    return run;
  }
}
