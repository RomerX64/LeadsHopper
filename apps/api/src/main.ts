import { Controller, Get, Module, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import type { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { UsersModule } from "./users/users.module.js";
import { DiscoveryModule } from "./discovery/discovery.module.js";

@Controller()
export class HealthController {
  @Get("health")
  health(): { status: string } {
    return { status: "ok" };
  }

  @Get("ready")
  ready(): { status: string } {
    return { status: "ready" };
  }
}

@Module({
  controllers: [HealthController],
  imports: [UsersModule, DiscoveryModule],
})
export class AppModule {}

export async function createApp(): Promise<NestExpressApplication> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({ origin: true });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle("LeadHopper API")
      .setDescription("Single-tenant lead discovery operator API")
      .setVersion("1.0")
      .addBearerAuth()
      .build(),
  );
  SwaggerModule.setup("api/docs", app, document);
  app.enableShutdownHooks();
  return app;
}

async function bootstrap(): Promise<void> {
  const app = await createApp();
  await app.listen(process.env["PORT"] ?? 3001);
}

if (process.env["NODE_ENV"] !== "test") {
  void bootstrap();
}
