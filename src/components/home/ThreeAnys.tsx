import React from "react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { ThreeAnysImg } from "../../../public";
import Image from "next/image";

const ThreeAnys = () => {
  return (
    <div className="relative w-full min-h-[70vh] lg:h-[90vh] max-w-7xl mx-auto flex flex-col gap-4 px-6 py-8">
      <div className="w-full max-w-3xl mx-auto h-[150px] bg-black bg-opacity-30 border border-[#23293D] -mt-10 py-6 rounded-2xl flex flex-col items-center justify-center gap-4">
        <h1 className="text-4xl font-semibold text-center pt-4 text-[#89D472]">
          $128,234,600
        </h1>
        <p className="text-center text-lg lg:text-2xl text-white text-opacity-60">
          raised
        </p>
      </div>
      <div className="flex flex-col-reverse lg:flex-row justify-center items-center gap-4 w-full min-h-[400px] mt-8 lg:mt-16">
        <div className="w-full lg:w-1/2 h-full flex flex-col items-start justify-start lg:justify-center px-6">
          <h1 className="text-xl lg:text-4xl font-semibold pt-4 text-white">
            Anyone, Anywhere, Anytime, Anychain!
          </h1>
          <p className="text-white text-opacity-60 lg:text-lg pt-2">
            Built for community causes, to help reputable individuals raise
            funds for relevant issues as well as to fund grants. Daovation is
            not fragmented and limited to one chain, but accessible to users on
            separate EVM chains.
          </p>
          <button className="long-btn-trans py-3 px-8 mt-4 lg:mt-8 flex items-center gap-2">
            <span className="uppercase">Learn More</span>
            <ChevronRightIcon className="h-5 w-5 text-[#71b15d]" />
          </button>
        </div>
        <div className="w-full lg:w-1/2 h-full">
          <Image
            src={ThreeAnysImg}
            alt="ThreeAnysImg"
            className="object-contain object-center w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default ThreeAnys;
