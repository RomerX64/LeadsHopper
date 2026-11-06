import { expect, test } from "@playwright/test";

test("foundation web page and API health are available", async ({ page, request }) => {
  await page.goto("/");
  await expect(page.getByText("Encuentra el siguiente", { exact: false })).toBeVisible();
  await expect(page.getByRole("button", { name: "Crear cuenta", exact: true })).toBeVisible();

  const health = await request.get("http://127.0.0.1:3101/health");
  expect(health.ok()).toBe(true);
  expect(await health.json()).toEqual({ status: "ok" });
});
