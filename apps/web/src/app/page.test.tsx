import { renderToStaticMarkup } from "react-dom/server";
import HomePage from "./page.js";

describe("home page smoke test", () => {
  it("renders the operator account entry point", () => {
    expect(renderToStaticMarkup(<HomePage />)).toContain("Crear cuenta");
  });
});
