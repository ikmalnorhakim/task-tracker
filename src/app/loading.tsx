export default function Loading() {
  return (
    <div className="space-y-5">
      <div className="glass-card !rounded-2xl p-4 sm:p-5">
        <div className="flex items-center justify-between">
          <div className="h-8 w-40 rounded-lg bg-white/30 dark:bg-white/5 animate-pulse" />
          <div className="h-10 w-28 rounded-xl bg-white/30 dark:bg-white/5 animate-pulse" />
        </div>
      </div>
      <div className="glass-card !rounded-2xl p-4 flex flex-wrap gap-3">
        <div className="h-10 w-56 rounded-xl bg-white/30 dark:bg-white/5 animate-pulse" />
        <div className="h-10 w-32 rounded-xl bg-white/30 dark:bg-white/5 animate-pulse" />
        <div className="h-10 w-32 rounded-xl bg-white/30 dark:bg-white/5 animate-pulse" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[1, 2, 3].map((col) => (
          <div
            key={col}
            className="glass-card border-t-[3px] border-t-gray-300/30 dark:border-t-gray-600/30 p-4 min-h-[220px] !rounded-2xl"
          >
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-xl bg-white/30 dark:bg-white/5 animate-pulse" />
              <div className="h-4 w-20 rounded-lg bg-white/30 dark:bg-white/5 animate-pulse" />
            </div>
            <div className="space-y-3">
              {[1, 2].map((card) => (
                <div key={card} className="glass-card p-4 !rounded-2xl">
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
