export default function TaskDetailLoading() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="h-4 w-32 rounded-lg bg-white/30 dark:bg-white/5 animate-pulse mb-6" />
      <div className="glass-strong rounded-2xl shadow-xl p-6">
        <div className="h-6 w-2/3 rounded-lg bg-white/40 dark:bg-white/5 animate-pulse mb-2" />
        <div className="h-4 w-1/3 rounded-lg bg-white/30 dark:bg-white/5 animate-pulse mb-6" />
        <div className="h-20 rounded-xl bg-white/20 dark:bg-white/5 animate-pulse mb-6" />
        <div className="space-y-4">
          <div className="h-10 rounded-xl bg-white/20 dark:bg-white/5 animate-pulse" />
          <div className="h-10 rounded-xl bg-white/20 dark:bg-white/5 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
