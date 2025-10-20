import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTasks = async (req: Request, res: Response) => {
  const tasks = await prisma.task.findMany({ where: { userId: req.userId } });
  res.json(tasks);
};

export const createTask = async (req: Request, res: Response) => {
  const { title } = req.body;
  const task = await prisma.task.create({
    data: { title, userId: req.userId! },
  });
  res.json(task);
};

export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  const updated = await prisma.task.updateMany({
    where: { id: Number(id), userId: req.userId },
    data: { title, completed },
  });

  if (updated.count === 0) return res.status(404).json({ error: "Tarefa não encontrada" });
  res.json({ message: "Tarefa atualizada" });
};

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;

  const deleted = await prisma.task.deleteMany({
    where: { id: Number(id), userId: req.userId },
  });

  if (deleted.count === 0) return res.status(404).json({ error: "Tarefa não encontrada" });
  res.json({ message: "Tarefa excluída" });
};
