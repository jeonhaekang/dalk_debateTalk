import React from "react";
import NewHeader from "../shared/NewHeader";
import Footer from "../shared/Footer";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../redux/modules/chat";

import ContentContainer from "../elements/Container";

import FlexGrid from "../elements/FlexGrid";
import MainCarousel from "../components/main/MainCarousel";
import TopRank from "../components/main/TopRank";
import XScrollDrag from "../components/shared/XScrollDrag";
import MainCategoryCard from "../components/main/MainCategoryCard";
import MainCard from "../components/main/MainCard";
import styled from "styled-components";
import { history } from "../redux/configStore";
import Text from "../elements/Text";
import fireDalk from "../image/shared/fireDalk.svg";
import reset from "../image/shared/reset.svg";
import empty from "../image/shared/emptyRoom.svg";

const Main = (props) => {
  const dispatch = useDispatch();

  const roomList = useSelector((state) => state.chat.roomList);
  // roomList가 비어있으면 서버에서 데이터 가져옴
  React.useEffect(() => {
    dispatch(actionCreators.loadMainRoomDB());

    return () => dispatch(actionCreators.clear());
  }, []);

  const refresh = () => {
    dispatch(actionCreators.loadMainRoomDB());
  };

  return (
    <>
      <NewHeader page="메인" />

      <ContentContainer>
        {/* 캐러셀 */}
        <MainCarousel />
        {/* 1,2,3등 */}
        <TopRank />

        {/* 채팅방 컨텐츠 3개 -> 추천 카테고리 -> 3개 */}
        <FlexGrid is_column padding="24px" gap="22px">
          <FlexGrid paddingBottom="58px" between alignItems="flex-start">
            <Text size="headline1" weight="medium" lineHeight="38px">
              실시간 HOT한
              <br /> 토론에 참여해보세요!
            </Text>
            <img
              alt="reset"
              onClick={refresh}
              src={reset}
              style={{ zIndex: 1 }}
            />
          </FlexGrid>

          {roomList.length !== 0 ? (
            <FlexGrid is_column gap="24px">
              <FireDalk src={fireDalk} />
              {roomList.map((el, i) => {
                if (i < 3)
                  return <MainCard key={el.roomId} {...el} page="main" />;
              })}

              {/* 추천 카테고리 */}
              <CategoryTap is_column>
                <FlexGrid is_column padding="0 24px">
                  <Text size="body1">일상토론 찾아보기</Text>
                  <Text size="headline2" weight="medium">
                    다양한 주제로 토론에 참여해보세요!
                  </Text>
                </FlexGrid>
                <XScrollDrag gap="16px" padding="0 24px">
                  <MainCategoryCard />
                </XScrollDrag>
              </CategoryTap>

              {roomList.map((el, i) => {
                if (i >= 3) return <MainCard key={i} {...el} page="main" />;
              })}
              {/* 더보기 버튼 */}
              <MoreButton onClick={() => history.push("/more")}>
                더 많은 토론보기 &gt;
              </MoreButton>
            </FlexGrid>
          ) : (
            <FlexGrid center is_column textAlign="center">
              <img alt="empty" src={empty} />
              <Text>
                아직 방이 없어요
                <br />
                방을 생성해주세요!
              </Text>
            </FlexGrid>
          )}
        </FlexGrid>
      </ContentContainer>

      <Footer />
    </>
  );
};

const CategoryTap = styled(FlexGrid)`
  width: calc(100% + 48px);
  background-color: #faede1;
  padding: 24px 0 0 0;
  margin: 0 -24px;
`;

const MoreButton = styled.div`
  margin: 31px 0 58px 0;
  font-size: ${(props) => props.theme.fontSizes.subtitle1};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  text-align: center;
`;

const FireDalk = styled.img`
  max-width: 219px;

  position: absolute;
  right: -20px;
  top: -155px;
`;

export default Main;
