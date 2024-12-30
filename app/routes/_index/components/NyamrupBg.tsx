import React from "react";

export default function NyamrupBg() {
  return (
    <div className="bg-secondary-600 h-[50vh] md:h-[calc(100vh-90px)]">
      <div className="flex items-center justify-center h-full bg-[url('/assets/nyamrup.png')] bg-center bg-cover md:bg-contain bg-no-repeat">
        <div className="text-white text-5xl max-sm:text-2xl font-monlam font-bold" id="step-1">
         མཉམ་རུབ།
        </div>
        
      </div>
    </div>
  );
}
