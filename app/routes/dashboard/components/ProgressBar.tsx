import { useState, useEffect } from "react";

export default function ProgressBar({data}) {
    console.log("component data : ", data)
    return (
        <div className="flex items-center justify-center w-4/5 space-x-2">
          <div className="w-full bg-white rounded-full h-2.5">
            <div 
                className="bg-primary-900 h-2.5 rounded-full w-1/4"
                style={{ width: `${((data.count) / data.length) * 100}%` }}
            />
          </div>
          <span className="text-xs font-medium">{data.count}/{data.length}</span>
        </div>
    )
}