import React from "react";
import styled from "styled-components";
import FlexGrid from "../elements/FlexGrid";

import onboarding1 from "../image/onboarding/onboarding1.png";
import onboarding2 from "../image/onboarding/onboarding2.png";
import onboarding3 from "../image/onboarding/onboarding3.png";
import onboarding4 from "../image/onboarding/onboarding4.png";
import testlogo from "../image/testlogo.jpeg";

const Onboarding = () => {
  const imageList = [onboarding1, onboarding2, onboarding3, onboarding4];
  const [page, setPage] = React.useState(0);

  const nextPage = () => {
    imageList.length - 1 > page ? setPage(page + 1) : setPage(0);
  };

  const start = () => {
    localStorage.setItem("onboarding", true);
  };

  if (localStorage.getItem("onboarding")) {
    return null;
  }
  return (
    <OnboardingWrap center is_column gap="30px">
      <IMG src={imageList[page]} />
      <FlexGrid center>
        {imageList.map((el, i) => {
          return <CircleBtn key={el} onClick={() => setPage(i)} />;
        })}
      </FlexGrid>
      <FlexGrid is_column gap="0">
        <Button center onClick={nextPage}>
          다음페이지
        </Button>
        <Button center onClick={start}>
          시작하기
        </Button>
      </FlexGrid>
    </OnboardingWrap>
  );
};
const Button = styled.button`
  width: 100%;
  padding: 10px;
  border: none;
`;

const CircleBtn = styled.button`
  width: 10px;
  height: 10px;
  border: none;
  border-radius: 5px;
  background-color: #cfcfcf;
`;

const OnboardingWrap = styled(FlexGrid)`
  height: 100vh;
  background-color: white;
  z-index: 999;
  position: absolute;
  top: 0;
`;

const IMG = styled.div`
  width: 60%;
  padding-top: 75%;
  background-image: url(${(props) => props.src});
  background-color: black;
  background-size: cover;
  border-radius: 15px;
`;

export default Onboarding;
