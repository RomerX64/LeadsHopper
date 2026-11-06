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

  it("supports the complete operator account flow without exposing the password hash", async () => {
    const app = await createApp();
    await app.init();
    const server = app.getHttpServer();

    await request(server)
      .post("/api/v1/users/register")
      .send({ email: "owner@example.com", displayName: "Owner", password: "LeadHopper!2025" })
      .expect(201)
      .expect(({ body }) => {
        expect(body.email).toBe("owner@example.com");
        expect(body.displayName).toBe("Owner");
        expect(body.passwordHash).toBeUndefined();
      });

    const login = await request(server)
      .post("/api/v1/auth/login")
      .send({ email: "owner@example.com", password: "LeadHopper!2025" })
      .expect(200);
    const token = login.body.token as string;
    expect(token).toHaveLength(64);

    await request(server)
      .get("/api/v1/users/me")
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .expect(({ body }) => expect(body.email).toBe("owner@example.com"));

    await request(server)
      .post("/api/v1/auth/logout")
      .set("Authorization", `Bearer ${token}`)
      .expect(204);
    await request(server)
      .get("/api/v1/users/me")
      .set("Authorization", `Bearer ${token}`)
      .expect(401);

    await app.close();
  });

  it("protects discovery and returns raw fixture results for Alta Gracia", async () => {
    const app = await createApp();
    await app.init();
    const server = app.getHttpServer();

    await request(server)
      .post("/api/v1/discovery/search")
      .send({ category: "restaurantes", region: "Alta Gracia, Córdoba", limit: 10 })
      .expect(401);

    await request(server)
      .post("/api/v1/users/register")
      .send({
        email: "discovery@example.com",
        displayName: "Discovery",
        password: "LeadHopper!2025",
      })
      .expect(201);
    const login = await request(server)
      .post("/api/v1/auth/login")
      .send({ email: "discovery@example.com", password: "LeadHopper!2025" })
      .expect(200);

    const search = await request(server)
      .post("/api/v1/discovery/search")
      .set("Authorization", `Bearer ${login.body.token as string}`)
      .send({ category: "restaurantes", region: "Alta Gracia, Córdoba", limit: 10 })
      .expect(201)
      .expect(({ body }) => {
        expect(body.status).toBe("completed");
        expect(body.results).toHaveLength(2);
        expect(body.results[0].rawPayload).toEqual({
          id: "restaurant-1",
          title: "La Cocina de Alta Gracia",
        });
        expect(body.results[1].phone).toBeNull();
      });

    await request(server)
      .get("/api/v1/discovery/runs")
      .set("Authorization", `Bearer ${login.body.token as string}`)
      .expect(200)
      .expect(({ body }) => {
        expect(body).toHaveLength(1);
        expect(body[0].status).toBe("completed");
      });

    await request(server)
      .get(`/api/v1/discovery/runs/${search.body.id as string}`)
      .set("Authorization", `Bearer ${login.body.token as string}`)
      .expect(200)
      .expect(({ body }) => {
        expect(body.id).toBe(search.body.id);
        expect(body.results).toHaveLength(2);
      });

    await app.close();
  });
});
