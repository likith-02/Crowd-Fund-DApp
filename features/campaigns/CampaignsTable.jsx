import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import CampaignRow from "./CampaignRow";
import useCampaigns from "./useCampaigns";

function CampaignsTable() {
  const { isLoadingCampaigns, campaigns } = useCampaigns();
  if (isLoadingCampaigns) return <Spinner />;
  return (
    <Menus>
      <Table columns="0.1fr 0.5fr 0.9fr 0.2fr 0.1fr">
        <Table.Header>
          <div></div>
          <div>Title</div>
          <div>Campaign Address</div>
          <div>Contributors</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={campaigns}
          render={(campaign, idx) => (
            <CampaignRow key={idx} campaign={campaign} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default CampaignsTable;
