import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { getTasks, createTask, updateTask, deleteTask } from "../controllers/taskController";

const router = Router();

router.post("/", authMiddleware, createTask);
router.get("/", authMiddleware, getTasks);
router.put("/:id", authMiddleware, updateTask);
router.delete("/:id", authMiddleware, deleteTask);

export default router;
