import { Todo } from "@/components/@types/todo";
import axios from "axios";
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const todoApi = {
  getTodo: () => api.get<ApiResponse<Todo[]>>("/todos"), // Make sure this returns ApiResponse<Todo[]>
  createTodo: (todoData: Todo) =>
    api.post<ApiResponse<Todo>>("/todos", todoData),
  updateTodo: (id: string, todoData: Todo) =>
    api.put<ApiResponse<Todo>>(`/todos/${id}`, todoData),
  deleteTodo: (id: string) => api.delete<ApiResponse<void>>(`/todos/${id}`),
};
