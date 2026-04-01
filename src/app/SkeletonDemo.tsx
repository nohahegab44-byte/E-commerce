


export function SkeletonDemo() {
  return (
    <div className="w-10/12 mx-auto p-5">
      
      <div className="flex justify-between my-4">
        <div className="w-48 h-7 bg-gray-200 rounded animate-pulse"></div>
        <div className="w-20 h-5 bg-gray-200 rounded animate-pulse"></div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="border shadow-xl p-3 rounded-2xl flex flex-col items-center gap-2"
          >
            <div className="w-20 h-20 rounded-full bg-gray-200 animate-pulse"></div>
            <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
          </div>
        ))}
      </div>

    </div>
  
  )
}
