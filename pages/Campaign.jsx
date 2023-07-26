import { css, styled } from "styled-components";
import useCampaign from "../features/campaign details/useCampaign";
import Spinner from "../ui/Spinner";
import Stats from "../features/campaign details/Stats";
import web3 from "../ethereum/web3";
import CampaignContributeForm from "../features/campaign details/CampaignContributeForm";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import { useNavigate, useParams } from "react-router-dom";
import Row from "../ui/Row";
import Heading from "../ui/Heading";
import ButtonText from "../ui/ButtonText";
import { useMoveBack } from "../hooks/useMoveBack";
import ButtonGroup from "../ui/ButtonGroup";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 0.5fr;
  grid-template-rows: auto auto auto;
  gap: 2.5rem;
`;

const StyledProduct = styled.div`
  margin-top: 0;
  display: flex;
  justify-content: start;
  align-items: center;
`;

const ProgressBar = styled.div`
  background-color: rgb(215, 214, 214);
  width: 80%;
`;

const ProgressValue = styled.div`
  background-color: rgb(116, 194, 92);
  color: white;
  padding: 1%;
  text-align: right;
  font-size: 20px;
  ${(props) =>
    props.width &&
    css`
      width: ${props.width}%;
    `}
`;

function Campaign() {
  const { campaignId } = useParams();
  const moveBack = useMoveBack();
  const navigate = useNavigate();
  const { isLoadingCampaign, campaignData } = useCampaign();
  if (isLoadingCampaign) return <Spinner />;
  console.log(campaignData);
  const amountCollected = web3.utils.fromWei(
    parseInt(campaignData.amountCollected),
    "ether"
  );
  const targetAmount = web3.utils.fromWei(
    parseInt(campaignData.targetAmount),
    "ether"
  );
  function handleClick() {
    navigate("requests");
  }
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">#{campaignId} Campaign Details</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>
      <StyledProduct>
        <img
          src={campaignData.image}
          style={{ height: "25rem", marginLeft: "10rem" }}
        />
        <div style={{ marginLeft: "10rem" }}>
          <Heading as="h4">{campaignData.title}</Heading>
          <Heading as="h3">{campaignData.description}</Heading>
          <Row
            style={{
              display: "flex",
              alignItems: "center",
              margin: "1rem",
            }}
          >
            <ProgressBar>
              <ProgressValue width={(amountCollected / targetAmount) * 100} />
            </ProgressBar>
            <Heading as="h2">
              Pledged{" "}
              <b>
                {amountCollected}/{targetAmount}
              </b>{" "}
              ether goal
            </Heading>
          </Row>
        </div>
      </StyledProduct>
      <StyledDashboardLayout>
        <Stats
          minimumContribution={parseInt(campaignData.minimumContribution)}
          balance={`${web3.utils.fromWei(
            parseInt(campaignData.balance),
            "ether"
          )} ether`}
          requestsCount={parseInt(campaignData.requestsCount)}
          contributorCount={parseInt(campaignData.contributorCount)}
          manager={campaignData.manager}
        />
      </StyledDashboardLayout>
      <ButtonGroup>
        {!campaignData.isContributor && (
          <Modal>
            <Modal.Open opens="contribute-form">
              <Button>Contribute to Campaign</Button>
            </Modal.Open>
            <Modal.Window name="contribute-form">
              <CampaignContributeForm />
            </Modal.Window>
          </Modal>
        )}
        <Button onClick={handleClick}>Show all Requests</Button>
      </ButtonGroup>
    </>
  );
}

export default Campaign;
