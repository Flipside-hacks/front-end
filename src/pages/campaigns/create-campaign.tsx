import Layout from "@/components/common/Layout";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Web3Storage } from "web3.storage";
import { ADDRESSES } from "@/constants/addresses";
import { ABI } from "@/constants/abi";
import { useContractWrite, useNetwork } from "wagmi";
import { prepareWriteContract, writeContract } from "@wagmi/core";

// Construct with token and endpoint
const client = new Web3Storage({
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDYzRDdFRUI5NjQ3NWUwYjcxMjYxYTJhMjJGQWM1OTRGRTY2RjRkNzkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzUxODU3NTk1NDksIm5hbWUiOiJGaWxsaW9uIn0.ZgOQRRLkkRk8uchRIjrrof5zAuoBnqIA4WSAPJNESMk",
});

const CreateCampaign = () => {
  const { chain } = useNetwork();
  const [chainId, setChainId] = useState<
    97 | 80001 | 43113 | (() => 97 | 80001 | 43113)
  >(97);

  useEffect(() => {
    if (chain) {
      setChainId(chain.id as 97 | 80001 | 43113);
    }
  }, [chain]);

  const { data, isLoading, isSuccess, writeAsync } = useContractWrite({
    mode: "recklesslyUnprepared",
    address: ADDRESSES[chainId as keyof typeof ADDRESSES]
      .CAMPAIGN_FACTORY as `0x${string}`,
    abi: ABI.campaignFactory,
  });

  const [tab1, setTab1] = useState<boolean>(true);
  const [tab2, setTab2] = useState<boolean>(false);
  const [name, setName] = useState("");
  const [campaignName, setCampaignName] = useState("");
  const [target, setTarget] = useState('');
  const [link, setLink] = useState("");
  const [projectDetails, setProjectDetails] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [inTxn, setInTxn] = useState(false);

  const handleCoverImageChange = (e: any) => {
    setCoverImage(e.target.files[0]);
    toast.success("Successfully added!");
    setCoverImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  const handleTabChange = () => {
    if (!name || !campaignName) {
      toast.error("Please fill out all the fields");
      return;
    } else {
      setTab1(false);
      setTab2(true);
    }
  };

  const CreateCampaign = async (e: any) => {
    e.preventDefault();
    if (!name || !campaignName || !link || !projectDetails || !coverImage) {
      toast.error("Please fill out all the fields");
      return;
    }
    try {
      
      setInTxn(true)
      const imgHash = await client.put([coverImage], {
        wrapWithDirectory: false,
      });
      console.log("Image hash: ", imgHash);
      //creating object containing all the data
      const obj = {
        name,
        campaignName,
        link,
        projectDetails,
        coverImage: imgHash,
      };
      console.log("Obj: ", obj);
      //converting object to a blob
      const blob = new Blob([JSON.stringify(obj)], {
        type: "application/json",
      });
      //and then to a file
      const file = [new File([blob], "obj.json")];
      //uploading file to ipfs
      const objHash = await client.put(file);
      console.log("Obj hash: ", objHash);

      const satelliteAddr = '0x47A62Af19657263E3E0b60312f97F7464F70Ba35';

      console.log( `SATE: `,satelliteAddr)

      const _target = Number(target);
      console.log(objHash, _target, satelliteAddr)

      const configure = await prepareWriteContract({
        address: "0xb4439634ad988555F2a5EB3810ae589A353A2B77",
        abi: ABI.campaignFactory,
        functionName: "createCampaign",
        args: [objHash, _target, satelliteAddr],
      });
      const data = await writeContract(configure);
     


      const tx = await data.wait();
      toast.success('Campaign Successfully created!')
      setInTxn(false)
    } catch (error) {
      setInTxn(false)
      toast.error('Something Went wrong')
      console.log(error);
    }
  };

  return (
    <>
      <Layout>
        <div>
          <Toaster />
          <div>
            <h1 className="font-bold">Start a Campaign</h1>
          </div>

          <h2 className="text-xl text-[#89D472] pl-20 pt-5">
            Campaign Info{" "}
            <span
              className={`${
                tab1 ? "p-14 text-gray-400" : "p-14 text-[#89D472]"
              }`}
            >
              More details
            </span>
          </h2>

          {/* <div className="position-indicator">
            
          </div> */}

          {/* add radio button & line to next tab */}

          {tab1 && (
            <form className="shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-4 ml-11">
              <div className="mb-7">
                <label className="block text-white font-bold mb-2">Name</label>
                <input
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  className=" bg-gradient-to-r from-gray-900 to-gray-900 border-gray-900 text-white border rounded w-4/12 h-12 py-2 px-3  leading-tight "
                  placeholder="Fullname"
                />
              </div>
              <div className="mb-7">
                <label className="block text-white font-bold mb-2">
                  Name of your Campaign
                </label>
                <input
                  onChange={(e) => {
                    setCampaignName(e.target.value);
                  }}
                  className=" bg-gradient-to-r from-gray-900 to-gray-900 text-white border  border-gray-900  rounded w-4/12 h-12 py-2 px-3  leading-tight "
                  placeholder="E.g. Grant to build a Solar powered shoe"
                />
              </div>
              <div className="mb-7">
                <label className="block text-white font-bold mb-2">
                  Relevant Links
                </label>
                <input
                  onChange={(e) => {
                    setLink(e.target.value);
                  }}
                  className=" bg-gradient-to-r from-gray-900 to-gray-900 text-white  border  border-gray-900  rounded w-4/12 h-12 py-2 px-3  leading-tight "
                  placeholder="www.xyz.com"
                />
              </div>
              <div className="mb-7">
                <label className="block text-white font-bold mb-2">
                  Target Amount
                </label>
                <input
                  onChange={(e) => {
                    setTarget(e.target.value);
                  }}
                  className=" bg-gradient-to-r from-gray-900 to-gray-900 text-white  border  border-gray-900  rounded w-4/12 h-12 py-2 px-3  leading-tight "
                  placeholder="1 BNB"
                />
              </div>
              <div className=" justify-center">
                <button
                  onClick={handleTabChange}
                  className="bfpe hover:bg-green-400 w-4/12 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  Next
                </button>
              </div>
            </form>
          )}

          {tab2 && (
            <form className="shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-4 ml-11">
              <div className="mb-7">
                <label className="block text-white font-bold mb-2">
                  Project Details
                </label>
                <textarea
                  onChange={(e) => {
                    setProjectDetails(e.target.value);
                  }}
                  className=" bg-gradient-to-r from-gray-900 to-gray-900 text-white border border-gray-900 rounded w-4/12 h-48 py-2 px-3  leading-tight "
                  placeholder="Brief description of your project"
                />
              </div>

              <div className="mb-7 relative ">
                <label className="block text-white font-bold mb-2">
                  Cover Image
                </label>

                <input
                  type="file"
                  onChange={handleCoverImageChange}
                  className="file-input bg-gradient-to-r from-gray-900 to-gray-900 text-white border-dashed rounded-r-xl border-2 border-gray-600 rounded w-4/14 h-48 py-2 px-3  leading-tight "
                />
              </div>

              <div className=" justify-center">
                <button
                  onClick={CreateCampaign}
                  className="bfpe hover:bg-green-700 w-4/12 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                >
                 {inTxn ? 'Processing': 'publish'}
                </button>
              </div>
            </form>
          )}
        </div>
      </Layout>
    </>
  );
};
export default CreateCampaign;
