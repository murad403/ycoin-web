const DocumentSkeleton = () => (
  <div className="space-y-4 animate-pulse">
    <div className="h-4 bg-zinc-800/60 rounded-md w-3/4"></div>
    <div className="h-4 bg-zinc-800/60 rounded-md w-full"></div>
    <div className="h-4 bg-zinc-800/60 rounded-md w-5/6"></div>
    <div className="h-4 bg-zinc-800/60 rounded-md w-4/5"></div>
    <div className="pt-4 space-y-3">
      <div className="h-4 bg-zinc-800/60 rounded-md w-full"></div>
      <div className="h-4 bg-zinc-800/60 rounded-md w-11/12"></div>
      <div className="h-4 bg-zinc-800/60 rounded-md w-2/3"></div>
    </div>
  </div>
)

export default DocumentSkeleton;