import { injectable } from "tsyringe";
import { TodoModel } from "../models/todo.model";
import { IUpdate, Todo } from "./@types/todo.type";

@injectable()
export class TodoRepository {
  async create(todoData: Todo) {
    console.log("Creating Todo with data:", todoData); // Debugging line
    return await TodoModel.create(todoData);
  }

  async findAll() {
    return await TodoModel.find();
  }
  async findbyId(id: string) {
    return await TodoModel.findById(id);
  }
  async update(id: string, updateData: IUpdate) {
    return await TodoModel.findByIdAndUpdate(id, updateData, { new: true });
  }

  async delete(id: string) {
    return await TodoModel.findByIdAndDelete(id);
  }
}
