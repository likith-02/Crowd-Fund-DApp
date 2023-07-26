import { styled } from "styled-components";
import Table from "../../ui/Table";
import { useNavigate } from "react-router-dom";
import Menus from "../../ui/Menus";
import { RiEyeFill } from "react-icons/ri";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  /* transform: scale(1.66666) translateX(-2px); */
  transform: scale(1.5) translateX(-7px);
`;

const Title = styled.div`
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--color-grey-700);
  font-family: "Sono";
`;

const Address = styled.div`
  font-size: 1.5rem;
  font-weight: 400;
  color: var(--color-grey-700);
  font-family: "Sono";
`;

const Contributors = styled.div`
  font-family: "Sono";
  font-weight: 400;
`;

function CampaignRow({ campaign }) {
  const { title, image, address, contributors } = campaign;
  const navigate = useNavigate();

  function handleClick(address) {
    navigate(`/campaigns/${address}`);
  }
  console.log(address);
  return (
    <Table.Row>
      <Img src={image} />
      <Title>{title}</Title>
      <Address>{address}</Address>
      <Contributors>{parseInt(contributors)}</Contributors>
      <Menus.Menu>
        <Menus.Toggle id={address} />
        <Menus.List id={address}>
          <Menus.Button
            icon={<RiEyeFill size={24} color="#4169E1" />}
            onClick={() => handleClick(address)}
          >
            View Campaign
          </Menus.Button>
        </Menus.List>
      </Menus.Menu>
    </Table.Row>
  );
}

export default CampaignRow;
