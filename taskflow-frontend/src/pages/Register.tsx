import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", { name, email, password });
      alert("Usuário cadastrado com sucesso!");
      navigate("/");
    } catch {
      alert("Erro ao cadastrar usuário");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Cadastro</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <button type="submit">Cadastrar</button>
        </form>
        <div className="link">
          <Link to="/">Já tem conta? Fazer login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
