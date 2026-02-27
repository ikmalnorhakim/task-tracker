import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import TaskCard from "@/components/TaskCard";
import type { Task } from "@/types/task";

afterEach(() => {
  cleanup();
});

const mockTask: Task = {
  id: 1,
  title: "Test Task",
  description: "This is a test description",
  status: "todo",
  priority: "high",
  createdAt: new Date("2024-01-01"),
  updatedAt: new Date("2024-01-01"),
};

describe("TaskCard", () => {
  it("renders the task title", () => {
    render(<TaskCard task={mockTask} />);
    expect(screen.getByText("Test Task")).toBeInTheDocument();
  });

  it("renders the priority badge", () => {
    render(<TaskCard task={mockTask} />);
    expect(screen.getByText("High")).toBeInTheDocument();
  });

  it("renders the description snippet", () => {
    render(<TaskCard task={mockTask} />);
    expect(screen.getByText("This is a test description")).toBeInTheDocument();
  });

  it("links to the task detail page", () => {
    render(<TaskCard task={mockTask} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/tasks/1");
  });

  it("does not render description when not provided", () => {
    const taskWithoutDesc = { ...mockTask, description: null };
    render(<TaskCard task={taskWithoutDesc} />);
    expect(screen.queryByText("This is a test description")).not.toBeInTheDocument();
  });
});
