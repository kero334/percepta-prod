export default function ArticleLoading() {
  return (
    <div className="flex flex-col min-h-screen bg-[#09090b] overflow-hidden font-sans pt-32 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl animate-pulse">
        <div className="w-32 h-6 bg-[#121214] border border-border/20 rounded mb-8" />
        <div className="w-24 h-6 bg-primary/10 rounded-full mb-6" />
        <div className="w-full h-16 bg-[#121214] border border-border/20 rounded-xl mb-6" />
        <div className="w-3/4 h-16 bg-[#121214] border border-border/20 rounded-xl mb-12" />
        
        <div className="space-y-4">
          <div className="w-full h-4 bg-[#121214] rounded" />
          <div className="w-full h-4 bg-[#121214] rounded" />
          <div className="w-5/6 h-4 bg-[#121214] rounded" />
          <div className="w-full h-4 bg-[#121214] rounded mt-8" />
          <div className="w-4/5 h-4 bg-[#121214] rounded" />
        </div>
      </div>
    </div>
  );
}
