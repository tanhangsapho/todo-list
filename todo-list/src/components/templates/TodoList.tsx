import { useState } from "react";
import { Todo } from "../@types/todo";
import { TodoItem } from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
  onToggleComplete: (id: string) => void;
  onToggleImportant: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  onToggleComplete,
  onToggleImportant,
  onDelete,
}) => {
  const [showCompleted, setShowCompleted] = useState(false);

  const incompleteTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <div className="space-y-2">
      {/* Incomplete Todos */}
      {incompleteTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleComplete={onToggleComplete}
          onToggleImportant={onToggleImportant}
          onDelete={onDelete}
        />
      ))}

      {completedTodos.length > 0 && (
        <div>
          <button
            onClick={() => setShowCompleted((prev) => !prev)}
            className={`flex items-center text-gray-600 hover:text-blue-500 transition-colors duration-200`}
          >
            {showCompleted ? "▾" : "▸"}{" "}
            <span className="ml-2">Completed {completedTodos.length}</span>
          </button>

          {showCompleted && (
            <div className="mt-2 space-y-2">
              {completedTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggleComplete={onToggleComplete}
                  onToggleImportant={onToggleImportant}
                  onDelete={onDelete}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
