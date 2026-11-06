import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { randomBytes } from "node:crypto";
import { User } from "../domain/user.js";
import type { PasswordHasher } from "./password-hasher.js";
import type { UserRepository } from "./user-repository.js";

type PublicUser = ReturnType<User["publicView"]>;

@Injectable()
export class UserService {
  private readonly sessions = new Set<string>();

  constructor(
    @Inject("UserRepository") private readonly repository: UserRepository,
    @Inject("PasswordHasher") private readonly passwordHasher: PasswordHasher,
  ) {}

  async register(input: {
    email: string;
    displayName: string;
    password: string;
  }): Promise<PublicUser> {
    if (await this.repository.find())
      throw new ConflictException("An operator account already exists");
    const user = User.create({
      email: input.email,
      displayName: input.displayName,
      passwordHash: await this.passwordHasher.hash(input.password),
    });
    await this.repository.save(user);
    return user.publicView();
  }

  async login(input: {
    email: string;
    password: string;
  }): Promise<{ token: string; user: PublicUser }> {
    const user = await this.repository.find();
    if (!user || user.snapshot().email !== input.email.trim().toLowerCase()) {
      throw new UnauthorizedException("Invalid credentials");
    }
    const valid = await this.passwordHasher.verify(input.password, user.snapshot().passwordHash);
    if (!valid) throw new UnauthorizedException("Invalid credentials");
    const token = randomBytes(32).toString("hex");
    this.sessions.add(token);
    return { token, user: user.publicView() };
  }

  async authenticate(token: string | undefined): Promise<User> {
    if (!token || !this.sessions.has(token))
      throw new UnauthorizedException("Authentication required");
    const user = await this.repository.find();
    if (!user) throw new UnauthorizedException("Authentication required");
    return user;
  }

  logout(token: string): void {
    this.sessions.delete(token);
  }

  async update(user: User, input: { email: string; displayName: string }): Promise<PublicUser> {
    user.updateProfile(input);
    await this.repository.save(user);
    return user.publicView();
  }

  async changePassword(
    user: User,
    input: { currentPassword: string; newPassword: string },
  ): Promise<void> {
    const valid = await this.passwordHasher.verify(
      input.currentPassword,
      user.snapshot().passwordHash,
    );
    if (!valid) throw new UnauthorizedException("Current password is invalid");
    user.changePassword(await this.passwordHasher.hash(input.newPassword));
    await this.repository.save(user);
  }

  async remove(user: User): Promise<void> {
    await this.repository.delete();
    this.sessions.clear();
    void user;
  }

  async getCurrent(): Promise<PublicUser> {
    const user = await this.repository.find();
    if (!user) throw new NotFoundException("Operator account not found");
    return user.publicView();
  }
}
