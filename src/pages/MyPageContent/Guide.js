import Container from "../../elements/Container";
import Header from "../../shared/Header";
import guide from "../../image/mypage/guied.jpg";
import styled from "styled-components";

const Guide = () => {
  return (
    <>
      <Header page="토론 안내" />
      <Container>
        <GuideImage src={guide} alt="guide" />
      </Container>
    </>
  );
};

const GuideImage = styled.img`
  width: 100%;
`;

export default Guide;
