import { test } from "@playwright/test";

test.describe("raw discovery MVP", () => {
  test.fixme("configures and executes a discovery search", async ({ page }) => {
    await page.goto("/search");
    await page.getByLabel("Category").fill("real estate");
    await page.getByLabel("Region").fill("Alta Gracia, Córdoba");
    await page.getByLabel("Source").selectOption("overpass");
    await page.getByLabel("Limit").fill("20");
    await page.getByRole("button", { name: "Run search" }).click();

    await page.getByRole("status").filter({ hasText: "completed" }).waitFor();
    await page.getByRole("link", { name: /view results/i }).click();
  });

  test.fixme("shows the same raw records as JSON and a table", async ({ page }) => {
    await page.goto("/runs/example");
    await page.getByRole("tab", { name: "Table" }).click();
    await page.getByRole("table").waitFor();
    await page.getByRole("tab", { name: "JSON" }).click();
    await page.getByRole("code").waitFor();
  });

  test.fixme("downloads the original JSON payload", async ({ page }) => {
    await page.goto("/runs/example");
    const download = page.waitForEvent("download");
    await page.getByRole("button", { name: /download json/i }).click();
    await download;
  });

  test.fixme("displays a classified source error instead of an empty result", async ({ page }) => {
    await page.goto("/search");
    await page.getByLabel("Source").selectOption("fixture-timeout");
    await page.getByRole("button", { name: "Run search" }).click();
    await page
      .getByRole("alert")
      .filter({ hasText: /timeout/i })
      .waitFor();
  });
});
