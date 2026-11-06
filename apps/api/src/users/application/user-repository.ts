import type { User } from "../domain/user.js";

export interface UserRepository {
  find(): Promise<User | null>;
  save(user: User): Promise<void>;
  delete(): Promise<void>;
}

export class InMemoryUserRepository implements UserRepository {
  private user: User | null = null;

  async find(): Promise<User | null> {
    return this.user;
  }

  async save(user: User): Promise<void> {
    this.user = user;
  }

  async delete(): Promise<void> {
    this.user = null;
  }
}
