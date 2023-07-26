import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCampaignForm from "./CreateCampaignForm";

function AddCampaign() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="create-campaign-form">
          <Button>Create new Campaign</Button>
        </Modal.Open>
        <Modal.Window name="create-campaign-form">
          <CreateCampaignForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddCampaign;
