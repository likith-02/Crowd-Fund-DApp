import { styled } from "styled-components";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { MdCheckCircle, MdDoneAll } from "react-icons/md";
import useApproveRequest from "./useApproveRequest";
import useFinalizeRequest from "./useFinalizeRequest";
import Tag from "../../ui/Tag";
import Modal from "../../ui/Modal";
import ConfirmAction from "../../ui/ConfirmAction";

const RequestId = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Description = styled.div`
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--color-grey-700);
  font-family: "Sono";
`;

const Recipient = styled.div`
  font-size: 1.5rem;
  font-weight: 400;
  color: var(--color-grey-700);
  font-family: "Sono";
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const ApprovalCount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const statusToTagName = {
  pending: "blue",
  approved: "green",
  finalized: "silver",
};

function RequestRow({ request }) {
  const { isApprovingRequest, approveRequest } = useApproveRequest();
  const { isFinalizingRequest, finalizeRequest } = useFinalizeRequest();
  const {
    id,
    description,
    amount,
    recipient,
    status,
    approvalCount,
    contributorCount,
    isContributor,
    isManager,
  } = request;
  return (
    <Table.Row>
      <RequestId>{id}</RequestId>
      <Description>{description}</Description>
      <Amount>{amount}</Amount>
      <Recipient>{recipient}</Recipient>
      <Tag type={statusToTagName[status]}>{status}</Tag>
      <ApprovalCount>
        {approvalCount}/{contributorCount}
      </ApprovalCount>
      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={id} />
          <Menus.List id={id}>
            <Modal.Open opens="approve">
              <Menus.Button
                icon={<MdCheckCircle size={24} color="#00CC00" />}
                disabled={isApprovingRequest || !isContributor}
              >
                Approve Request
              </Menus.Button>
            </Modal.Open>

            {isManager && (
              <Modal.Open opens="finalize">
                <Menus.Button
                  icon={<MdDoneAll size={24} color="#008000" />}
                  disabled={isFinalizingRequest}
                >
                  Finalize Request
                </Menus.Button>
              </Modal.Open>
            )}
          </Menus.List>
        </Menus.Menu>
        <Modal.Window name="approve">
          <ConfirmAction
            action="approve"
            resource="request"
            variation="success"
            onConfirm={() => approveRequest(id - 1)}
            disabled={isApprovingRequest || !isContributor}
          />
        </Modal.Window>
        <Modal.Window name="finalize">
          <ConfirmAction
            action="finalize"
            resource="request"
            variation="danger"
            onConfirm={() => finalizeRequest(id - 1)}
            disabled={isFinalizingRequest}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default RequestRow;
