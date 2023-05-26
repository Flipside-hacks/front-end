import React from "react";
import Layout from "./common/Layout";
import StartCampaignBanner from "./campaigns/StartCampaignBanner";
import PopularCauses from "./campaigns/PopularCauses";
import RecentCampaigns from "./campaigns/RecentCampaigns";
import Categories from "./campaigns/Categories";

const CampaignPage = () => {
  return (
    <Layout>
      <div className="text-white max-w-7xl mx-auto px-4">
        <StartCampaignBanner />
        <Categories />
        <PopularCauses />
        <RecentCampaigns />
      </div>
    </Layout>
  );
};

export default CampaignPage;
