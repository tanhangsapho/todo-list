import { Star, Trash2 } from "lucide-react";
import React, { useMemo } from "react";
import { Todo } from "../@types/todo";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

interface TodoItemProps {
  todo: Todo;
  onToggleComplete: (id: string) => void;
  onToggleImportant: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggleComplete,
  onToggleImportant,
  onDelete,
}) => {
  const starButtonClass = useMemo(
    () => (todo.isImportant ? "text-yellow-500" : "text-gray-400"),
    [todo.isImportant]
  );

  return (
    <Card className="p-3">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggleComplete(todo.id)}
          className="w-4 h-4 text-green-500 border-gray-400 rounded"
        />

        <span
          className={`flex-1 ${
            todo.completed ? "line-through text-gray-400" : ""
          }`}
        >
          {todo.text}
        </span>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => onToggleImportant(todo.id)}
          className={starButtonClass}
        >
          <Star className="w-4 h-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(todo.id)}
          className="text-red-500 hover:text-red-600"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
};
