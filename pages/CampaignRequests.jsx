import web3 from "../ethereum/web3";
import RequestRow from "../features/campaign requests/RequestRow";
import useCampaignRequests from "../features/campaign requests/useCampaignRequests";
import Spinner from "../ui/Spinner";
import Table from "../ui/Table";
import Menus from "../ui/Menus";
import { useMoveBack } from "../hooks/useMoveBack";
import Row from "../ui/Row";
import Heading from "../ui/Heading";
import ButtonText from "../ui/ButtonText";
import { useParams } from "react-router-dom";
import AddCampaignRequest from "../features/campaign requests/AddCampaignRequest";

function CampaignRequests() {
  const { campaignId } = useParams();
  const moveBack = useMoveBack();
  const {
    isLoadingCampaignRequests,
    requests: campaignRequests,
    requestsStatus,
    isContributor,
    isManager,
    contributorCount,
  } = useCampaignRequests();
  if (isLoadingCampaignRequests) return <Spinner />;
  const requestData = campaignRequests.map((request, idx) => {
    return {
      id: idx + 1,
      description: request[0],
      amount: web3.utils.fromWei(request[1], "ether"),
      recipient: request[2],
      status: request[5] === "finalized" ? request[5] : requestsStatus[idx],
      approvalCount: parseInt(request[3]),
      contributorCount: parseInt(contributorCount),
      isContributor,
      isManager,
    };
  });

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">#{campaignId} Campaign Requests</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>
      <Row>
        <Menus>
          <Table columns="0.1fr 0.5fr 0.4fr 0.9fr 0.3fr 0.3fr 0.1fr">
            <Table.Header>
              <div>id</div>
              <div>Description</div>
              <div>Amount (ether)</div>
              <div>Recipient</div>
              <div>Status</div>
              <div>Approval Count</div>
              <div></div>
            </Table.Header>
            <Table.Body
              data={requestData}
              render={(request) => (
                <RequestRow key={request.id} request={request} />
              )}
            />
          </Table>
        </Menus>
        <AddCampaignRequest />
      </Row>
    </>
  );
}

export default CampaignRequests;
