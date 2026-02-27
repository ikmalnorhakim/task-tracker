import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="glass-card !rounded-2xl p-8 text-center max-w-md">
        <div className="w-12 h-12 rounded-2xl bg-indigo-500/15 flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Page Not Found
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="inline-block px-5 py-2.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 active:scale-95 rounded-xl shadow-lg shadow-indigo-500/25 transition-all duration-200"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
