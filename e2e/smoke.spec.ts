import { expect, test } from "@playwright/test";

test("web home page and API health are available", async ({ page, request }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Foundation ready." })).toBeVisible();

  const health = await request.get("http://127.0.0.1:3001/health");
  expect(health.ok()).toBe(true);
  expect(await health.json()).toEqual({ status: "ok" });
});
