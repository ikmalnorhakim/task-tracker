"use client";

import Link from "next/link";

export default function TaskDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="glass-strong rounded-2xl shadow-xl p-8 text-center max-w-md">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Failed to load task
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          {error.message || "An unexpected error occurred."}
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg shadow-indigo-500/25 transition-all duration-200"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 glass rounded-xl hover:shadow-md transition-all duration-200"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
