import React from "react";
import styled from "styled-components";
import FlexGrid from "../elements/FlexGrid";
import Text from "../elements/Text";
import Image from "../elements/Image";
import { onbordingData } from "../data/onbording";
import Portal from "../shared/Portal";

const Onboarding = () => {
  // 이미지 url리스트
  const [page, setPage] = React.useState(0); // 현재 페이지를 나타내는 state
  const [storage, setStorage] = React.useState(
    localStorage.getItem("onboarding")
  );

  const nextPage = () => {
    if (page === 2) {
      start();
    }
    setPage(page < onbordingData.length - 1 ? page + 1 : 0);
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
    <Portal>
      <OnboardingWrap center is_column>
        <FlexGrid is_column between height="100%">
          <FlexGrid center>
            <Text size="headline1" color="orange" weight="black">
              DALKING
            </Text>
          </FlexGrid>

          <FlexGrid is_column center gap="20px">
            {/* 이미지와 안내문구 표시해줄 영역 */}
            <FlexGrid overflow="hidden" gap="0">
              {onbordingData.map((el, i) => {
                return (
                  <List is_column center page={page} key={el.img}>
                    <Image src={el.img} width="75%" />
                    <Text size="gnb" weight="medium" lineHeight="28px">
                      {el.message}
                    </Text>
                  </List>
                );
              })}
            </FlexGrid>

            <FlexGrid center gap="17px">
              {/* 페이지 수만큼 동그라미 버튼 생성 */}
              {onbordingData.map((el, i) => {
                return (
                  <CircleBtn
                    key={el.img}
                    onClick={() => setPage(i)}
                    state={i === page}
                  />
                );
              })}
            </FlexGrid>
          </FlexGrid>

          <FlexGrid is_column>
            <Button center _onClick={nextPage}>
              <Text size="headline2" weight="bold" color="white">
                {page !== 2 ? "다음으로" : "시작하기"}
              </Text>
            </Button>
            <PassBtn center _onClick={start}>
              <Text size="body2" weight="regular">
                건너뛰기
              </Text>
            </PassBtn>
          </FlexGrid>
        </FlexGrid>
      </OnboardingWrap>
    </Portal>
  );
};
const List = styled(FlexGrid)`
  gap: 28px;
  text-align: center;
  flex: 0 0 auto;
  transition: 0.3s;
  --page: ${(props) => props.page * -100}%;
  transform: translateX(var(--page));
`;

const Button = styled(FlexGrid)`
  height: 72px;

  background-color: ${(props) => props.theme.color.orange};
  color: white;
  border-radius: 10px;
  cursor: pointer;
`;

const PassBtn = styled(FlexGrid)`
  height: 72px;
  text-decoration: underline;
`;

const CircleBtn = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: ${(props) => (props.state ? "black" : "#cfcfcf")};
`;

const OnboardingWrap = styled(FlexGrid)`
  height: 100%;
  background-color: white;
  position: absolute;
  top: 0;

  z-index: 5;
  padding: 16px;
`;

export default Onboarding;
