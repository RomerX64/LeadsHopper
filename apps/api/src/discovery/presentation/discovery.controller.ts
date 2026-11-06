import {
  Body,
  Controller,
  Get,
  Headers,
  Inject,
  Param,
  Post,
  UnauthorizedException,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { UserService } from "../../users/application/user-service.js";
import { DiscoveryRunService } from "../application/discovery-run-service.js";
// Nest uses the DTO constructor for runtime validation metadata.
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { DiscoverySearchDto } from "./discovery.dto.js";

@ApiTags("discovery")
@Controller("api/v1/discovery")
export class DiscoveryController {
  constructor(
    @Inject(DiscoveryRunService) private readonly runs: DiscoveryRunService,
    @Inject(UserService) private readonly users: UserService,
  ) {}

  @Post("search")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Search businesses and return the raw source payload" })
  async search(
    @Headers("authorization") authorization: string | undefined,
    @Body() input: DiscoverySearchDto,
  ) {
    await this.users.authenticate(this.token(authorization));
    return (await this.runs.execute(input)).snapshot();
  }

  @Get("runs")
  @ApiBearerAuth()
  @ApiOperation({ summary: "List recent discovery runs" })
  async list(@Headers("authorization") authorization: string | undefined) {
    await this.users.authenticate(this.token(authorization));
    return (await this.runs.list()).map((run) => run.snapshot());
  }

  @Get("runs/:id")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get a discovery run and its raw results" })
  async get(@Headers("authorization") authorization: string | undefined, @Param("id") id: string) {
    await this.users.authenticate(this.token(authorization));
    return (await this.runs.get(id)).snapshot();
  }

  private token(authorization?: string): string {
    const [scheme, token] = authorization?.split(" ") ?? [];
    if (scheme?.toLowerCase() !== "bearer" || !token) {
      throw new UnauthorizedException("Authentication required");
    }
    return token;
  }
}
