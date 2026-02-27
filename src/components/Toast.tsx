"use client";

import { useEffect, useState } from "react";

type ToastMessage = {
  id: number;
  text: string;
  type: "success" | "error";
};

let addToastFn: ((text: string, type: "success" | "error") => void) | null = null;

export function toast(text: string, type: "success" | "error" = "success") {
  addToastFn?.(text, type);
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    addToastFn = (text, type) => {
      const id = Date.now();
      setToasts((prev) => [...prev, { id, text, type }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3000);
    };
    return () => { addToastFn = null; };
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`glass-strong px-4 py-3 rounded-xl shadow-2xl text-sm font-medium ${
            t.type === "success"
              ? "text-emerald-700 dark:text-emerald-300 ring-1 ring-emerald-500/30"
              : "text-red-700 dark:text-red-300 ring-1 ring-red-500/30"
          }`}
        >
          {t.text}
        </div>
      ))}
    </div>
  );
}
