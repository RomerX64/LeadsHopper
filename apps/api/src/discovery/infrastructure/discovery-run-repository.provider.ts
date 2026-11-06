import { InMemoryDiscoveryRunRepository } from "../application/discovery-run-repository.js";
import type { DiscoveryRunRepository } from "../application/discovery-run-repository.js";
import { Pool } from "pg";
import { PostgresDiscoveryRunRepository } from "./postgres-discovery-run-repository.js";

export const discoveryRunRepositoryProvider = {
  provide: "DiscoveryRunRepository",
  useFactory: (): DiscoveryRunRepository => {
    const connectionString = process.env["DATABASE_URL"];
    return connectionString
      ? new PostgresDiscoveryRunRepository(new Pool({ connectionString, max: 5 }))
      : new InMemoryDiscoveryRunRepository();
  },
};
