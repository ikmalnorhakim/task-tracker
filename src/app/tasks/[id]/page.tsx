import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/db";
import { tasks } from "@/db/schema";
import { eq } from "drizzle-orm";
import { STATUS_LABELS, PRIORITY_LABELS, type TaskStatus, type TaskPriority } from "@/types/task";
import { formatDate } from "@/lib/utils";
import EditTaskForm from "@/components/EditTaskForm";
import DeleteTaskButton from "@/components/DeleteTaskButton";
import ToastContainer from "@/components/Toast";

export default async function TaskDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const taskId = parseInt(id, 10);

  if (isNaN(taskId)) {
    notFound();
  }

  const [task] = await db.select().from(tasks).where(eq(tasks.id, taskId));

  if (!task) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 mb-4 sm:mb-6 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Dashboard
      </Link>

      <div className="glass-strong rounded-2xl shadow-xl p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-6">
          <div className="min-w-0">
            <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 break-words">
              {task.title}
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              <span>Created {formatDate(task.createdAt)}</span>
              <span className="hidden sm:inline">·</span>
              <span>Updated {formatDate(task.updatedAt)}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 ring-1 ring-indigo-500/20">
              {STATUS_LABELS[task.status as TaskStatus]}
            </span>
            <span className="px-2.5 py-1 rounded-lg text-xs font-medium glass text-gray-700 dark:text-gray-300">
              {PRIORITY_LABELS[task.priority as TaskPriority]}
            </span>
          </div>
        </div>

        {task.description && (
          <div className="mb-6 sm:mb-8">
            <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 whitespace-pre-wrap break-words">
              {task.description}
            </p>
          </div>
        )}

        <hr className="border-white/20 dark:border-white/5 mb-4 sm:mb-6" />

        <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Edit Task</h2>
        <EditTaskForm task={task} />

        <hr className="border-white/20 dark:border-white/5 my-4 sm:my-6" />

        <div className="flex justify-end">
          <DeleteTaskButton taskId={task.id} />
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}
