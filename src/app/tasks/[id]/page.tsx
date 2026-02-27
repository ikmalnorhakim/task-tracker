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
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 mb-4 sm:mb-5 transition-colors font-medium"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Dashboard
      </Link>

      {/* Task info card */}
      <div className="glass-card p-5 sm:p-6 !rounded-2xl mb-4">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
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
            <span className="px-2.5 py-1 rounded-lg text-xs font-medium glass-subtle text-gray-700 dark:text-gray-300">
              {PRIORITY_LABELS[task.priority as TaskPriority]}
            </span>
          </div>
        </div>

        {task.description && (
          <div className="glass-subtle rounded-xl p-4">
            <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Description</h2>
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 whitespace-pre-wrap break-words leading-relaxed">
              {task.description}
            </p>
          </div>
        )}
      </div>

      {/* Edit card */}
      <div className="glass-card p-5 sm:p-6 !rounded-2xl mb-4">
        <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
          <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Edit Task
        </h2>
        <EditTaskForm task={task} />
      </div>

      {/* Danger zone card */}
      <div className="glass-card p-5 sm:p-6 !rounded-2xl border-red-500/10 dark:border-red-500/10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-red-600 dark:text-red-400 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              Danger Zone
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">This action cannot be undone</p>
          </div>
          <DeleteTaskButton taskId={task.id} />
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}
