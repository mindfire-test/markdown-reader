//loading function
export function Loading(){
  return(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-border border-t-brand-primary rounded-full animate-spin"></div>
        <p className="text-sm text-brand-gray">Loading...</p>
      </div>
    </div>
  )
}