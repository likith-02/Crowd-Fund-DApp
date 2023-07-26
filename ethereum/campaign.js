import Campaign from "./build/Campaign.json";
import web3 from "./web3";

export default function campaignInstance(address) {
  return new web3.eth.Contract(Campaign.abi, address);
}
