// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract FactoryCampaign {
    address[] public campaigns;

    function createCampaign(
        uint minimum,
        uint targetToAchieve,
        string memory campaignName,
        string memory campaignDescription,
        string memory campaignImageURL
    ) public {
        address newCampaign = address(
            new Campaign(
                minimum,
                targetToAchieve,
                campaignName,
                campaignDescription,
                campaignImageURL,
                msg.sender
            )
        );
        campaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (address[] memory) {
        return campaigns;
    }
}

contract Campaign {
    struct Request {
        string description;
        uint amount;
        address payable recipient;
        uint approvalCount;
        uint approvalSum;
        string status;
    }
    Request[] public requests;
    mapping(address => bool)[] requestApprovers;
    address public manager;
    string public campaignName;
    string public campaignDescription;
    string public campaignImageURL;
    uint public campaignTarget;
    uint public minContribution;
    mapping(address => uint) public contributers;
    uint public contributerCount;
    uint public amountCollected = 0;
    uint private sigmaXSquare = 0;

    constructor(
        uint minimum,
        uint targetToAchieve,
        string memory name,
        string memory description,
        string memory imageURL,
        address creator
    ) {
        minContribution = minimum;
        manager = creator;
        campaignName = name;
        campaignDescription = description;
        campaignImageURL = imageURL;
        campaignTarget = targetToAchieve;
    }

    modifier restrictToManager() {
        require(msg.sender == manager);
        _;
    }

    function sqrt(uint x) internal pure returns (uint) {
        if (x == 0) return 0;
        uint z = (x + 1) / 2;
        uint y = x;
        while (z < y) {
            y = z;
            z = (x / z + z) / 2;
        }
        return y;
    }

    function isManager() external view returns (bool) {
        return bool(manager == msg.sender);
    }

    function contribute() public payable {
        require(contributers[msg.sender] == 0);
        require(msg.value >= minContribution);
        contributers[msg.sender] = msg.value;
        contributerCount++;
        amountCollected += msg.value;
        sigmaXSquare += (msg.value) ** 2;
    }

    function isContributer() external view returns (bool) {
        return bool(contributers[msg.sender] > 0);
    }

    function createRequest(
        string memory description,
        uint amount,
        address payable recipient
    ) public restrictToManager {
        requests.push();
        Request storage newRequest = requests[requests.length - 1];
        newRequest.description = description;
        newRequest.amount = amount;
        newRequest.recipient = recipient;
        newRequest.status = "pending";
        requestApprovers.push();
    }

    function approveRequest(uint requestIdx) public {
        Request storage request = requests[requestIdx];
        require(contributers[msg.sender] > 0);
        require(!requestApprovers[requestIdx][msg.sender]);
        request.approvalCount++;
        requestApprovers[requestIdx][msg.sender] = true;
        request.approvalSum += contributers[msg.sender];
    }

    function checkApprovalStatus(
        uint requestIdx
    ) public view returns (string memory) {
        Request storage request = requests[requestIdx];
        if (contributerCount <= 1) {
            if (request.approvalCount == 1) return "approved";
            else return "pending";
        }
        uint256 mu = amountCollected / contributerCount;
        uint256 sd = sqrt(
            (sigmaXSquare - ((amountCollected ** 2) / contributerCount)) /
                (contributerCount - 1)
        );
        uint256 approvalWeight = ((request.approvalSum * 50) /
            amountCollected) +
            ((request.approvalCount * 50) / contributerCount);
        uint quota = 51;
        if (mu >= 2 * sd && request.amount < (mu - 2 * sd)) quota -= 6;
        else if (mu >= sd && request.amount < (mu - sd)) quota -= 4;
        else if (request.amount < mu) quota -= 2;
        else if (mu < request.amount && request.amount < (mu + sd)) quota += 2;
        else if (request.amount < (mu + 2 * sd)) quota += 4;
        else quota += 6;
        if (approvalWeight >= quota) return "approved";
        else return "pending";
    }

    function finalizeRequest(uint requestIdx) public restrictToManager {
        Request storage request = requests[requestIdx];
        require(
            keccak256(bytes(checkApprovalStatus(requestIdx))) ==
                keccak256(bytes("approved"))
        );
        require(request.amount <= address(this).balance);
        request.recipient.transfer(request.amount);
        request.status = "finalized";
    }

    function getSummary()
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            uint,
            uint,
            uint,
            uint,
            uint,
            uint,
            address
        )
    {
        return (
            campaignName,
            campaignDescription,
            campaignImageURL,
            campaignTarget,
            minContribution,
            amountCollected,
            address(this).balance,
            requests.length,
            contributerCount,
            manager
        );
    }

    function getRequests() public view returns (Request[] memory) {
        return requests;
    }
}
