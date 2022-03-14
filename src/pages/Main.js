import React from "react";
import Header from "../shared/Header";
import Footer from "../shared/Footer";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../redux/modules/chat";

import ContentContainer from "../elements/Container";

import FlexGrid from "../elements/FlexGrid";
import MainCarousel from "../components/main/MainCarousel";
import TopRank from "../components/main/TopRank";
import MainEmpty from "../components/main/MainEmpty";
import Grid from "../elements/Grid";
import XScrollDrag from "../components/shared/XScrollDrag";
import MainCategoryCard from "../components/main/MainCategoryCard";
import MainCard from "../components/main/MainCard";
import styled from "styled-components";
import { history } from "../redux/configStore";
import Text from "../elements/Text";
import fireDalk from "../image/shared/fireDalk.png";
import Image from "../elements/Image";

const Main = (props) => {
  const dispatch = useDispatch();

  const roomList = useSelector((state) => state.chat.roomList);
  // roomList가 비어있으면 서버에서 데이터 가져옴
  React.useEffect(() => {
    dispatch(actionCreators.loadMainRoomDB());
  }, []);

  console.log(roomList);

  return (
    <>
      <Header page="메인" />
      <ContentContainer>
        <FlexGrid is_column>
          <MainCarousel />
          <TopRank />
          <FlexGrid is_column padding="24px" gap="22px">
            <FlexGrid paddingBottom="50px">
              <Text size="subtitle" weight="semiBold">
                실시간 HOT한
                <br /> 토론에 참여해보세요!
              </Text>
            </FlexGrid>
            <FireDalk src={fireDalk} />
            {roomList.map((el, i) => {
              return <MainCard key={i} {...el} page="메인" />;
            })}
          </FlexGrid>
          {/* <MainCard warnCnt="10" /> */}
          {roomList.length === 0 ? (
            // 채팅방이 없을때 표시 화면
            <MainEmpty />
          ) : (
            <>
              <CategoryTap is_column>
                <FlexGrid is_column padding="0 24px">
                  <Text>일상토론 찾아보기</Text>
                  <Text fontSize="23px" fontWeight="600">
                    다양한 주제로 토론에 참여해보세요!
                  </Text>
                </FlexGrid>
                <XScrollDrag gap="16px" padding="0 24px">
                  <MainCategoryCard />
                </XScrollDrag>
              </CategoryTap>
              <FlexGrid is_flex center>
                <MoreButton onClick={() => history.push("/more")}>
                  더 많은 토론보기 &gt;
                </MoreButton>
              </FlexGrid>
            </>
          )}
        </FlexGrid>
      </ContentContainer>
      <Footer />
    </>
  );
};

Main.defaultProps = {};

const CategoryTap = styled(FlexGrid)`
  background-color: #faede1;
  padding: 24px 0 0 0;
`;

const MoreButton = styled.div`
  margin: 47px 0 52px 0;
  font-size: 20px;
  font-weight: ${(props) => props.theme.fontWeight.regular};
`;

const FireDalk = styled.div`
  width: 200px;
  height: 200px;
  background-size: cover;
  background-image: url("${(props) => props.src}");

  position: absolute;
  right: -10px;

  transform: rotate(18.52deg);
`;

export default Main;
