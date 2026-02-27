"use client";

import Link from "next/link";
import type { Task } from "@/types/task";
import { PRIORITY_LABELS, STATUS_LABELS, TASK_STATUSES, type TaskPriority, type TaskStatus } from "@/types/task";

const priorityConfig: Record<TaskPriority, { badge: string; dot: string }> = {
  high: {
    badge: "bg-red-500/15 text-red-700 dark:text-red-300 ring-1 ring-red-500/20",
    dot: "bg-red-500",
  },
  medium: {
    badge: "bg-yellow-500/15 text-yellow-700 dark:text-yellow-300 ring-1 ring-yellow-500/20",
    dot: "bg-yellow-500",
  },
  low: {
    badge: "bg-green-500/15 text-green-700 dark:text-green-300 ring-1 ring-green-500/20",
    dot: "bg-green-500",
  },
};

type Props = {
  task: Task;
  onStatusChange?: (task: Task, newStatus: string) => void;
};

export default function TaskCard({ task, onStatusChange }: Props) {
  const priority = task.priority as TaskPriority;
  const config = priorityConfig[priority];
  const otherStatuses = TASK_STATUSES.filter((s) => s !== task.status);

  return (
    <div className="glass-card p-3.5 sm:p-4 cursor-pointer group">
      <Link href={`/tasks/${task.id}`}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-2.5 min-w-0">
            <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${config.dot}`} />
            <h3 className="font-medium text-gray-900 dark:text-white text-sm leading-snug min-w-0 break-words">
              {task.title}
            </h3>
          </div>
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-lg text-xs font-medium shrink-0 ${config.badge}`}
          >
            {PRIORITY_LABELS[priority]}
          </span>
        </div>
        {task.description && (
          <p className="mt-2 ml-[18px] text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
            {task.description}
          </p>
        )}
      </Link>
      {onStatusChange && (
        <div className="mt-3 ml-[18px] pt-2.5 border-t border-gray-200/60 dark:border-white/5 flex flex-wrap gap-1.5">
          {otherStatuses.map((s) => (
            <button
              key={s}
              onClick={() => onStatusChange(task, s)}
              className="text-xs px-2.5 py-1.5 rounded-lg glass-subtle text-gray-600 dark:text-gray-300 active:scale-95 sm:hover:shadow-md sm:hover:scale-105 transition-all duration-150 font-medium"
            >
              {STATUS_LABELS[s as TaskStatus]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
