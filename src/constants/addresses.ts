import {selected_network_addresses} from "../interfaces/base"

export const ADDRESSES:selected_network_addresses = {
  //Bsc Testnet(HUB CHAIN)
  97: {
    // CAMPAIGN_FACTORY: "0xe8d3a73f6351f9f5dd6A577aD4ddF7d5C84DF5C8",
    CAMPAIGN_FACTORY: "0xb4439634ad988555F2a5EB3810ae589A353A2B77",
    CAMPAIGN_SATELLITE: "",
    CROSSCHAIN_DAO: "0x558388D8Ebcf227D6cF1C1b8345754259800CA3F",
    GOVERNANCE_TOKEN: "0xF3701c7dAAa71f3622a47e49Cc0C1Dfae8C6Ce4c",
  },





  
  //Polygon Testnet(SATELLITE CHAIN)
  80001: {
    CAMPAIGN_FACTORY: "0x47A62Af19657263E3E0b60312f97F7464F70Ba35",
    CROSSCHAIN_DAO: "0xd2f449C10c16C4395f00adE7287f29db2fedeA45", 
    CAMPAIGN_SATELLITE: "0x47A62Af19657263E3E0b60312f97F7464F70Ba35",
    GOVERNANCE_TOKEN: "0xF3701c7dAAa71f3622a47e49Cc0C1Dfae8C6Ce4c",
  },
  //Avalanche Testnet(SATELLITE CHAIN)
  43113: {
    CAMPAIGN_FACTORY: "0x47A62Af19657263E3E0b60312f97F7464F70Ba35",
    CROSSCHAIN_DAO: "0xd2f449C10c16C4395f00adE7287f29db2fedeA45",
    CAMPAIGN_SATELLITE: "0x47A62Af19657263E3E0b60312f97F7464F70Ba35",
    GOVERNANCE_TOKEN: "0xF3701c7dAAa71f3622a47e49Cc0C1Dfae8C6Ce4c",
  },
};

export const CAMPAIGN_SATELLITE=  "0x47A62Af19657263E3E0b60312f97F7464F70Ba35";
