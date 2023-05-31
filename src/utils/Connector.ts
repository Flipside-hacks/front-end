//takes a chainID and returns connection parameters
import * as abis from "../constants/abi";
import {ADDRESSES} from "../constants/addresses";
import { IConnector,addressBlock,selected_network_addresses,abiList} from "@/interfaces/base";



const useConnector = (chainID:number,networkName:string):(IConnector|null) =>{
    const addresses:selected_network_addresses = ADDRESSES;
    const abi_list:abiList = abis.ABI;

    if (!chainID || typeof chainID !== "number") return null;
  
    //create connector map
    const chainAddresses:addressBlock = addresses[chainID]??null;
    const connect:(IConnector|null) = (chainAddresses?.CROSSCHAIN_DAO && chainAddresses?.GOVERNANCE_TOKEN && networkName )?({
        chainID,
        network:networkName,
        address_campaign_factory: chainAddresses?.CAMPAIGN_FACTORY,
        address_crosschain_dao: chainAddresses?.CROSSCHAIN_DAO,
        address_campaign_satellite: chainAddresses?.CAMPAIGN_SATELLITE,
        address_governance_token: chainAddresses?.GOVERNANCE_TOKEN,
        abi_campaign:abi_list.campaign,
        abi_campaign_factory:abi_list.campaignFactory,
        abi_dao:abi_list.dao,
        abi_token:abi_list.token,

    }):null;
    return connect??null;
}

export default useConnector;