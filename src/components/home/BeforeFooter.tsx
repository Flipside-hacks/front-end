import React from "react";
import { NearFooter1, NearFooter2 } from "../../../public";
import Image from "next/image";

const BeforeFooter = () => {
  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 px-6 min-h-[50vh] my-20 lg:my-40">
      <div className="flex flex-col items-center lg:items-start w-full lg:w-2/3 lg:h-full">
        <Image src={NearFooter1} alt="hero" />
      </div>
      <div className="flex flex-col items-center lg:items-start w-full lg:w-1/3 lg:h-full">
        <Image src={NearFooter2} alt="hero" />
      </div>
    </div>
  );
};

export default BeforeFooter;
