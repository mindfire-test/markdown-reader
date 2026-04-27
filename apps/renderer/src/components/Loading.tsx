//loading function
export function Loading(){
  return(
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
  <div className="flex flex-col items-center gap-3 p-4 rounded-md sidebar-bg border border-theme shadow-sm">
    <div className="w-6 h-6 border-2 border-theme border-t-transparent rounded-full animate-spin"></div>
    <p className="text-sm text-secondary">Loading...</p>
  </div>
</div>
  )
}