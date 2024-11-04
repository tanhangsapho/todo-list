import React from "react";
import { ListTodo, Menu, Star } from "lucide-react";

interface HeaderProps {
  activeSection: "tasks" | "important";
  onMenuClick: () => void; // New prop for opening the sidebar
}

const Header: React.FC<HeaderProps> = ({ activeSection, onMenuClick }) => {
  return (
    <div className="bg-white border-b p-4 flex items-center gap-4">
      {/* Burger menu button */}
      <button className="md:hidden" onClick={onMenuClick}>
        <Menu className="w-6 h-6" />
      </button>

      <div className="flex items-center gap-2">
        {activeSection === "tasks" ? (
          <ListTodo className="w-6 h-6 text-blue-600" />
        ) : activeSection === "important" ? (
          <Star className="w-6 h-6 text-yellow-500" />
        ) : (
          <ListTodo className="w-6 h-6 text-blue-600" />
        )}
        <h1 className="text-xl font-semibold">
          {activeSection === "tasks"
            ? "Tasks"
            : activeSection === "important"
            ? "Important"
            : "Tasks"}
        </h1>
      </div>
    </div>
  );
};

export default Header;
