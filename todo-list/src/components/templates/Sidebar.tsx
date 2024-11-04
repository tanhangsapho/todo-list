import React from "react";
import SidebarContent from "./SidebarContent";
import { X } from "lucide-react";

interface SidebarProps {
  activeSection: "tasks" | "important";
  tasksCount: number;
  importantCount: number;
  onSectionChange: (section: "tasks" | "important") => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  tasksCount,
  importantCount,
  onSectionChange,
  isOpen,
  onClose,
}) => {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={onClose}
        />
      )}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white p-4 border-r transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:block`}
      >
        <button
          className="absolute top-5 right-4 md:hidden"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>
        <div className="mb-6">
          <h2 className="flex justify-center text-xl font-semibold text-gray-800">
            Todo List
          </h2>
        </div>
        <SidebarContent
          activeSection={activeSection}
          tasksCount={tasksCount}
          importantCount={importantCount}
          onSectionChange={onSectionChange}
        />
      </div>
    </>
  );
};
