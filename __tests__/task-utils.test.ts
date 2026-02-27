import { describe, it, expect } from "vitest";
import { groupTasksByStatus, filterTasks } from "@/lib/utils";
import type { Task } from "@/types/task";

const mockTasks: Task[] = [
  {
    id: 1,
    title: "Setup project",
    description: "Initialize the repo",
    status: "done",
    priority: "high",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: 2,
    title: "Build API",
    description: "Create REST endpoints",
    status: "in_progress",
    priority: "high",
    createdAt: new Date("2024-01-02"),
    updatedAt: new Date("2024-01-02"),
  },
  {
    id: 3,
    title: "Write tests",
    description: null,
    status: "todo",
    priority: "medium",
    createdAt: new Date("2024-01-03"),
    updatedAt: new Date("2024-01-03"),
  },
  {
    id: 4,
    title: "Deploy app",
    description: "Deploy to Vercel",
    status: "todo",
    priority: "low",
    createdAt: new Date("2024-01-04"),
    updatedAt: new Date("2024-01-04"),
  },
];

describe("groupTasksByStatus", () => {
  it("groups tasks into todo, in_progress, and done", () => {
    const grouped = groupTasksByStatus(mockTasks);

    expect(grouped.todo).toHaveLength(2);
    expect(grouped.in_progress).toHaveLength(1);
    expect(grouped.done).toHaveLength(1);
  });

  it("returns empty arrays for statuses with no tasks", () => {
    const grouped = groupTasksByStatus([]);

    expect(grouped.todo).toHaveLength(0);
    expect(grouped.in_progress).toHaveLength(0);
    expect(grouped.done).toHaveLength(0);
  });
});

describe("filterTasks", () => {
  it("filters by status", () => {
    const result = filterTasks(mockTasks, { status: "todo" });
    expect(result).toHaveLength(2);
    expect(result.every((t) => t.status === "todo")).toBe(true);
  });

  it("filters by priority", () => {
    const result = filterTasks(mockTasks, { priority: "high" });
    expect(result).toHaveLength(2);
    expect(result.every((t) => t.priority === "high")).toBe(true);
  });

  it("filters by search query", () => {
    const result = filterTasks(mockTasks, { search: "deploy" });
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Deploy app");
  });

  it("combines multiple filters", () => {
    const result = filterTasks(mockTasks, { status: "todo", priority: "low" });
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Deploy app");
  });

  it("returns all tasks when no filters applied", () => {
    const result = filterTasks(mockTasks, {});
    expect(result).toHaveLength(4);
  });

  it("sorts by newest first", () => {
    const result = filterTasks(mockTasks, { sort: "newest" });
    expect(result[0].title).toBe("Deploy app");
    expect(result[3].title).toBe("Setup project");
  });

  it("sorts by priority high to low", () => {
    const result = filterTasks(mockTasks, { sort: "priority_high" });
    expect(result[0].priority).toBe("high");
    expect(result[result.length - 1].priority).toBe("low");
  });
});
