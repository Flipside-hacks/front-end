import {useState,useEffect, createContext, useContext } from "react";
import { useNetwork,useSwitchNetwork,Chain } from "wagmi";
import useConnector from "@/utils/Connector";
import { IConnector,Connector } from "@/interfaces/base";

const ConnectContext = createContext<Connector|null>(null);

export const ConnectContextProvider = ({children}:any)=>{
    const network = useNetwork();
    const networkIDs:(number|undefined)[] = network?.chains.map(chain =>chain.id);

    //switch to hub network if connected to a none supported network
    const switcher = useSwitchNetwork({
        chainId:networkIDs[0],
        throwForSwitchChainNotSupported: true,
    });

    useEffect(()=>{
        if(!networkIDs.includes(network?.chain?.id)){
            switcher.switchNetwork!(networkIDs[0])
        }
        if(switcher?.isError){
            switcher?.reset();
        }
              
    },[network?.chain?.id]);
   
    const conn = useConnector(network?.chain?.id!, network?.chain?.name!);
    const [connector,setConnector] = useState<IConnector|null>(conn);
  
    useEffect(()=>{
        setConnector( useConnector(network?.chain?.id!, network?.chain?.name!));
        if(switcher.isIdle && !networkIDs.includes(network?.chain?.id)){
            switcher?.switchNetwork!(networkIDs[0])
            switcher?.reset();
        }
        
    },[network?.chain?.id])

    network.chain?.id
    
   return (
     <ConnectContext.Provider 
      value={{connector,network_switcher:switcher.switchNetwork!,supportedChains:network.chains,currentChain:network?.chain?.id}}
     >
    {children}
    </ConnectContext.Provider>
    )
}

export const useConnectorContext = ()=> useContext(ConnectContext) as Connector;

