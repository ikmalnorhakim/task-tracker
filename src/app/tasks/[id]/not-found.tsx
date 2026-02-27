import Link from "next/link";

export default function TaskNotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="glass-strong rounded-2xl shadow-xl p-8 text-center max-w-md">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Task Not Found
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          The task you&apos;re looking for doesn&apos;t exist or has been deleted.
        </p>
        <Link
          href="/"
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg shadow-indigo-500/25 transition-all duration-200"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
