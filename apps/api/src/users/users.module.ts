import { Module } from "@nestjs/common";
import { ScryptPasswordHasher } from "./application/password-hasher.js";
import { UserService } from "./application/user-service.js";
import { userRepositoryProvider } from "./infrastructure/user-repository.provider.js";
import { UserController } from "./presentation/user.controller.js";

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    userRepositoryProvider,
    { provide: "PasswordHasher", useClass: ScryptPasswordHasher },
  ],
  exports: [UserService],
})
export class UsersModule {}
