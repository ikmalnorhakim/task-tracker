"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="glass-card !rounded-2xl p-8 text-center max-w-md">
        <div className="w-12 h-12 rounded-2xl bg-red-500/15 flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Something went wrong
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">
          {error.message || "An unexpected error occurred."}
        </p>
        <button
          onClick={reset}
          className="px-5 py-2.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 active:scale-95 rounded-xl shadow-lg shadow-indigo-500/25 transition-all duration-200"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
