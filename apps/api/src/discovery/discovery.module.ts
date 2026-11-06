import { Module } from "@nestjs/common";
import { UsersModule } from "../users/users.module.js";
import { DiscoveryService } from "./application/discovery-source.js";
import { DiscoveryRunService } from "./application/discovery-run-service.js";
import { InMemoryFixtureDiscoverySource } from "./infrastructure/fixture-discovery-source.js";
import { discoveryRunRepositoryProvider } from "./infrastructure/discovery-run-repository.provider.js";
import { DiscoveryController } from "./presentation/discovery.controller.js";

@Module({
  imports: [UsersModule],
  controllers: [DiscoveryController],
  providers: [
    InMemoryFixtureDiscoverySource,
    DiscoveryRunService,
    discoveryRunRepositoryProvider,
    {
      provide: DiscoveryService,
      useFactory: (source: InMemoryFixtureDiscoverySource) => new DiscoveryService(source),
      inject: [InMemoryFixtureDiscoverySource],
    },
  ],
  exports: [DiscoveryService, DiscoveryRunService],
})
export class DiscoveryModule {}
