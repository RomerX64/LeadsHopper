import type { Pool } from "pg";
import type { OnApplicationShutdown } from "@nestjs/common";
import { User, type UserSnapshot } from "../domain/user.js";
import type { UserRepository } from "../application/user-repository.js";

type UserRow = {
  id: string;
  email: string;
  display_name: string;
  password_hash: string;
  created_at: Date;
  updated_at: Date;
};

export class PostgresUserRepository implements UserRepository, OnApplicationShutdown {
  constructor(private readonly pool: Pool) {}

  async find(): Promise<User | null> {
    const result = await this.pool.query<UserRow>(
      `SELECT id, email, display_name, password_hash, created_at, updated_at
       FROM operator_users
       ORDER BY created_at ASC
       LIMIT 1`,
    );
    const row = result.rows[0];
    return row ? User.rehydrate(this.toUserSnapshot(row)) : null;
  }

  async save(user: User): Promise<void> {
    const snapshot = user.snapshot();
    await this.pool.query(
      `INSERT INTO operator_users (id, email, display_name, password_hash, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT (id) DO UPDATE
       SET email = EXCLUDED.email,
           display_name = EXCLUDED.display_name,
           password_hash = EXCLUDED.password_hash,
           updated_at = EXCLUDED.updated_at`,
      [
        snapshot.id,
        snapshot.email,
        snapshot.displayName,
        snapshot.passwordHash,
        snapshot.createdAt,
        snapshot.updatedAt,
      ],
    );
  }

  async delete(): Promise<void> {
    await this.pool.query("DELETE FROM operator_users");
  }

  async onApplicationShutdown(): Promise<void> {
    await this.pool.end();
  }

  private toUserSnapshot(row: UserRow): UserSnapshot {
    return {
      id: row.id,
      email: row.email,
      displayName: row.display_name,
      passwordHash: row.password_hash,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }
}
