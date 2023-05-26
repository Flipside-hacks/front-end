import React, { useState } from "react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { ThreeAnysImg } from "../../../public";
import CampaignCard from "./CampaignCard";
import { useContractRead } from "wagmi";
import { ABI } from "@/constants/abi";

const RecentCampaigns = () => {
      const { data, isError, isLoading } = useContractRead({
        address: "0xb4439634ad988555F2a5EB3810ae589A353A2B77",
        abi: ABI.campaignFactory,
        functionName: "getAllCampaigns",
      });
      console.log("All campaigns: ", data);
      const [AllCampaigns, setAllCampaigns] = useState<string[]>(
        data as unknown as string[]
      );
  return (
    <div className="w-full py-12">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-lime">
          Recent Campaigns
        </h1>

        <div className="flex items-center justify-center gap-2 cursor-pointer">
          <button className="font-semibold">See All</button>
          <ChevronRightIcon className="w-5 h-5" />
        </div>
      </div>

      {/* Grid of campaign cards, 1 card on mobile, 3 on lg screens */}
      <div className="grid grid-cols-1 gap-8 mt-4 md:grid-cols-2 lg:grid-cols-3 pt-12">
        {AllCampaigns?.map((campaign, index) => (
          <CampaignCard key={index} campaign={campaign} />
        ))}
      </div>
    </div>
  );
};

export default RecentCampaigns;

const campaigns = [
  {
    title: "Building a plant powered Blockchain",
    image: ThreeAnysImg,
    amount: `1,000,000`,
    currency: "BNB",
  },
  {
    title: "Building a plant powered Blockchain",
    image: ThreeAnysImg,
    amount: `1,000,000`,
    currency: "BNB",
  },
  {
    title: "Building a plant powered Blockchain",
    image: ThreeAnysImg,
    amount: `1,000,000`,
    currency: "BNB",
  },
  {
    title: "Building a plant powered Blockchain",
    image: ThreeAnysImg,
    amount: `1,000,000`,
    currency: "BNB",
  },
  {
    title: "Building a plant powered Blockchain",
    image: ThreeAnysImg,
    amount: `1,000,000`,
    currency: "BNB",
  },
  {
    title: "Building a plant powered Blockchain",
    image: ThreeAnysImg,
    amount: `1,000,000`,
    currency: "BNB",
  },
];
