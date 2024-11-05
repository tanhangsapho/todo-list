import { inject, injectable } from "tsyringe";
import { TodoService } from "../services/todo.service";
import { Request, Response } from "express";
import { StatusCode } from "../utils/configs/status-code";
@injectable()
export class TodoController {
  constructor(@inject(TodoService) private todoService: TodoService) {}
  async create(req: Request, res: Response): Promise<any> {
    try {
      const { text, completed, isImportant } = req.body;
      if (!text) {
        return res
          .status(StatusCode.BadRequest)
          .send({ message: "Todo text is required" });
      }

      const newTodo = await this.todoService.create({
        text,
        completed: completed || false,
        isImportant: isImportant || false,
      });
      return res
        .status(StatusCode.Created)
        .json({ message: "Create Successfully", data: newTodo });
    } catch (error) {
      console.error("error", error);
      return res
        .status(StatusCode.InternalServerError)
        .send({ message: "An error occurred while creating the Todo" });
    }
  }
  async getTodos(req: Request, res: Response) {
    const todos = await this.todoService.getTodos();
    res
      .status(StatusCode.OK)
      .json({ message: "Get All Successfully", data: todos });
  }
  async getById(req: Request, res: Response) {
    const { id } = req.params;
    const todo = await this.todoService.getById(id);
    res.status(StatusCode.OK).json({ message: "Get Successfully", data: todo });
  }
  async updateTodo(req: Request, res: Response) {
    const { id } = req.params;
    const { todo } = req.body;
    const todoList = await this.todoService.updateTodo(id, todo);
    res
      .status(StatusCode.OK)
      .json({ message: "Update Successfully", data: todoList });
  }
  async deleteTodo(req: Request, res: Response) {
    const { id } = req.params;
    const todoList = await this.todoService.deleteTodo(id);
    res
      .status(StatusCode.OK)
      .json({ message: "Delete Successfully", data: todoList });
  }
}
