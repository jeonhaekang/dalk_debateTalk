import Header from "../shared/Header";
import Footer from "../shared/Footer";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../redux/modules/chat";
import MainCard from "../components/main/MainCard";
import XScrollDrag from "../components/shared/XScrollDrag";
import Chip from "../elements/Chip";
import Grid from "../elements/Grid";
import FlexGrid from "../elements/FlexGrid";
import ContentContainer from "../elements/Container";

const More = () => {
  const dispatch = useDispatch();

  const CategoryList = [
    "연애",
    "정치",
    "게임",
    "음식",
    "유머",
    "헬프",
    "망상",
    "운동",
    "기타",
  ];

  React.useEffect(() => {
    dispatch(actionCreators.loadAllRoomDB());
  }, []);

  const roomList = useSelector((state) => state.chat.roomList);

  return (
    <>
      <Header page="토론리스트" />
      <ContentContainer>
        <FlexGrid is_column gap="15px" padding="15px">
          <Grid fontSize="24px" fontWeight="bold">
            실시간 HOT한 토론에
            <br />
            참여해보세요
          </Grid>
          <XScrollDrag>
            {CategoryList.map((el, i) => {
              return <Chip key={i}>{el}</Chip>;
            })}
          </XScrollDrag>
          {roomList &&
            roomList.map((el, i) => {
              return <MainCard key={i} {...el} />;
            })}
        </FlexGrid>
      </ContentContainer>
      <Footer />
    </>
  );
};

export default More;
