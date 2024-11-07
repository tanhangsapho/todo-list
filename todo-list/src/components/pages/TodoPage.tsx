"use client";
import { useEffect, useState } from "react";
import { Todo } from "../@types/todo";
import { Sidebar } from "../templates/Sidebar";
import Header from "../templates/Header";
import { TodoInput } from "../templates/TodoInput";
import { TodoList } from "../templates/TodoList";
import { todoApi } from "@/lib/api";

export const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newTodo, setNewTodo] = useState("");
  const [activeSection, setActiveSection] = useState<"tasks" | "important">(
    "tasks"
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      const todo: Todo = {
        text: newTodo.trim(),
        completed: false,
        isImportant: false,
        createdAt: new Date(),
      };
      const createdTodo = await todoApi.createTodo(todo);

      console.log("Created Todo:", createdTodo); // Check if `_id` is present

      setTodos((prev) => [createdTodo.data.data, ...prev]);
      setNewTodo("");
    } catch (error) {
      console.error("Failed to create todo:", error);
      setError("Failed to create todo");
    }
  };

  const toggleTodo = async (id: string) => {
    try {
      const todo = todos.find((t) => t._id === id);
      if (!todo) return;

      const updatedTodo = { ...todo, completed: !todo.completed };
      await todoApi.updateTodo(id, updatedTodo);

      // Update the state after successful API call
      setTodos((prev) => prev.map((t) => (t._id === id ? updatedTodo : t)));
    } catch (error) {
      console.error("Failed to update todo:", error);
      setError("Failed to update todo");
    }
  };

  const toggleImportant = async (id: string) => {
    try {
      const todo = todos.find((t) => t._id === id);
      if (!todo) return;

      const updatedTodo = { ...todo, isImportant: !todo.isImportant };
      await todoApi.updateTodo(id, updatedTodo);

      setTodos((prev) => prev.map((t) => (t._id === id ? updatedTodo : t)));
    } catch (error) {
      console.error("Failed to update todo:", error);
      setError("Failed to update todo");
    }
  };
  const deleteTodo = async (id: string) => {
    try {
      // Immediately remove the todo from the state for better UI responsiveness
      setTodos((prev) => prev.filter((todo) => todo._id !== id));

      // Then make the API call to delete it from the backend
      await todoApi.deleteTodo(id);
    } catch (error) {
      console.error("Failed to delete todo:", error);
      setError("Failed to delete todo");

      // Optionally: Revert the state if the API call fails
      const todosData = await todoApi.getTodo();

      // Use `Todo[]` explicitly to ensure TypeScript recognizes this correctly
      const todos: Todo[] = todosData.data?.data || [];
      setTodos(todos);
    }
  };

  useEffect(() => {
    async function fetchTodos() {
      setIsLoading(true);
      try {
        const response = await todoApi.getTodo();
        const todosData = response.data?.data || [];
        console.log("todosData", todosData);
        if (Array.isArray(todosData)) {
          setTodos(todosData);
        } else {
          console.error("Invalid todos data format");
          setTodos([]);
        }
      } catch (error) {
        console.error("Failed to fetch todos:", error);
        setError("Failed to fetch todos");
        setTodos([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTodos();
  }, []);

  const filteredTodos = Array.isArray(todos)
    ? todos.filter((todo) =>
        activeSection === "important" ? todo.isImportant : true
      )
    : [];

  const tasksCount = Array.isArray(todos)
    ? todos.filter((t) => !t.completed).length
    : 0;

  const importantCount = Array.isArray(todos)
    ? todos.filter((t) => t.isImportant && !t.completed).length
    : 0;

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        activeSection={activeSection}
        tasksCount={tasksCount}
        importantCount={importantCount}
        onSectionChange={setActiveSection}
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
      />

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Header activeSection={activeSection} onMenuClick={toggleSidebar} />

        <div className="flex-1 flex flex-col overflow-hidden">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 text-sm">{error}</div>
          )}

          <div className="flex-1 overflow-y-auto p-4">
            <TodoList
              todos={filteredTodos}
              onToggleComplete={toggleTodo}
              onToggleImportant={toggleImportant}
              onDelete={deleteTodo}
            />
          </div>

          {activeSection === "tasks" && (
            <div className="border-t p-4 bg-white sticky bottom-0">
              <TodoInput
                value={newTodo}
                onChange={setNewTodo}
                onSubmit={addTodo}
                disabled={isLoading}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
