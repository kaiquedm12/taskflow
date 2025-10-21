import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch {
      alert("E-mail ou senha incorretos");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Entrar</button>
        </form>
        <div className="link">
          <Link to="/register">Não tem conta? Cadastre-se</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
