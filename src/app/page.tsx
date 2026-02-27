import { Suspense } from "react";
import { db } from "@/db";
import { tasks } from "@/db/schema";
import { filterTasks } from "@/lib/utils";
import TaskBoard from "@/components/TaskBoard";
import TaskFilter from "@/components/TaskFilter";
import CreateTaskModal from "@/components/CreateTaskModal";
import ToastContainer from "@/components/Toast";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; priority?: string; search?: string; sort?: string }>;
}) {
  const params = await searchParams;
  const allTasks = await db.select().from(tasks);

  const filtered = filterTasks(allTasks, {
    status: params.status,
    priority: params.priority,
    search: params.search,
    sort: params.sort,
  });

  return (
    <div className="space-y-5">
      {/* Header card */}
      <div className="glass-card p-4 sm:p-5 !rounded-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              Dashboard
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {allTasks.length} {allTasks.length === 1 ? "task" : "tasks"} total
              {filtered.length !== allTasks.length && ` · ${filtered.length} shown`}
            </p>
          </div>
          <CreateTaskModal />
        </div>
      </div>

      {/* Filter card */}
      <Suspense fallback={<FilterSkeleton />}>
        <TaskFilter />
      </Suspense>

      {/* Board */}
      <Suspense fallback={<BoardSkeleton />}>
        <TaskBoard tasks={filtered} />
      </Suspense>

      <ToastContainer />
    </div>
  );
}

function FilterSkeleton() {
  return (
    <div className="glass-card !rounded-2xl p-4 flex flex-wrap items-center gap-3">
      <div className="h-10 w-56 rounded-xl bg-white/30 dark:bg-white/5 animate-pulse" />
      <div className="h-10 w-32 rounded-xl bg-white/30 dark:bg-white/5 animate-pulse" />
      <div className="h-10 w-32 rounded-xl bg-white/30 dark:bg-white/5 animate-pulse" />
      <div className="h-10 w-36 rounded-xl bg-white/30 dark:bg-white/5 animate-pulse" />
    </div>
  );
}

function BoardSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {[1, 2, 3].map((col) => (
        <div
          key={col}
          className="glass-card border-t-[3px] border-t-gray-300/30 dark:border-t-gray-600/30 p-4 min-h-[220px] !rounded-2xl"
        >
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-xl bg-white/30 dark:bg-white/5 animate-pulse" />
            <div className="h-4 w-20 rounded-lg bg-white/30 dark:bg-white/5 animate-pulse" />
          </div>
          <div className="space-y-3">
            {[1, 2].map((card) => (
              <div
                key={card}
                className="glass-card p-4 !rounded-2xl"
              >
                <div className="h-4 w-3/4 rounded-lg bg-white/40 dark:bg-white/5 animate-pulse" />
                <div className="h-3 w-1/2 rounded-lg bg-white/30 dark:bg-white/5 animate-pulse mt-2" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
