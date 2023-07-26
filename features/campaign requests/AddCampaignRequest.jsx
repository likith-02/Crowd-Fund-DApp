import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CampaignRequestForm from "./CampaignRequestForm";

function AddCampaignRequest() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="request-form">
          <Button>Create new Request</Button>
        </Modal.Open>
        <Modal.Window name="request-form">
          <CampaignRequestForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddCampaignRequest;
