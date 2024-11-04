import { Plus } from "lucide-react";
import { TodoInputProps } from "../@types/props";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import Input from "../ui/input";

export const TodoInput: React.FC<TodoInputProps> = ({
  value,
  onChange,
  onSubmit,
}) => {
  return (
    <Card className="mb-4 shadow-none border-none">
      <form onSubmit={onSubmit} className="p-4 flex gap-2">
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Add a task"
          className="flex-1"
        />
        <Button type="submit">
          <Plus className="w-4 h-4 mr-2" />
          Add
        </Button>
      </form>
    </Card>
  );
};
