import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-5xl px-6 pt-28 pb-16 flex flex-col items-center justify-center min-h-[60vh] text-center">
      <p className="text-7xl font-semibold text-white tabular-nums">404</p>
      <p className="text-sm text-zinc-400 mt-4">
        This page doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="mt-8 text-sm text-zinc-400 hover:text-white transition-colors border border-white/10 rounded-lg px-4 py-2"
      >
        Back to home
      </Link>
    </div>
  );
}
