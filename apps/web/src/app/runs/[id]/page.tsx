"use client";

import { useEffect, useState } from "react";

type Run = {
  id: string;
  category: string;
  region: string;
  status: string;
  results: unknown[];
  error: string | null;
  createdAt: string;
};

const api = process.env["NEXT_PUBLIC_API_URL"] ?? "http://127.0.0.1:3001";

export default function RunPage({ params }: { params: Promise<{ id: string }> }) {
  const [run, setRun] = useState<Run | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    void params.then(({ id }) => {
      const token = window.localStorage.getItem("leadhopper.token");
      if (!token) {
        setError("Inicia sesión antes de consultar una ejecución.");
        return;
      }
      fetch(`${api}/api/v1/discovery/runs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(async (response) => {
          if (!response.ok) throw new Error("No se pudo cargar la ejecución.");
          return (await response.json()) as Run;
        })
        .then(setRun)
        .catch((reason: Error) => setError(reason.message));
    });
  }, [params]);

  return (
    <main className="shell">
      <header className="topbar">
        <a className="brand" href="/runs">
          <span className="brand-mark">L</span>
          <span>LeadHopper</span>
        </a>
        <a className="quiet-button" href="/search">
          Nueva búsqueda
        </a>
      </header>
      <section className="workspace search-workspace">
        <a className="back-link" href="/runs">
          ← Historial
        </a>
        <p className="eyebrow">Discovery / run</p>
        {error && (
          <p className="form-message" role="alert">
            {error}
          </p>
        )}
        {run && (
          <>
            <h1>
              {run.category} en {run.region}.
            </h1>
            <p className="lede">
              {new Date(run.createdAt).toLocaleString()} · {run.results.length} resultados ·{" "}
              {run.status}
            </p>
            {run.error && (
              <p className="form-message" role="alert">
                {run.error}
              </p>
            )}
            <pre className="json-output">
              <code>{JSON.stringify(run.results, null, 2)}</code>
            </pre>
          </>
        )}
      </section>
    </main>
  );
}
