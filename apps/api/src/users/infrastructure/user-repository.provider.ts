import { Pool } from "pg";
import { InMemoryUserRepository } from "../application/user-repository.js";
import type { UserRepository } from "../application/user-repository.js";
import { PostgresUserRepository } from "./postgres-user-repository.js";

export const userRepositoryProvider = {
  provide: "UserRepository",
  useFactory: (): UserRepository => {
    const connectionString = process.env["DATABASE_URL"];
    if (!connectionString) return new InMemoryUserRepository();
    return new PostgresUserRepository(new Pool({ connectionString, max: 5 }));
  },
};
