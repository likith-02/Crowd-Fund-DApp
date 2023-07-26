import factoryInstance from "../ethereum/factory";
import campaignInstance from "../ethereum/campaign";
import web3 from "../ethereum/web3";
export async function getAllCampaigns() {
  let campaignsData;
  try {
    const campaigns = await factoryInstance.methods
      .getDeployedCampaigns()
      .call();
    const campaignsSummary = await Promise.all(
      Array(campaigns.length)
        .fill()
        .map((el, idx) => {
          const campaign = campaignInstance(campaigns[idx]);
          return campaign.methods.getSummary().call();
        })
    );
    campaignsData = campaignsSummary.map((summary, idx) => {
      return {
        image: summary[2],
        title: summary[0],
        address: campaigns[idx],
        contributors: summary[8],
      };
    });
  } catch (err) {
    console.error(err.message);
    throw new Error("There was some error fetching campaigns...Try again!");
  }
  return campaignsData;
}

export async function createNewCampaign(
  minimum,
  targetAmount,
  title,
  description,
  image
) {
  try {
    const accounts = await web3.eth.getAccounts();
    await factoryInstance.methods
      .createCampaign(minimum, targetAmount, title, description, image)
      .send({
        from: accounts[0],
      });
  } catch (err) {
    console.log(err.message);
    throw new Error("There was some error creating campaign!");
  }
}

export async function getCampaign(address) {
  let campaignData;
  try {
    const accounts = await web3.eth.getAccounts();
    const campaign = campaignInstance(address);
    const summary = await campaign.methods.getSummary().call();
    const isContributor = await campaign.methods
      .isContributer()
      .call({ from: accounts[0] });
    campaignData = {
      title: summary[0],
      description: summary[1],
      image: summary[2],
      targetAmount: summary[3],
      minimumContribution: summary[4],
      amountCollected: summary[5],
      balance: summary[6],
      requestsCount: summary[7],
      contributorCount: summary[8],
      manager: summary[9],
      isContributor,
    };
  } catch (err) {
    console.log(err.message);
    throw new Error("There was some error fetching campaign data!");
  }
  return campaignData;
}

export async function contributeToCampaign(address, value) {
  try {
    const accounts = await web3.eth.getAccounts();
    const campaign = campaignInstance(address);
    await campaign.methods.contribute().send({
      from: accounts[0],
      value,
    });
  } catch (err) {
    console.log(err.message);
    throw new Error("There was some error contributing to campaign!");
  }
}

export async function campaignRequest(address, description, amount, recipient) {
  try {
    const accounts = await web3.eth.getAccounts();
    const campaign = campaignInstance(address);
    await campaign.methods.createRequest(description, amount, recipient).send({
      from: accounts[0],
    });
  } catch (err) {
    console.log(err.message);
    throw new Error("There was some error requesting for campaign funds!");
  }
}

export async function getCampaignRequests(address) {
  let requests, requestsStatus, isContributor, isManager, contributorCount;
  try {
    const accounts = await web3.eth.getAccounts();
    const campaign = campaignInstance(address);
    requests = await campaign.methods.getRequests().call();
    requestsStatus = await Promise.all(
      Array(requests.length)
        .fill()
        .map((el, idx) => {
          return campaign.methods.checkApprovalStatus(idx).call();
        })
    );
    contributorCount = await campaign.methods.contributerCount().call();
    isContributor = await campaign.methods
      .isContributer()
      .call({ from: accounts[0] });
    isManager = await campaign.methods.isManager().call({ from: accounts[0] });
  } catch (err) {
    console.log(err.message);
    throw new Error("There was some error fetching campaign requests!");
  }
  return {
    requests,
    requestsStatus,
    isContributor,
    isManager,
    contributorCount,
  };
}

export async function approveRequest(address, requestIndex) {
  try {
    const accounts = await web3.eth.getAccounts();
    const campaign = campaignInstance(address);
    await campaign.methods.approveRequest(requestIndex).send({
      from: accounts[0],
    });
  } catch (err) {
    console.log(err.message);
    throw new Error("There was some error approving the request!");
  }
}

export async function finalizeRequest(address, requestIndex) {
  try {
    const accounts = await web3.eth.getAccounts();
    const campaign = campaignInstance(address);
    await campaign.methods.finalizeRequest(requestIndex).send({
      from: accounts[0],
    });
  } catch (err) {
    console.log(err.message);
    throw new Error("There was some error finalizing the request!");
  }
}
