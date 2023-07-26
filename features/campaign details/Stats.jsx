import { RiCoinsLine } from "react-icons/ri";
import { AiOutlineFund, AiOutlineApi } from "react-icons/ai";
import { BsPeopleFill, BsPersonCheckFill } from "react-icons/bs";
import Stat from "./Stat";
import { styled } from "styled-components";

function Stats({
  minimumContribution,
  balance,
  requestsCount,
  contributorCount,
  manager,
}) {
  return (
    <>
      <Stat
        icon={<RiCoinsLine size={24} color="#8a2be2" />}
        title="Campaign Balance"
        value={balance}
        description="Left out balance for this campaign to spend"
        color="purple"
      />
      <Stat
        icon={<AiOutlineFund size={24} color="#008000" />}
        title="Minimum Contribution (Wei)"
        value={minimumContribution}
        description="You must contribute atleast this much wei to become a contributor"
        color="green"
      />
      <Stat
        icon={<AiOutlineApi size={24} color="#ff8c00" />}
        title="Requests"
        value={requestsCount}
        description="A request tries to withdraw money from the contract. Requests must be approved by the contributors"
        color="orange"
      />
      <Stat
        icon={<BsPeopleFill size={24} color="#4169E1" />}
        title="Contributors"
        value={contributorCount}
        description="Number of people who have already donated to the campaign"
        color="blue"
      />
      <Stat
        icon={<BsPersonCheckFill size={24} color="#FFD700" />}
        title="Address of Manager"
        value={manager}
        description="The manager created this campaign and can create requests to withdraw money"
        color="yellow"
      />
    </>
  );
}

export default Stats;
