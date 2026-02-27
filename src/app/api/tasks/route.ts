import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { tasks } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import type { CreateTaskInput } from "@/types/task";
import { TASK_STATUSES, TASK_PRIORITIES } from "@/types/task";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const priority = searchParams.get("priority");

    const conditions = [];

    if (status && TASK_STATUSES.includes(status as (typeof TASK_STATUSES)[number])) {
      conditions.push(eq(tasks.status, status));
    }

    if (priority && TASK_PRIORITIES.includes(priority as (typeof TASK_PRIORITIES)[number])) {
      conditions.push(eq(tasks.priority, priority));
    }

    const result =
      conditions.length > 0
        ? await db.select().from(tasks).where(and(...conditions))
        : await db.select().from(tasks);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateTaskInput = await request.json();

    if (!body.title || body.title.trim() === "") {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    if (body.status && !TASK_STATUSES.includes(body.status)) {
      return NextResponse.json(
        { error: "Invalid status. Must be one of: todo, in_progress, done" },
        { status: 400 }
      );
    }

    if (body.priority && !TASK_PRIORITIES.includes(body.priority)) {
      return NextResponse.json(
        { error: "Invalid priority. Must be one of: low, medium, high" },
        { status: 400 }
      );
    }

    const [newTask] = await db
      .insert(tasks)
      .values({
        title: body.title.trim(),
        description: body.description?.trim() || null,
        status: body.status || "todo",
        priority: body.priority || "medium",
      })
      .returning();

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error("Failed to create task:", error);
    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 }
    );
  }
}
