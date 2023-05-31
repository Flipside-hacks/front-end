import { Chain } from "wagmi";
export interface IConnector{
    readonly chainID: number;
    readonly network: string;
    readonly address_campaign_factory: string;
    readonly address_crosschain_dao: string;
    readonly address_campaign_satellite: string;
    readonly address_governance_token: string;
    readonly abi_token: any; 
    readonly abi_campaign: any;
    readonly abi_campaign_factory: any;
    readonly abi_dao: any;
}

export type selected_network_addresses = {[y:number]:addressBlock};

export interface addressBlock{
    CAMPAIGN_FACTORY: string;
    CAMPAIGN_SATELLITE: string;
    CROSSCHAIN_DAO: string;
    GOVERNANCE_TOKEN: string;
};

export interface abiList{
  readonly campaign:any;
  readonly token:any;
  readonly campaignFactory:any;
  readonly dao:any;
}

export interface Connector{
  readonly connector: IConnector | null;
  network_switcher:Function;
  readonly supportedChains: Chain[];
  currentChain:number|undefined;
}