export default function ResourcesLoading() {
  return (
    <div className="flex flex-col min-h-screen bg-[#09090b] overflow-hidden pt-32 pb-16 font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="animate-pulse space-y-12">
          {/* Hero skeleton */}
          <div className="flex flex-col items-center justify-center space-y-4 max-w-4xl mx-auto">
             <div className="w-48 h-6 bg-[#121214] border border-border/20 rounded-full" />
             <div className="w-3/4 h-16 bg-[#121214] border border-border/20 rounded-xl" />
             <div className="w-1/2 h-6 bg-[#121214] border border-border/20 rounded-lg" />
          </div>

          {/* Grid skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-16">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-[#121214] border border-border/20 rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
