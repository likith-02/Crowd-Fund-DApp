import AddCampaign from "../features/campaigns/AddCampaign";
import Row from "../ui/Row";
import CampaignsTable from "../features/campaigns/CampaignsTable";
import Heading from "../ui/Heading";

function Campaigns() {
  return (
    <>
      <Row>
        <Heading as="h1">Open Campaigns</Heading>
      </Row>
      <Row>
        <CampaignsTable />
        <AddCampaign />
      </Row>
    </>
  );
}

export default Campaigns;
