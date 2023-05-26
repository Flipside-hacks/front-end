import React from 'react'
import { useRouter } from 'next/router'
import { PlusIcon } from '@heroicons/react/24/outline'

const StartCampaignBanner = () => {
  const router = useRouter()
  return (
    <div className="pb-10">
      <div
        onClick={() => router.push("/campaigns/create-campaign")}
        className="cursor-pointer mx-auto px-20 py-6 w-full border border-dashed border--[#89D472] flex flex-col gap-4 items-center justify-center"
      >
        <PlusIcon className="w-8 h-8 text-lime" />
        <p className="text-2xl font-medium text-center text-lime">
          Start a campaign
        </p>
      </div>
    </div>
  );
}

export default StartCampaignBanner
