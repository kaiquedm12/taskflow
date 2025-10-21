import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const fetchTasks = async () => {
    const res = await api.get("/tasks", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAdd = async () => {
    if (!title.trim()) return;
    await api.post("/tasks", { title }, { headers: { Authorization: `Bearer ${token}` } });
    setTitle("");
    fetchTasks();
  };

  const toggleTask = async (id: number, completed: boolean) => {
    await api.put(`/tasks/${id}`, { completed: !completed }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchTasks();
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="container">
      <div className="card" style={{ width: "400px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
          <h2>Tarefas</h2>
          <button onClick={logout} style={{ backgroundColor: "red" }}>
            Sair
          </button>
        </div>
        <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
          <input
            placeholder="Nova tarefa..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button onClick={handleAdd}>+</button>
        </div>
        <ul>
          {tasks.map((task) => (
            <li
              key={task.id}
              onClick={() => toggleTask(task.id, task.completed)}
              style={{
                textDecoration: task.completed ? "line-through" : "none",
                marginBottom: "5px",
                cursor: "pointer",
              }}
            >
              {task.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
