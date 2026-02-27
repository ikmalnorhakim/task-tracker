"use client";

import { useOptimistic, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { Task } from "@/types/task";
import { STATUS_LABELS, type TaskStatus } from "@/types/task";
import { groupTasksByStatus } from "@/lib/utils";
import TaskCard from "./TaskCard";
import { toast } from "./Toast";

const columnStyles: Record<TaskStatus, { accent: string; glow: string; icon: string }> = {
  todo: {
    accent: "border-t-blue-500/70",
    glow: "glow-blue",
    icon: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
  },
  in_progress: {
    accent: "border-t-amber-500/70",
    glow: "glow-amber",
    icon: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  },
  done: {
    accent: "border-t-emerald-500/70",
    glow: "glow-emerald",
    icon: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  },
};

const columnIcons: Record<TaskStatus, string> = {
  todo: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
  in_progress: "M13 10V3L4 14h7v7l9-11h-7z",
  done: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
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
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-5 ${isPending ? "opacity-80" : ""} transition-opacity`}>
      {(Object.entries(grouped) as [TaskStatus, Task[]][]).map(
        ([status, statusTasks]) => {
          const style = columnStyles[status];
          return (
            <div
              key={status}
              className={`glass-card border-t-[3px] ${style.accent} ${style.glow} p-4 min-h-[220px] !rounded-2xl`}
            >
              <div className="flex items-center gap-2.5 mb-4">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${style.icon}`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={columnIcons[status]} />
                  </svg>
                </div>
                <h2 className="font-semibold text-gray-800 dark:text-gray-200 text-sm">
                  {STATUS_LABELS[status]}
                </h2>
                <span className={`ml-auto text-xs font-bold rounded-full px-2 py-0.5 ${style.icon}`}>
                  {statusTasks.length}
                </span>
              </div>
              <div className="space-y-3">
                {statusTasks.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-10 text-gray-400 dark:text-gray-500">
                    <svg className="w-8 h-8 mb-2 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                    <p className="text-xs font-medium">No tasks</p>
                  </div>
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
          );
        }
      )}
    </div>
  );
}
