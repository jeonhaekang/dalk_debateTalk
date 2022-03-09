import React from "react";
import styled from "styled-components";
import FlexGrid from "../elements/FlexGrid";

import onboarding1 from "../image/onboarding/onboarding1.png";
import onboarding2 from "../image/onboarding/onboarding2.png";
import onboarding3 from "../image/onboarding/onboarding3.png";
import onboarding4 from "../image/onboarding/onboarding4.png";

const Onboarding = () => {
  const imageList = [onboarding1, onboarding2, onboarding3, onboarding4];
  // 이미지 url리스트
  const [page, setPage] = React.useState(0); // 현재 페이지를 나타내는 state
  const [storage, setStorage] = React.useState(
    localStorage.getItem("onboarding")
  );

  const nextPage = () => {
    setPage(page < imageList.length - 1 ? page + 1 : 0);
  };

  React.useEffect(() => {
    const time = setInterval(nextPage, 5000);

    return () => {
      clearInterval(time);
    };
  });

  const start = () => {
    localStorage.setItem("onboarding", true);
    // 시작하기 버튼 클릭시 로컬스토리지에 기록 남김
    setStorage(localStorage.getItem("onboarding"));
  };
  if (storage) {
    return null;
    // 로컬 스토리지에 기록 없을때만 온보딩 표시
  }
  return (
    <OnboardingWrap center is_column gap="30px">
      {/* 이미지를 표시해줄 영역 */}
      <Frame>
        {imageList.map((el) => {
          return <IMG page={page} src={el} key={el} />;
        })}
      </Frame>
      <FlexGrid center>
        {imageList.map((el, i) => {
          // 페이지 수만큼 동그라미 버튼 생성
          return (
            <CircleBtn key={el} onClick={() => setPage(i)} state={i === page} />
          );
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
const Frame = styled.div`
  width: 200px;
  height: 200px;
  gap: 0;

  overflow: hidden;
  display: flex;
  border-radius: 15px;
`;
const IMG = styled.div`
  width: 100%;
  padding-top: 100%;
  background-image: url(${(props) => props.src});
  background-color: black;
  background-size: cover;

  flex: 0 0 auto;
  transition: 0.3s;
  --page: ${(props) => props.page * -100}%;
  transform: translateX(var(--page));
`;

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
  background-color: ${(props) => (props.state ? "black" : "#cfcfcf")};
`;

const OnboardingWrap = styled(FlexGrid)`
  height: 100vh;
  background-color: white;
  z-index: 999;
  position: absolute;
  top: 0;
`;

export default Onboarding;
