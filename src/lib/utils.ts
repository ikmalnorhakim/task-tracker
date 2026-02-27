import type { Task, TaskStatus, TaskPriority } from "@/types/task";

export function groupTasksByStatus(tasks: Task[]): Record<TaskStatus, Task[]> {
  return {
    todo: tasks.filter((t) => t.status === "todo"),
    in_progress: tasks.filter((t) => t.status === "in_progress"),
    done: tasks.filter((t) => t.status === "done"),
  };
}

const PRIORITY_ORDER: Record<string, number> = { high: 3, medium: 2, low: 1 };

export function filterTasks(
  tasks: Task[],
  filters: { status?: string; priority?: string; search?: string; sort?: string }
): Task[] {
  let filtered = tasks;

  if (filters.status) {
    filtered = filtered.filter((t) => t.status === filters.status);
  }

  if (filters.priority) {
    filtered = filtered.filter((t) => t.priority === filters.priority);
  }

  if (filters.search) {
    const query = filters.search.toLowerCase();
    filtered = filtered.filter(
      (t) =>
        t.title.toLowerCase().includes(query) ||
        t.description?.toLowerCase().includes(query)
    );
  }

  if (filters.sort) {
    filtered = [...filtered].sort((a, b) => {
      switch (filters.sort) {
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "oldest":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case "priority_high":
          return (PRIORITY_ORDER[b.priority] || 0) - (PRIORITY_ORDER[a.priority] || 0);
        case "priority_low":
          return (PRIORITY_ORDER[a.priority] || 0) - (PRIORITY_ORDER[b.priority] || 0);
        default:
          return 0;
      }
    });
  }

  return filtered;
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(date));
}
