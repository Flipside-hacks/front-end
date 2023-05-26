import React from "react";
import Layout from "@/components/common/Layout";
import { useRouter } from "next/router";


const JoinOurDao = () => {
  const router = useRouter();
  return (
    <Layout>
      <div className="text-white w-full h-full flex flex-col items-center px-4 pb-20">
        <h1 className="lg:pt-8 text-2xl lg:text-4xl font-semibold lg:text-center text-white">
          Join DAOvation to help decide how the ecosystem runs
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-3  gap-12 min-h-[200px] w-full my-8 max-w-3xl mx-auto">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-3xl lg:text-4xl font-semibold text-center text-lime">
              20,000
            </h1>
            <p className="text-lg font-medium text-center text-[#8E8F94]">
              members
            </p>
          </div>

          <div className="flex flex-col items-center justify-center">
            <h1 className="text-3xl lg:text-4xl font-semibold text-center text-lime">
              100+
            </h1>
            <p className="text-lg font-medium text-center text-[#8E8F94]">
              proposals passed
            </p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-3xl lg:text-4xl font-semibold text-center text-lime">
              244ETH
            </h1>
            <p className="text-lg font-medium text-center text-[#8E8F94]">
              in treasury
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 w-full max-w-[500px] mx-auto">
          <button
            onClick={() => router.push("/join")}
            className="long-btn px-20 py-3 w-full">
            <span className="text-black">JOIN DAOVATION</span>
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default JoinOurDao;
