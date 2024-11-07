import { inject, injectable } from "tsyringe";
import { TodoService } from "../services/todo.service";
import { Request, Response } from "express";
import { StatusCode } from "../utils/configs/status-code";

interface TodoRequest {
  text: string;
  completed?: boolean;
  isImportant?: boolean;
}

@injectable()
export class TodoController {
  constructor(@inject(TodoService) private readonly todoService: TodoService) {}

  async create(req: Request, res: Response): Promise<any> {
    try {
      const {
        text,
        completed = false,
        isImportant = false,
      }: TodoRequest = req.body;

      if (!text?.trim()) {
        return res.status(StatusCode.BadRequest).json({
          success: false,
          message: "Todo text is required and cannot be empty",
        });
      }

      const newTodo = await this.todoService.create({
        text: text.trim(),
        completed,
        isImportant,
      });

      return res.status(StatusCode.Created).json({
        success: true,
        message: "Todo created successfully",
        data: newTodo,
      });
    } catch (error) {
      console.error("[TodoController] Create error:", error);
      return this.handleError(res, error);
    }
  }

  async getTodos(req: Request, res: Response): Promise<any> {
    try {
      const todos = await this.todoService.getTodos();

      return res.status(StatusCode.OK).json({
        success: true,
        message: "Todos retrieved successfully",
        data: todos,
      });
    } catch (error) {
      console.error("[TodoController] GetAll error:", error);
      return this.handleError(res, error);
    }
  }

  async getById(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(StatusCode.BadRequest).json({
          success: false,
          message: "Todo ID is required",
        });
      }

      const todo = await this.todoService.getById(id);

      if (!todo) {
        return res.status(StatusCode.NotFound).json({
          success: false,
          message: `Todo with id ${id} not found`,
        });
      }

      return res.status(StatusCode.OK).json({
        success: true,
        message: "Todo retrieved successfully",
        data: todo,
      });
    } catch (error) {
      console.error("[TodoController] GetById error:", error);
      return this.handleError(res, error);
    }
  }

  async updateTodo(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const todoUpdate = req.body;

      if (!id) {
        return res.status(StatusCode.BadRequest).json({
          success: false,
          message: "Todo ID is required",
        });
      }

      if (Object.keys(todoUpdate).length === 0) {
        return res.status(StatusCode.BadRequest).json({
          success: false,
          message: "Update data is required",
        });
      }

      const updatedTodo = await this.todoService.updateTodo(id, todoUpdate);

      if (!updatedTodo) {
        return res.status(StatusCode.NotFound).json({
          success: false,
          message: `Todo with id ${id} not found`,
        });
      }

      return res.status(StatusCode.OK).json({
        success: true,
        message: "Todo updated successfully",
        data: updatedTodo,
      });
    } catch (error) {
      console.error("[TodoController] Update error:", error);
      return this.handleError(res, error);
    }
  }

  async deleteTodo(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;

      if (!id) {
        console.log("[TodoController] Delete error:", "Todo ID is required");
        return res.status(StatusCode.BadRequest).json({
          success: false,
          message: "Todo ID is required",
        });
      }

      const result = await this.todoService.deleteTodo(id);

      if (!result) {
        return res.status(StatusCode.NotFound).json({
          success: false,
          message: `Todo with id ${id} not found`,
        });
      }

      return res.status(StatusCode.OK).json({
        success: true,
        message: "Todo deleted successfully",
      });
    } catch (error) {
      console.error("[TodoController] Delete error:", error);
      return this.handleError(res, error);
    }
  }

  private handleError(res: Response, error: unknown) {
    return res.status(StatusCode.InternalServerError).json({
      success: false,
      message: "An internal server error occurred",
      error: process.env.NODE_ENV === "development" ? error : undefined,
    });
  }
}
