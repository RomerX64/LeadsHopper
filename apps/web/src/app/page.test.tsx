import { renderToStaticMarkup } from "react-dom/server";
import HomePage from "./page.js";

describe("home page smoke test", () => {
  it("renders the foundation message", () => {
    expect(renderToStaticMarkup(<HomePage />)).toContain("Foundation ready.");
  });
});
