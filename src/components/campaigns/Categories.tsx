import React, {useState} from "react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { ThreeAnysImg } from "../../../public";
import CampaignCard from "./CampaignCard";
import { useContractRead } from "wagmi";
import { ABI } from "@/constants/abi";

const campaigns = [
  {
    title: "Building a plant powered Blockchain",
    image: ThreeAnysImg,
    amount: `1,000,000`,
    currency: "BNB",
    category: "Blockchain"
  },
  {
    title: "Building a plant powered Blockchain",
    image: ThreeAnysImg,
    amount: `1,000,000`,
    currency: "BNB",
    category: "Education"
  },
  {
    title: "Building a plant powered Blockchain",
    image: ThreeAnysImg,
    amount: `1,000,000`,
    currency: "BNB",
    category: "Health"
  },
];


const Categories = () => {
  const { data, isError, isLoading } = useContractRead({
    address: "0xb4439634ad988555F2a5EB3810ae589A353A2B77",
    abi: ABI.campaignFactory,
    functionName: "getAllCampaigns",
  });
  console.log("All campaigns: ", data);
  const [AllCampaigns, setAllCampaigns] = useState<string[]>(data as unknown as string[]);
  const [activeCategory, setActiveCategory] = useState("All");

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    // if (category === "All") {
    //   setAllCampaigns(campaigns);
    // } else {
    //   const filteredCampaigns = campaigns.filter(
    //     (campaign) => campaign.category.toLowerCase() === category.toLowerCase()
    //   );
    //   setAllCampaigns(filteredCampaigns);
    // }
  };

  const categories = ["All", "Blockchain", "Education", "Health"];

  return (
    <div className="w-full pt-12 pb-20 overflow-x-scroll">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-lime">
          Categories
        </h1>

        <div className="flex items-center justify-center gap-2 cursor-pointer">
          <button className="font-semibold">See All</button>
          <ChevronRightIcon className="w-5 h-5" />
        </div>
      </div>

      {/* overflowable Flex of categories */}
      <div className="flex overflow-x-scroll mt-4 pb-4">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-full font-semibold text-sm mr-4 ${
              activeCategory === category ? "bg-lime text-white" : "bg-gray-100 text-gray-500"
            }`}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </button>
        ))}
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

export default Categories;

