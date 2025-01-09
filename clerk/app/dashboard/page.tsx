export default function DashboardPage() {
  return (
    <div>
      <h1 className="font-display text-xl font-bold">Dashboard</h1>
      <h2 className="mt-8 text-base font-medium">Create a sale</h2>
      <form className="mt-4 flex flex-wrap gap-2">
        <input
          type="number"
          placeholder="Amount (dollars)"
          className="rounded-lg border border-black/30 px-2 py-1 text-sm placeholder-black/30"
        />
        <button
          type="submit"
          className="h-7 rounded-lg border border-black bg-black px-2 text-sm font-medium text-white"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
