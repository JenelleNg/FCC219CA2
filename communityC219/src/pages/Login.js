import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
  e.preventDefault();
  setBusy(true);
  setError("");
  try {
    const data = await login({ username, password });
    localStorage.setItem("token", data.token);
    localStorage.setItem("username", username);
    navigate("/posts");
  } catch (e) {
    console.error("Login failed", e);
    setError(e.message);
  } finally {
    setBusy(false);
  }
}

  return (
    <main>
      <div className="page">
        <h2 className="page__title">Login</h2>

        <form className="form cardbox" onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Username</label>
            <input
              className="input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label className="label">Password</label>
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <div className="alert alert--error">{error}</div>}

          <div className="actions">
            <button className="btn btn--primary" disabled={busy} type="submit">
              {busy ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}