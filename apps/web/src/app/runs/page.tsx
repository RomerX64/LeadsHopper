"use client";

import { useEffect, useState } from "react";

type Run = {
  id: string;
  category: string;
  region: string;
  limit: number;
  status: string;
  results: unknown[];
  error: string | null;
  createdAt: string;
};

const api = process.env["NEXT_PUBLIC_API_URL"] ?? "http://127.0.0.1:3001";

export default function RunsPage() {
  const [runs, setRuns] = useState<Run[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = window.localStorage.getItem("leadhopper.token");
    if (!token) {
      setError("Inicia sesión antes de consultar el historial.");
      return;
    }
    fetch(`${api}/api/v1/discovery/runs`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (response) => {
        if (!response.ok) throw new Error("No se pudo cargar el historial.");
        return (await response.json()) as Run[];
      })
      .then(setRuns)
      .catch((reason: Error) => setError(reason.message));
  }, []);

  return (
    <main className="shell">
      <header className="topbar">
        <a className="brand" href="/">
          <span className="brand-mark">L</span>
          <span>LeadHopper</span>
        </a>
        <nav className="topnav">
          <a href="/search">Nueva búsqueda</a>
          <a className="nav-active" href="/runs">
            Historial
          </a>
        </nav>
      </header>
      <section className="workspace search-workspace">
        <p className="eyebrow">Discovery / history</p>
        <h1>Tu historial de búsquedas.</h1>
        <p className="lede">Cada ejecución conserva el retorno crudo durante 30 días.</p>
        {error && (
          <p className="form-message" role="alert">
            {error}
          </p>
        )}
        {!error && runs.length === 0 && <p className="empty-state">Todavía no hay ejecuciones.</p>}
        {runs.length > 0 && (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Categoría</th>
                  <th>Región</th>
                  <th>Resultados</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {runs.map((run) => (
                  <tr key={run.id}>
                    <td>
                      <a href={`/runs/${run.id}`}>{new Date(run.createdAt).toLocaleString()}</a>
                    </td>
                    <td>{run.category}</td>
                    <td>{run.region}</td>
                    <td>{run.results.length}</td>
                    <td>
                      <span className={`run-status ${run.status}`}>{run.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
