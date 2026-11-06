import { randomUUID } from "node:crypto";

export type UserSnapshot = {
  id: string;
  email: string;
  displayName: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
};

export class User {
  private constructor(private readonly state: UserSnapshot) {}

  static create(input: {
    email: string;
    displayName: string;
    passwordHash: string;
    now?: Date;
  }): User {
    const now = input.now ?? new Date();
    return new User({
      id: randomUUID(),
      email: User.normalizeEmail(input.email),
      displayName: User.normalizeName(input.displayName),
      passwordHash: input.passwordHash,
      createdAt: now,
      updatedAt: now,
    });
  }

  static rehydrate(state: UserSnapshot): User {
    return new User({ ...state, email: User.normalizeEmail(state.email) });
  }

  updateProfile(input: { email: string; displayName: string; now?: Date }): void {
    this.state.email = User.normalizeEmail(input.email);
    this.state.displayName = User.normalizeName(input.displayName);
    this.state.updatedAt = input.now ?? new Date();
  }

  changePassword(passwordHash: string, now = new Date()): void {
    this.state.passwordHash = passwordHash;
    this.state.updatedAt = now;
  }

  snapshot(): UserSnapshot {
    return { ...this.state };
  }

  publicView(): Omit<UserSnapshot, "passwordHash"> {
    return {
      id: this.state.id,
      email: this.state.email,
      displayName: this.state.displayName,
      createdAt: this.state.createdAt,
      updatedAt: this.state.updatedAt,
    };
  }

  private static normalizeEmail(email: string): string {
    const normalized = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
      throw new Error("A valid email is required");
    }
    return normalized;
  }

  private static normalizeName(name: string): string {
    const normalized = name.trim().replace(/\s+/g, " ");
    if (normalized.length < 2 || normalized.length > 80) {
      throw new Error("Display name must contain between 2 and 80 characters");
    }
    return normalized;
  }
}
