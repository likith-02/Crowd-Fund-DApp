import web3 from "./web3";

import FactoryCampaign from "./build/FactoryCampaign.json";

const factoryInstance = new web3.eth.Contract(
  FactoryCampaign.abi,
  import.meta.env.VITE_DEPLOYED_FACTORY_ADDRESS
);

export default factoryInstance;
