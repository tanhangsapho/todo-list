// src/routes/todo.routes.ts
import express from "express";
import { container } from "tsyringe";
import { TodoController } from "../controllers/todo.controller";
import { Request, Response } from "express";

// Create router and resolve controller
const todoRouter = express.Router();
const todoController = container.resolve(TodoController);

// Define routes
todoRouter.post("/todos", (req: Request, res: Response) => {
  return todoController.create(req, res);
});

todoRouter.get("/todos", (req: Request, res: Response) => {
  return todoController.getTodos(req, res);
});

todoRouter.get("/todos/:id", (req: Request, res: Response) => {
  return todoController.getById(req, res);
});

todoRouter.put("/todos/:id", (req: Request, res: Response) => {
  return todoController.updateTodo(req, res);
});

todoRouter.delete("/todos/:id", (req: Request, res: Response) => {
  return todoController.deleteTodo(req, res);
});

export default todoRouter;
