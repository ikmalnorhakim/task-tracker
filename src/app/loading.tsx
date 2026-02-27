export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="h-8 w-40 rounded-lg bg-white/30 dark:bg-white/5 animate-pulse" />
        <div className="h-10 w-28 rounded-xl bg-white/30 dark:bg-white/5 animate-pulse" />
      </div>
      <div className="glass rounded-2xl p-4 shadow-sm flex flex-wrap gap-3">
        <div className="h-10 w-56 rounded-xl bg-white/30 dark:bg-white/5 animate-pulse" />
        <div className="h-10 w-32 rounded-xl bg-white/30 dark:bg-white/5 animate-pulse" />
        <div className="h-10 w-32 rounded-xl bg-white/30 dark:bg-white/5 animate-pulse" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((col) => (
          <div
            key={col}
            className="glass rounded-2xl border-t-4 border-t-gray-300/30 p-4 min-h-[200px]"
          >
            <div className="h-5 w-24 rounded-lg bg-white/30 dark:bg-white/5 animate-pulse mb-4" />
            <div className="space-y-3">
              {[1, 2].map((card) => (
                <div key={card} className="glass-strong rounded-xl p-4">
                  <div className="h-4 w-3/4 rounded-lg bg-white/40 dark:bg-white/5 animate-pulse" />
                  <div className="h-3 w-1/2 rounded-lg bg-white/30 dark:bg-white/5 animate-pulse mt-2" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
