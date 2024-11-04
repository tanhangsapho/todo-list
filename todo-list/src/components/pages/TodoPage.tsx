"use client";
import { useState } from "react";
import { Todo } from "../@types/todo";
import { Sidebar } from "../templates/Sidebar";
import Header from "../templates/Header";
import { TodoInput } from "../templates/TodoInput";
import { TodoList } from "../templates/TodoList";

export const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [activeSection, setActiveSection] = useState<"tasks" | "important">(
    "tasks"
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar visibility state

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    const todo: Todo = {
      id: crypto.randomUUID(),
      text: newTodo.trim(),
      completed: false,
      isImportant: false,
      createdAt: new Date(),
    };

    setTodos((prev) => [todo, ...prev]);
    setNewTodo("");
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const toggleImportant = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isImportant: !todo.isImportant } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const filteredTodos = todos.filter((todo) =>
    activeSection === "important" ? todo.isImportant : true
  );

  const tasksCount = todos.filter((t) => !t.completed).length;
  const importantCount = todos.filter(
    (t) => t.isImportant && !t.completed
  ).length;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar with responsive toggle */}
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
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
