"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { TASK_STATUSES, TASK_PRIORITIES, STATUS_LABELS, PRIORITY_LABELS } from "@/types/task";

const SORT_OPTIONS = [
  { value: "", label: "Default" },
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "priority_high", label: "Priority: High to Low" },
  { value: "priority_low", label: "Priority: Low to High" },
] as const;

const inputClass =
  "glass-input rounded-xl px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:shadow-md transition-all duration-200";

export default function TaskFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentStatus = searchParams.get("status") || "";
  const currentPriority = searchParams.get("priority") || "";
  const currentSearch = searchParams.get("search") || "";
  const currentSort = searchParams.get("sort") || "";

  const [searchInput, setSearchInput] = useState(currentSearch);

  useEffect(() => {
    setSearchInput(currentSearch);
  }, [currentSearch]);

  const updateParams = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(updates)) {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      }
      router.push(`?${params.toString()}`);
    },
    [router, searchParams]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== currentSearch) {
        updateParams({ search: searchInput });
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput, currentSearch, updateParams]);

  function clearFilters() {
    setSearchInput("");
    router.push("/");
  }

  const activeFilterCount =
    (currentStatus ? 1 : 0) +
    (currentPriority ? 1 : 0) +
    (currentSearch ? 1 : 0) +
    (currentSort ? 1 : 0);

  return (
    <div className="glass-card !rounded-2xl p-3 sm:p-4">
      <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2 sm:gap-3">
        <div className="relative w-full sm:w-auto">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className={`${inputClass} pl-9 w-full sm:w-56`}
          />
        </div>

        <div className="grid grid-cols-3 sm:flex sm:flex-wrap gap-2 sm:gap-3">
          <select
            value={currentStatus}
            onChange={(e) => updateParams({ status: e.target.value })}
            className={`${inputClass} w-full sm:w-auto`}
          >
            <option value="">Status</option>
            {TASK_STATUSES.map((s) => (
              <option key={s} value={s}>{STATUS_LABELS[s]}</option>
            ))}
          </select>

          <select
            value={currentPriority}
            onChange={(e) => updateParams({ priority: e.target.value })}
            className={`${inputClass} w-full sm:w-auto`}
          >
            <option value="">Priority</option>
            {TASK_PRIORITIES.map((p) => (
              <option key={p} value={p}>{PRIORITY_LABELS[p]}</option>
            ))}
          </select>

          <select
            value={currentSort}
            onChange={(e) => updateParams({ sort: e.target.value })}
            className={`${inputClass} w-full sm:w-auto`}
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        {activeFilterCount > 0 && (
          <button
            onClick={clearFilters}
            className="inline-flex items-center justify-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors py-1 font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Clear {activeFilterCount} {activeFilterCount === 1 ? "filter" : "filters"}
          </button>
        )}
      </div>
    </div>
  );
}
