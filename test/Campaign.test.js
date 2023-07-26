const assert = require("assert");
const ganache = require("ganache");
const { Web3 } = require("web3");

const web3 = new Web3(ganache.provider());

const compiledFactory = require("../ethereum/build/FactoryCampaign.json");
const compiledCampaign = require("../ethereum/build/Campaign.json");

// updated ganache and web3 imports added for convenience

// contract test code will go here
let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  factory = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({
      data: compiledFactory.evm.bytecode.object,
    })
    .send({ from: accounts[0], gas: "1500000" });

  await factory.methods
    .createCampaign("100")
    .send({ from: accounts[0], gas: "1500000" });

  [campaignAddress] = await factory.methods.getDeployedCampaigns().call();
  campaign = new web3.eth.Contract(compiledCampaign.abi, campaignAddress);
});

describe("Campaigns", () => {
  it("deploys a factory and a compaign", () => {
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
  });

  it("caller as campaign manager", async () => {
    const manager = await campaign.methods.manager().call();

    assert.strictEqual(accounts[0], manager);
  });

  it("contribute money as contributors", async () => {
    await campaign.methods
      .contribute()
      .send({ from: accounts[1], value: "200" });

    const isContributer = await campaign.methods
      .contributers(accounts[1])
      .call();

    assert(isContributer);
  });

  it("requires a minimum contribution", async () => {
    await assert.rejects(
      async () => {
        await campaign.methods
          .contribute()
          .send({ from: accounts[1], value: "10" });
        assert(false);
      },
      (err) => {
        assert(err);
        return true;
      }
    );
  });

  it("allows manager to make payment request", async () => {
    let description = "Buy Battaries";
    let amount = 100;
    let recipient = accounts[1];

    await campaign.methods
      .createRequest(description, amount, recipient)
      .send({ from: accounts[0], gas: "1000000" });

    const request = await campaign.methods.requests(0).call();
    assert.strictEqual(description, request.description);
    assert.strictEqual(amount, parseInt(request.amount));
    assert.strictEqual(recipient, request.recipient);
  });

  it("process requests", async () => {
    let description = "A";
    let ammount = web3.utils.toWei("5", "ether");
    let recipient = accounts[1];

    await campaign.methods.contribute().send({
      from: accounts[0],
      value: web3.utils.toWei("10", "ether"),
    });

    await campaign.methods
      .createRequest(description, ammount, recipient)
      .send({ from: accounts[0], gas: "1000000" });

    await campaign.methods
      .approveRequest(0)
      .send({ from: accounts[0], gas: "1000000" });
    await campaign.methods
      .finalizeRequest(0)
      .send({ from: accounts[0], gas: "1000000" });

    let balance = await web3.eth.getBalance(accounts[1]);
    balance = web3.utils.fromWei(balance, "ether");
    balance = parseFloat(balance);

    assert(balance > 104);
  });
});
