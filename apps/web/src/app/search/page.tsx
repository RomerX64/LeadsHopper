"use client";

import { useState } from "react";
import type { FormEvent } from "react";

type Lead = {
  name: string | null;
  category: string | null;
  address: string | null;
  phone: string | null;
  website: string | null;
  sourceUrl: string | null;
  rawPayload: unknown;
};
type SearchRun = { id: string; status: string; results: Lead[]; error: string | null };

const api = process.env["NEXT_PUBLIC_API_URL"] ?? "http://127.0.0.1:3001";

export default function SearchPage() {
  const [form, setForm] = useState({
    category: "restaurantes",
    region: "Alta Gracia, Córdoba",
    limit: "10",
  });
  const [results, setResults] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [view, setView] = useState<"table" | "json">("table");

  async function search(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setLoading(true);
    setError("");
    setResults([]);
    const token = window.localStorage.getItem("leadhopper.token");
    if (!token) {
      setError("Inicia sesión antes de ejecutar una búsqueda.");
      setLoading(false);
      return;
    }
    try {
      const response = await fetch(`${api}/api/v1/discovery/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...form, limit: Number(form.limit) }),
      });
      if (!response.ok) {
        setError(
          response.status === 401
            ? "Tu sesión expiró. Vuelve a iniciar sesión."
            : "La fuente no pudo completar la búsqueda.",
        );
        return;
      }
      const run = (await response.json()) as SearchRun;
      if (run.status === "failed") {
        setError(run.error ?? "La fuente no pudo completar la búsqueda.");
        return;
      }
      setResults(run.results);
    } catch {
      setError("No se pudo conectar con la API local.");
    } finally {
      setLoading(false);
    }
  }

  function download(): void {
    const blob = new Blob([JSON.stringify(results, null, 2)], { type: "application/json" });
    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = "leadhopper-results.json";
    link.click();
    URL.revokeObjectURL(href);
  }

  return (
    <main className="shell">
      <header className="topbar">
        <a className="brand" href="/">
          <span className="brand-mark">L</span>
          <span>LeadHopper</span>
        </a>
        <nav className="topnav">
          <a className="nav-active" href="/search">
            Nueva búsqueda
          </a>
          <a href="/runs">Historial</a>
        </nav>
      </header>
      <section className="workspace search-workspace">
        <p className="eyebrow">Discovery / new search</p>
        <h1>Encuentra negocios cerca.</h1>
        <p className="lede">
          Prueba una categoría y región. Conservamos el retorno original para que puedas revisarlo
          sin perder contexto.
        </p>
        <form className="search-form" onSubmit={search}>
          <label>
            Categoría
            <input
              aria-label="Category"
              value={form.category}
              onChange={(event) => setForm({ ...form, category: event.target.value })}
            />
          </label>
          <label>
            Región
            <input
              aria-label="Region"
              value={form.region}
              onChange={(event) => setForm({ ...form, region: event.target.value })}
            />
          </label>
          <label>
            Límite
            <input
              aria-label="Limit"
              type="number"
              min="1"
              max="10"
              value={form.limit}
              onChange={(event) => setForm({ ...form, limit: event.target.value })}
            />
          </label>
          <button className="primary-button" type="submit" disabled={loading}>
            {loading ? "Buscando..." : "Ejecutar búsqueda"} <span>↗</span>
          </button>
        </form>
        {error && (
          <p className="form-message" role="alert">
            {error}
          </p>
        )}
        <div className="results-heading">
          <div>
            <p className="card-label">Resultados</p>
            <h2>
              {results.length ? `${results.length} negocios encontrados` : "Sin ejecución todavía"}
            </h2>
          </div>
          {results.length > 0 && (
            <div className="result-actions">
              <button
                className={view === "table" ? "view-active" : ""}
                onClick={() => setView("table")}
              >
                Tabla
              </button>
              <button
                className={view === "json" ? "view-active" : ""}
                onClick={() => setView("json")}
              >
                JSON
              </button>
              <button onClick={download}>Descargar</button>
            </div>
          )}
        </div>
        {view === "table" && results.length > 0 && (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Negocio</th>
                  <th>Categoría</th>
                  <th>Dirección</th>
                  <th>Teléfono</th>
                  <th>Sitio</th>
                </tr>
              </thead>
              <tbody>
                {results.map((lead, index) => (
                  <tr key={`${lead.name ?? "lead"}-${index}`}>
                    <td>
                      <strong>{lead.name ?? "No disponible"}</strong>
                    </td>
                    <td>{lead.category ?? "No disponible"}</td>
                    <td>{lead.address ?? "No disponible"}</td>
                    <td>{lead.phone ?? "No disponible"}</td>
                    <td>
                      {lead.website ? (
                        <a href={lead.website} target="_blank" rel="noreferrer">
                          Abrir ↗
                        </a>
                      ) : (
                        "No disponible"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {view === "json" && results.length > 0 && (
          <pre className="json-output">
            <code>{JSON.stringify(results, null, 2)}</code>
          </pre>
        )}
      </section>
    </main>
  );
}
