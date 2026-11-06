"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";

type User = {
  id: string;
  email: string;
  displayName: string;
  createdAt: string;
  updatedAt: string;
};
const api = process.env["NEXT_PUBLIC_API_URL"] ?? "http://127.0.0.1:3001";

export default function HomePage() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [mode, setMode] = useState<"register" | "login">("register");
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({ email: "", displayName: "", password: "" });

  useEffect(() => {
    const storedToken = window.localStorage.getItem("leadhopper.token");
    if (!storedToken) return;
    setToken(storedToken);
    void loadUser(storedToken);
  }, []);

  async function loadUser(authToken: string): Promise<void> {
    const response = await fetch(`${api}/api/v1/users/me`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    if (!response.ok) {
      window.localStorage.removeItem("leadhopper.token");
      setToken("");
      return;
    }
    setUser((await response.json()) as User);
  }

  async function submit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setMessage("");
    const endpoint = mode === "register" ? "/api/v1/users/register" : "/api/v1/auth/login";
    const payload = mode === "register" ? form : { email: form.email, password: form.password };
    const response = await fetch(`${api}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      setMessage("No se pudo completar la operación. Revisa los datos e inténtalo de nuevo.");
      return;
    }
    const result = (await response.json()) as { token?: string; user?: User };
    if (mode === "register") {
      setMessage("Cuenta creada. Inicia sesión para continuar.");
      setMode("login");
      return;
    }
    if (!result.token || !result.user) return;
    window.localStorage.setItem("leadhopper.token", result.token);
    setToken(result.token);
    setUser(result.user);
  }

  async function logout(): Promise<void> {
    await fetch(`${api}/api/v1/auth/logout`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    window.localStorage.removeItem("leadhopper.token");
    setToken("");
    setUser(null);
  }

  if (user) {
    return (
      <main className="shell">
        <header className="topbar">
          <div className="brand">
            <span className="brand-mark">L</span>
            <span>LeadHopper</span>
          </div>
          <button className="quiet-button" onClick={() => void logout()}>
            Cerrar sesión
          </button>
        </header>
        <section className="workspace">
          <p className="eyebrow">Operator console / account</p>
          <h1>Tu espacio de prospección.</h1>
          <p className="lede">
            La cuenta está lista. Desde aquí podrás configurar búsquedas y conservar cada retorno
            crudo.
          </p>
          <article className="account-card">
            <div className="avatar">{user.displayName.slice(0, 1).toUpperCase()}</div>
            <div>
              <p className="card-label">Cuenta activa</p>
              <h2>{user.displayName}</h2>
              <p>{user.email}</p>
            </div>
            <span className="status-pill">● Local</span>
          </article>
          <div className="next-step">
            <span>Próximo módulo</span>
            <a className="next-step-link" href="/search">
              <strong>Descubrimiento de leads</strong>
            </a>
            <span className="arrow">↗</span>
          </div>
          <nav className="account-nav">
            <a href="/search">Nueva búsqueda</a>
            <a href="/runs">Historial de búsquedas</a>
          </nav>
        </section>
      </main>
    );
  }

  return (
    <main className="shell auth-shell">
      <div className="auth-intro">
        <div className="brand">
          <span className="brand-mark">L</span>
          <span>LeadHopper</span>
        </div>
        <p className="eyebrow">Raw discovery, made useful</p>
        <h1>
          Encuentra el siguiente <em>sí.</em>
        </h1>
        <p className="lede">
          Una consola local para descubrir negocios en tu región y trabajar con datos reales, sin
          ruido.
        </p>
        <div className="signal">
          <span className="signal-dot" /> Single-tenant · Open source · Built for focus
        </div>
      </div>
      <section className="auth-card">
        <div className="tabs">
          <button
            className={mode === "register" ? "active" : ""}
            onClick={() => setMode("register")}
          >
            Crear cuenta
          </button>
          <button className={mode === "login" ? "active" : ""} onClick={() => setMode("login")}>
            Iniciar sesión
          </button>
        </div>
        <h2>{mode === "register" ? "Configura tu operador" : "Bienvenido de nuevo"}</h2>
        <p className="card-copy">
          {mode === "register"
            ? "Será la única cuenta de esta instalación."
            : "Accede a tu consola de descubrimiento."}
        </p>
        <form onSubmit={submit}>
          {mode === "register" && (
            <label>
              Nombre visible
              <input
                required
                minLength={2}
                value={form.displayName}
                onChange={(event) => setForm({ ...form, displayName: event.target.value })}
              />
            </label>
          )}
          <label>
            Email
            <input
              required
              type="email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
            />
          </label>
          <label>
            Contraseña
            <input
              required
              minLength={8}
              type="password"
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
            />
          </label>
          <button className="primary-button" type="submit">
            {mode === "register" ? "Crear cuenta" : "Entrar"} <span>↗</span>
          </button>
        </form>
        {message && (
          <p className="form-message" role="alert">
            {message}
          </p>
        )}
      </section>
    </main>
  );
}
