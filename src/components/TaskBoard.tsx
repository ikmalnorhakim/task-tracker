"use client";

import { useOptimistic, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { Task } from "@/types/task";
import { STATUS_LABELS, type TaskStatus } from "@/types/task";
import { groupTasksByStatus } from "@/lib/utils";
import TaskCard from "./TaskCard";
import { toast } from "./Toast";

const columnAccents: Record<TaskStatus, string> = {
  todo: "from-blue-500/20 to-transparent border-t-blue-500/60",
  in_progress: "from-amber-500/20 to-transparent border-t-amber-500/60",
  done: "from-emerald-500/20 to-transparent border-t-emerald-500/60",
};

const countColors: Record<TaskStatus, string> = {
  todo: "bg-blue-500/15 text-blue-700 dark:text-blue-300",
  in_progress: "bg-amber-500/15 text-amber-700 dark:text-amber-300",
  done: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
};

type OptimisticAction =
  | { type: "add"; task: Task }
  | { type: "update"; task: Task }
  | { type: "delete"; id: number };

function optimisticReducer(state: Task[], action: OptimisticAction): Task[] {
  switch (action.type) {
    case "add":
      return [...state, action.task];
    case "update":
      return state.map((t) => (t.id === action.task.id ? action.task : t));
    case "delete":
      return state.filter((t) => t.id !== action.id);
  }
}

export default function TaskBoard({ tasks }: { tasks: Task[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [optimisticTasks, addOptimistic] = useOptimistic(tasks, optimisticReducer);

  const grouped = groupTasksByStatus(optimisticTasks);

  async function handleStatusChange(task: Task, newStatus: string) {
    const updated = { ...task, status: newStatus, updatedAt: new Date() };
    startTransition(async () => {
      addOptimistic({ type: "update", task: updated });
      try {
        const res = await fetch(`/api/tasks/${task.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        });
        if (!res.ok) throw new Error("Failed to update");
        toast("Task moved successfully");
      } catch {
        toast("Failed to move task", "error");
      }
      router.refresh();
    });
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${isPending ? "opacity-80" : ""} transition-opacity`}>
      {(Object.entries(grouped) as [TaskStatus, Task[]][]).map(
        ([status, statusTasks]) => (
          <div
            key={status}
            className={`glass rounded-2xl border-t-4 p-4 min-h-[200px] bg-gradient-to-b ${columnAccents[status]} shadow-lg`}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-800 dark:text-gray-200">
                {STATUS_LABELS[status]}
              </h2>
              <span className={`text-xs font-semibold rounded-full px-2.5 py-0.5 ${countColors[status]}`}>
                {statusTasks.length}
              </span>
            </div>
            <div className="space-y-3">
              {statusTasks.length === 0 ? (
                <p className="text-sm text-gray-400 dark:text-gray-500 text-center py-8">
                  No tasks
                </p>
              ) : (
                statusTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onStatusChange={handleStatusChange}
                  />
                ))
              )}
            </div>
          </div>
        )
      )}
    </div>
  );
}
