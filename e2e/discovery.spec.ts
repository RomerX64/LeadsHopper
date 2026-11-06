import { expect, test } from "@playwright/test";

test("operator can search, inspect and download leads", async ({ page }) => {
  const email = `operator-${Date.now()}@example.com`;
  const password = "LeadHopper!2025";

  await page.goto("/");
  await page.getByLabel("Nombre visible").fill("E2E Operator");
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Contraseña").fill(password);
  await page.locator("form").getByRole("button").click();
  await expect(page.getByText("Cuenta creada. Inicia sesión para continuar.")).toBeVisible();

  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Contraseña").fill(password);
  await page.locator("form").getByRole("button").click();
  await expect(page.getByText("Tu espacio de prospección.")).toBeVisible();

  await page.getByRole("link", { name: "Nueva búsqueda" }).first().click();
  await expect(page).toHaveURL(/\/search$/);
  await page.getByLabel("Category").fill("restaurantes");
  await page.getByLabel("Region").fill("Alta Gracia, Córdoba");
  await page.getByLabel("Limit").fill("10");
  await page.getByRole("button", { name: /Ejecutar búsqueda/ }).click();
  await expect(page.getByText("2 negocios encontrados")).toBeVisible();
  await expect(page.getByRole("table")).toContainText("La Cocina de Alta Gracia");

  const download = page.waitForEvent("download");
  await page.getByRole("button", { name: "Descargar" }).click();
  await expect((await download).suggestedFilename()).toBe("leadhopper-results.json");

  await page.getByRole("link", { name: "Historial" }).click();
  await expect(page).toHaveURL(/\/runs$/);
  await expect(page.getByRole("table")).toContainText("restaurantes");
  await page
    .getByRole("link", { name: /2026|2025|2024/ })
    .first()
    .click();
  await expect(page).toHaveURL(/\/runs\/.+/);
  await expect(page.getByRole("code")).toContainText("La Cocina de Alta Gracia");
});
