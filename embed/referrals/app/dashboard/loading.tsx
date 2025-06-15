export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-4 border-gray-200"></div>
          <div className="w-12 h-12 rounded-full border-4 border-black border-t-transparent animate-spin absolute top-0"></div>
        </div>
        <p className="text-sm text-gray-600">Loading dashboard...</p>
      </div>
    </div>
  );
} 