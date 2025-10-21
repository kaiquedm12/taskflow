import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import authRoutes from "./routes/authRoutes";
import taskRoutes from "./routes/taskRoutes";
import { withAccelerate } from '@prisma/extension-accelerate';

dotenv.config();
const app = express();
const prisma = new PrismaClient().$extends(withAccelerate());

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

app.listen(3000, () => console.log("🚀 Server running on http://localhost:3000"));
