import { Response } from "express";
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import { AuthRequest } from "../middlewares/authMiddleware"; // ✅ Import correto

const prisma = new PrismaClient().$extends(withAccelerate());

export const getTasks = async (req: AuthRequest, res: Response): Promise<void> => {
  const tasks = await prisma.task.findMany({ where: { userId: req.userId! } });
  res.json(tasks);
};

export const createTask = async (req: AuthRequest, res: Response): Promise<void> => {
  const { title } = req.body;
  const task = await prisma.task.create({
    data: { title, userId: req.userId! },
  });
  res.json(task);
};

export const updateTask = async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  const { title, completed } = req.body;

  const updated = await prisma.task.updateMany({
    where: { id: Number(id), userId: req.userId! },
    data: { title, completed },
  });

  if (updated.count === 0) {
    res.status(404).json({ error: "Tarefa não encontrada" });
    return;
  }

  res.json({ message: "Tarefa atualizada" });
};

export const deleteTask = async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;

  const deleted = await prisma.task.deleteMany({
    where: { id: Number(id), userId: req.userId! },
  });

  if (deleted.count === 0) {
    res.status(404).json({ error: "Tarefa não encontrada" });
    return;
  }

  res.json({ message: "Tarefa excluída" });
};
