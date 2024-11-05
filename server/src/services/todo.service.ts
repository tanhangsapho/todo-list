import { inject, injectable } from "tsyringe";
import { TodoRepository } from "../database/repositories/todo.repo";
import { IUpdate, Todo } from "../database/repositories/@types/todo.type";
@injectable()
export class TodoService {
  constructor(@inject(TodoRepository) private todoRepo: TodoRepository) {}
  create(todo: Todo) {
    return this.todoRepo.create(todo);
  }
  getTodos() {
    return this.todoRepo.findAll();
  }
  getById(id: string) {
    return this.todoRepo.findbyId(id);
  }
  updateTodo(id: string, updates: IUpdate) {
    return this.todoRepo.update(id, updates);
  }

  deleteTodo(id: string) {
    return this.todoRepo.delete(id);
  }
}
