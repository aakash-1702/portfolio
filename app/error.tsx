"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-5xl px-6 pt-28 pb-16 flex flex-col items-center justify-center min-h-[60vh] text-center">
      <p className="text-lg font-medium text-white">Something went wrong</p>
      <p className="text-sm text-zinc-400 mt-2">
        {error.message || "An unexpected error occurred."}
      </p>
      <button
        onClick={reset}
        className="mt-8 text-sm text-zinc-400 hover:text-white transition-colors border border-white/10 rounded-lg px-4 py-2"
      >
        Try again
      </button>
    </div>
  );
}
