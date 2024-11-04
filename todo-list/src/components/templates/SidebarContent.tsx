import { ListTodo, Star } from "lucide-react";
import { SidebarProps } from "../@types/props";
import { Badge } from "../ui/badge";

const SidebarContent: React.FC<Omit<SidebarProps, "isOpen" | "onClose">> = ({
  activeSection,
  tasksCount,
  importantCount,
  onSectionChange,
}) => (
  <div className="p-4">
    <div
      className={`flex items-center gap-2 cursor-pointer p-2 rounded-lg ${
        activeSection === "tasks"
          ? "bg-blue-50 text-blue-600"
          : "hover:bg-gray-100"
      }`}
      onClick={() => onSectionChange("tasks")}
    >
      <ListTodo className="w-5 h-5" />
      <span className="font-medium">Tasks</span>

      <Badge variant="outline" className="ml-auto">
        {tasksCount}
      </Badge>
    </div>
    <div
      className={`flex items-center gap-2 cursor-pointer p-2 rounded-lg mt-1 ${
        activeSection === "important"
          ? "bg-blue-50 text-blue-600"
          : "hover:bg-gray-100"
      }`}
      onClick={() => onSectionChange("important")}
    >
      <Star className="w-5 h-5" />
      <span className="font-medium">Important</span>
      <Badge variant="secondary" className="ml-auto">
        {importantCount}
      </Badge>
    </div>
  </div>
);

export default SidebarContent;
