"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TASK_STATUSES, TASK_PRIORITIES, STATUS_LABELS, PRIORITY_LABELS } from "@/types/task";
import { toast } from "./Toast";

const inputClass =
  "w-full rounded-xl glass-input px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all duration-200";

export default function CreateTaskModal() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");
  const [priority, setPriority] = useState("medium");

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  function resetForm() {
    setTitle("");
    setDescription("");
    setStatus("todo");
    setPriority("medium");
    setError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, status, priority }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create task");
      }

      toast("Task created successfully");
      resetForm();
      setIsOpen(false);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      toast("Failed to create task", "error");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-medium px-4 py-2 rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-200"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        New Task
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 sm:flex sm:items-center sm:justify-center">
          {/* Backdrop */}
          <div
            className="hidden sm:block absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => { setIsOpen(false); resetForm(); }}
          />

          {/* Mobile: full screen | Desktop: centered card */}
          <div className="h-full w-full sm:h-auto sm:w-auto sm:relative sm:max-w-md sm:mx-4 bg-[var(--background)] sm:bg-transparent">
            <div className="h-full flex flex-col sm:block sm:glass-modal sm:rounded-2xl sm:shadow-2xl sm:max-h-[85vh] sm:overflow-y-auto sm:p-6">
              {/* Header */}
              <div className="flex items-center justify-between p-4 pb-3 sm:p-0 sm:mb-4 shrink-0">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="w-8 h-8 rounded-xl bg-indigo-500/15 flex items-center justify-center">
                    <svg className="w-4 h-4 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </span>
                  Create New Task
                </h2>
                <button
                  onClick={() => { setIsOpen(false); resetForm(); }}
                  className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Form */}
              <div className="flex-1 overflow-y-auto px-4 pb-4 sm:p-0">
                {error && (
                  <div className="mb-4 p-3 bg-red-500/10 text-red-600 dark:text-red-400 rounded-xl text-sm ring-1 ring-red-500/20">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Title *
                    </label>
                    <input
                      id="title"
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className={inputClass}
                      placeholder="Enter task title"
                    />
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Description
                    </label>
                    <textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={3}
                      className={inputClass}
                      placeholder="Enter task description (optional)"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Status
                      </label>
                      <select
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className={inputClass}
                      >
                        {TASK_STATUSES.map((s) => (
                          <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="priority" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Priority
                      </label>
                      <select
                        id="priority"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className={inputClass}
                      >
                        {TASK_PRIORITIES.map((p) => (
                          <option key={p} value={p}>{PRIORITY_LABELS[p]}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => { setIsOpen(false); resetForm(); }}
                      className="px-4 py-2.5 sm:py-2 text-sm font-medium text-gray-700 dark:text-gray-300 glass rounded-xl text-center"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="px-4 py-2.5 sm:py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 rounded-xl shadow-lg shadow-indigo-500/25"
                    >
                      {isLoading ? "Creating..." : "Create Task"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
