import request from "supertest";
import { createApp } from "./main.js";

describe("API smoke test", () => {
  it("serves health and readiness endpoints", async () => {
    const app = await createApp();
    await app.init();

    await request(app.getHttpServer()).get("/health").expect(200, { status: "ok" });
    await request(app.getHttpServer()).get("/ready").expect(200, { status: "ready" });

    await app.close();
  });
});
