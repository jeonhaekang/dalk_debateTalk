import ContentContainer from "../../elements/Container";
import NewHeader from "../../shared/NewHeader";
import guide from "../../image/mypage/guied.jpg";
import styled from "styled-components";

const Guide = () => {
  return (
    <>
      <NewHeader page="토론 안내" />
      <ContentContainer Xfooter>
        <GuideImage src={guide} alt="guide" />
      </ContentContainer>
    </>
  );
};

const GuideImage = styled.img`
  width: 100%;
`;

export default Guide;
