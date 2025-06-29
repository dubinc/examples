export default function Loading() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "var(--background)" }}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div
            className="w-12 h-12 rounded-full border-4"
            style={{ borderColor: "var(--foreground)" }}
          />
          <div
            className="w-12 h-12 rounded-full border-4 border-t-transparent animate-spin absolute top-0"
            style={{ borderColor: "var(--foreground)" }}
          />
        </div>
        <p className="text-sm" style={{ color: "var(--foreground)" }}>
          Loading dashboard...
        </p>
      </div>
    </div>
  );
}
