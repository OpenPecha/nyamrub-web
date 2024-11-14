
export default function ProgressBar({total}: {total: number}) {
    return (
        <div className=" flex items-center justify-center w-3/5 space-x-2 mx-auto">
          <div className="w-full bg-white rounded-full h-2.5">
            <div 
                className="bg-primary-900 h-2.5 rounded-full w-1/4"
                style={{ width: `${(1/total) * 100}%` }}
            />
          </div>
          <span className="text-xs font-medium">{1}/{total}</span>
      </div>
      
    )
}