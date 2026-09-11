import { Controller, Get, Module } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import type { NestExpressApplication } from "@nestjs/platform-express";

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
})
export class AppModule {}

export async function createApp(): Promise<NestExpressApplication> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
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
