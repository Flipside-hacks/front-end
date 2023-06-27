import Layout from "@/components/common/Layout";
import { useEffect, useState,useCallback ,CSSProperties} from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import { TypeAnimation } from 'react-type-animation';
import { Web3Storage } from "web3.storage";
import {CAMPAIGN_SATELLITE } from "@/constants/addresses";
import { useContractWrite, useNetwork,usePrepareContractWrite,useWaitForTransaction } from "wagmi";
import { ethers } from "ethers";
import { useConnectorContext } from "@/contexts/connector";
import HashLoader from "react-spinners/HashLoader";
import MoonLoader from "react-spinners/MoonLoader";
import Loader from "@/components/modals/loaderModal";


// Construct with token and endpoint
const client = new Web3Storage({
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDYzRDdFRUI5NjQ3NWUwYjcxMjYxYTJhMjJGQWM1OTRGRTY2RjRkNzkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzUxODU3NTk1NDksIm5hbWUiOiJGaWxsaW9uIn0.ZgOQRRLkkRk8uchRIjrrof5zAuoBnqIA4WSAPJNESMk",
});

const CreateCampaign = () => {
  const router = useRouter();
  const {connector,network_switcher,supportedChains,currentChain} = useConnectorContext();
   
  //validate that chain is connected to hub
  //from design hub chain has no satellite contract so we need to check for boolean on the satellite contract value

  const isHubChain  = !Boolean(connector?.address_campaign_satellite);

  //switch to hub chain if not connected to hub chain // assumming that the first connected chain is the hub chain
  useEffect(() => {
    if (!isHubChain) {
      network_switcher(supportedChains[0].id);
    }
  }, [currentChain]);
  
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
  const [campaignHash, setCampaignHash] = useState<string>("");
  const [campaignTarget, setCampaignTarget] = useState<number>(0);
  const [approved,setApproved] = useState(false);
  const [disableBtn, setDisableBtn] = useState<boolean>(false);
  const [percentageCount1,setPercentageCount1] = useState<number>(0);
  const [percentageCount2,setPercentageCount2] = useState<number>(0);
  const [percentageCount3,setPercentageCount3] = useState<number>(0);
  const [percentageCount4,setPercentageCount4] = useState<number>(0);
  const [txMessage, setTxMessage] = useState<string>("");
  const [tx1, setTx1] = useState<boolean>(false);
  const [tx2, setTx2] = useState<boolean>(false);
  const [tx3, setTx3] = useState<boolean>(false);
  const [tx4, setTx4] = useState<boolean>(false);
  const [open,setOpen] =useState<boolean>(false);

  const transactionMessage:string[] = [
      "Uploading campaign details...",
      "Submitting campaign data...",
      "Creating campaign...",
      "Campaign created successfully!"];

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

  const ProcessCampaign = useCallback( async (e: any) => {
    e.preventDefault();
    if (!name || !campaignName || !link || !projectDetails || !coverImage) {
      toast.error("Please fill out all the fields");
      return;
    }
    try {
      setTx1(true)
      setInTxn(true);
      setOpen(true);
      setDisableBtn(true);
      setTxMessage(transactionMessage[0]);
      const imgHash = await client.put([coverImage], {
        wrapWithDirectory: false,
      });
      // console.log("Image hash: ", imgHash);
      //creating object containing all the data
      const obj = {
        name,
        campaignName,
        link,
        projectDetails,
        coverImage: imgHash,
      };
      // console.log("Obj: ", obj);
      //converting object to a blob
      const blob = new Blob([JSON.stringify(obj)], {
        type: "application/json",
      });
      //and then to a file
      const file = [new File([blob], "obj.json")];
      //uploading file to ipfs
      const objHash = await client.put(file);

      const _target = Number(target);

      setCampaignHash(objHash);
      setCampaignTarget(Number(target));
      return {objHash, _target}
    } catch (error) {
      console.log(error)
      setInTxn(false)
      toast.error('Something Went wrong')
      console.log(error);
    }


   
  },[name,campaignName,link,projectDetails,coverImage]);



  const { config } = usePrepareContractWrite({
    address: connector?.address_campaign_factory as `0x${string}`,
    abi: connector?.abi_campaign_factory,
    functionName: "createCampaign",
    args: [
      campaignHash,
      campaignTarget,
      CAMPAIGN_SATELLITE
    ],
    chainId: currentChain,

    enabled:
      Boolean(campaignHash) &&
      Boolean(campaignTarget) &&
      Boolean(CAMPAIGN_SATELLITE)
    ,
    overrides: {
      gasLimit: ethers.utils.parseUnits(`${350000}`, 0),
    },
    onSettled(data, error) {
      if (data) {
        console.log(
          "USE PREPARE CREATE CONTRACT IS SETTLED SUCCESSFULLY",
          data
        );
        setTx1(false);
        setTx2(true)
        setInTxn(false);
        setApproved(true);
        setTxMessage(transactionMessage[1]);
      }
      if (error) {
        console.log(
          "USE PREPARE CREATE CONTRACT IS SETTLED WITH ERRORS",
       error);
      }
    },
  });



  //write to contract create campaign
  const { data:campaignData, isLoading:campaignDataIsLoading, isSuccess:campaignDataIsSucess, write:campaignDataWrite} = useContractWrite({...config,
      onSuccess:()=>{
        // toast.success('Campaign Request Successfully submitted!')
        //reset the campaign fields
        setApproved(false);
        setDisableBtn(false)
        setTx2(false);
        setTx3(true);
        setTxMessage(transactionMessage[2]);

      },
      onError:(e)=>{
        toast.error('Campaign creation failed!  '+ e.cause);
      },   
  })

  //wait for campaign to be created
  const { data:dataCampaignTxn, isError:dataCampaignTxnErr, isLoading:dataCampaignTxnLoading,error:dataCampaignError,isSuccess:dataCampaignTxnSuccess } = useWaitForTransaction({
    hash: campaignData?.hash, onSuccess:()=>{
      setTx3(false)
      setTx4(true);
      setTxMessage(transactionMessage[3]);
      setTimeout(() => {
        setOpen(false);
      }, 2000);
        // setName("");
        // setCampaignName("");
        // setCampaignTarget(0);
        // setCoverImage(null);

        // //navigate to campaigns
        // router.push("/campaigns");
      
    }
  })
  useEffect(()=>{
    if(dataCampaignTxnLoading){
      toast.success("Creating Campaign processing.. ")
    }
      //show success message on campaign creation success
    if(dataCampaignTxnSuccess){
      toast.success("Creating Campaign success: ✔️"+ dataCampaignTxn?.status);
      }
    //show error message on campaign creation error
    if(dataCampaignTxnErr){
      toast.error("Creating Campaign Failed: "+ dataCampaignError?.message);
      setOpen(false);
      }
    if(campaignDataIsSucess) {
      console.log("hash: " + JSON.stringify(campaignData))
    }

  },[dataCampaignTxnLoading,dataCampaignTxnSuccess,dataCampaignTxnErr,campaignDataIsSucess])


 

  useEffect(()=>{
    if(approved) {
      campaignDataWrite!();
    }
  },[approved]);


    
  useEffect(() => {
    const interval = setInterval(() => {
      if(tx1) {
        setPercentageCount1((prev)=> prev < 98?prev + 1:prev==98 && tx1?98: 100 )
      }
      if(tx2) {
        setPercentageCount2((prev)=> prev < 98?prev + 1:prev==98 && tx1?98: 100 )
      }
      if(tx3) {
        setPercentageCount3((prev)=> prev < 98?prev + 1:prev==98 && tx1?98: 100 )
      }
      if(tx4) {
        setPercentageCount4((prev)=> prev < 98?prev + 1:prev==98 && tx1?98: 100 )
      }
    }, 80);
    return () => clearInterval(interval);
  }, [tx1,tx2,tx3,tx4]);

  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "black",
  };


  return (
    <>
    {
      open &&   <Loader setOpen={setOpen}> 
      <div className="percentage text-white font-sans text-2xl absolute grid place-content-center h-full w-full -top-4">
        <span>{tx1?percentageCount1:tx2?percentageCount2:tx3?percentageCount3:tx4?percentageCount4:0}%</span>
      </div>
      <MoonLoader  color={'#FFC0CB'}
        loading={true}
        cssOverride={override}
        size={90}
        aria-label="Loading Spinner"
        data-testid="loader"  />
         <div className="status animate-pulse">
            {tx1?txMessage:tx2?txMessage:tx3?txMessage:tx4?txMessage:"Completed."}
         </div>
      </Loader> 
    }
      <Layout> 
        <div>
          <Toaster />
          <div>
            <h1 className="font-bold startC">Start a Campaign</h1>
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
                  Cover Imagr
                </label>

                <input
                  type="file"
                  onChange={handleCoverImageChange}
                  className="file-input bg-gradient-to-r from-gray-900 to-gray-900 text-white border-dashed rounded-r-xl border-2 border-gray-600 rounded w-4/14 h-48 py-2 px-3  leading-tight "
                />
              </div>

              <div className=" justify-center">
                <button
                  disabled={disableBtn}
                  onClick={ProcessCampaign}
                  className={`w-4/12 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${disableBtn?"bg-gray-500 hover:bg-gray-400":"bfpe hover:bg-green-700"}`}
                  type="button"
                >
                 {inTxn ? "processing... ": approved?<HashLoader
        color={'#FFC0CB'}
        loading={approved}
        cssOverride={override}
        size={30}
        aria-label="Loading Spinner"
        data-testid="loader1"  />: 'publish'}
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
