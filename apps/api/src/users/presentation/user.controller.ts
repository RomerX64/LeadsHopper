import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  Inject,
  Patch,
  Post,
  UnauthorizedException,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { UserService } from "../application/user-service.js";
// Nest uses DTO constructors for runtime validation metadata.
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ChangePasswordDto, LoginDto, RegisterUserDto, UpdateUserDto } from "./user.dto.js";

@ApiTags("operator account")
@Controller("api/v1")
export class UserController {
  constructor(@Inject(UserService) private readonly users: UserService) {}

  @Post("users/register")
  @ApiOperation({ summary: "Create the single operator account" })
  register(@Body() input: RegisterUserDto) {
    return this.users.register(input);
  }

  @Post("auth/login")
  @HttpCode(200)
  @ApiOperation({ summary: "Start an operator session" })
  login(@Body() input: LoginDto) {
    return this.users.login(input);
  }

  @Post("auth/logout")
  @HttpCode(204)
  @ApiBearerAuth()
  @ApiOperation({ summary: "End the current operator session" })
  logout(@Headers("authorization") authorization?: string): void {
    this.users.logout(this.token(authorization));
  }

  @Get("users/me")
  @ApiBearerAuth()
  getCurrent(@Headers("authorization") authorization?: string) {
    return this.users.authenticate(this.token(authorization)).then((user) => user.publicView());
  }

  @Patch("users/me")
  @ApiBearerAuth()
  update(
    @Headers("authorization") authorization: string | undefined,
    @Body() input: UpdateUserDto,
  ) {
    return this.users
      .authenticate(this.token(authorization))
      .then((user) => this.users.update(user, input));
  }

  @Patch("users/me/password")
  @HttpCode(204)
  @ApiBearerAuth()
  async changePassword(
    @Headers("authorization") authorization: string | undefined,
    @Body() input: ChangePasswordDto,
  ) {
    await this.users.changePassword(
      await this.users.authenticate(this.token(authorization)),
      input,
    );
  }

  @Delete("users/me")
  @HttpCode(204)
  @ApiBearerAuth()
  async remove(@Headers("authorization") authorization: string | undefined): Promise<void> {
    await this.users.remove(await this.users.authenticate(this.token(authorization)));
  }

  private token(authorization?: string): string {
    const [scheme, token] = authorization?.split(" ") ?? [];
    if (scheme?.toLowerCase() !== "bearer" || !token)
      throw new UnauthorizedException("Authentication required");
    return token;
  }
}
