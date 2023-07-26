import styled from "styled-components";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 10rem;
  width: auto;
`;

const Span = styled.h3`
  font-family: "PT Sans", sans-serif;
`;

function Logo() {
  return (
    <StyledLogo>
      <Img src="/logo1.png" />
      <Span>funDApp</Span>
    </StyledLogo>
  );
}

export default Logo;
