"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "./Toast";

export default function DeleteTaskButton({ taskId }: { taskId: number }) {
  const router = useRouter();
  const [isConfirming, setIsConfirming] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/tasks/${taskId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      toast("Task deleted successfully");
      router.push("/");
      router.refresh();
    } catch {
      toast("Failed to delete task", "error");
      setIsDeleting(false);
      setIsConfirming(false);
    }
  }

  if (isConfirming) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-red-600 dark:text-red-400">Delete this task?</span>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="px-3 py-1.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 disabled:opacity-50 rounded-xl shadow-lg shadow-red-500/25 transition-all duration-200"
        >
          {isDeleting ? "Deleting..." : "Yes, delete"}
        </button>
        <button
          onClick={() => setIsConfirming(false)}
          className="px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 glass rounded-xl hover:shadow-md transition-all duration-200"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setIsConfirming(true)}
      className="px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 glass rounded-xl hover:shadow-md transition-all duration-200"
    >
      Delete
    </button>
  );
}
