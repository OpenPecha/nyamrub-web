import React from "react";
import { useFadeInOnScroll } from "~/Hooks/useFadeInOnScroll";

export default function Quotation() {
  const fadeInRef = useFadeInOnScroll();
  return (
    <div
      ref={fadeInRef}
      className="flex flex-col bg-white pl-10 pt-10 opacity-0 transition-opacity duration-1000 ease-in-out"
    >
      {/* <h1 className="font-extrabold text-3xl text-primary-900">
        Start your Contribution to the Tibetan Language
      </h1> */}
      <figure className="text-left relative w-fit">
        <blockquote>
          <p className="font-medium text-xl text-primary-800">
            གལ་སྲིད་ཁྱེད་ཀྱིས་ཤུགས་རྐྱེན་ཆེ་བའི་ལས་ཀ་ཞིག་བྱེད་པར་ནུས་པ་ཞན་དྲགས་འདུག་སྙམ་ན།
            དུག་སྦྲང་ཞིག་དང་ལྷན་དུ་ཉལ་ཐབས་བྱས་ནས་སྡོད།
            {/* "If you think you are too small to make a difference, try sleeping
            with a mosquito" */}
          </p>
        </blockquote>
        <figcaption className="mt-2 text-xl font-medium text-primary-700 text-right absolute right-5 md:-right-1/4">
          ༸གོང་ས་༸སྐྱབས་མགོན་བཅུ་བཞི་པ་ཆེན་པོས།
          {/* -His Holiness the 14th Dalai Lama */}
        </figcaption>
      </figure>
    </div>
  );
}
