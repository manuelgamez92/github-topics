import styled from "styled-components";

const Container = styled.div`
   text-align:left;
   margin:0px;
   width:100%l
`;

const  MainTitle= styled.h1`
   color:#6A6969;
`;
const Title = ({ children }) => {
  return (
    <Container>
      <MainTitle>{children}</MainTitle>
    </Container>
  );
};

export default Title;
