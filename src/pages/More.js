import Header from "../shared/Header";
import Footer from "../shared/Footer";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import { actionCreators as chatAction } from "../redux/modules/chat";
import { actionCreators as infinitiAction } from "../redux/modules/infinityScroll";
import MainCard from "../components/main/MainCard";
import XScrollDrag from "../components/shared/XScrollDrag";
import Chip from "../elements/Chip";
import Grid from "../elements/Grid";
import FlexGrid from "../elements/FlexGrid";
import ContentContainer from "../elements/Container";
import InfinityScroll from "../shared/InfinityScroll";

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
    dispatch(infinitiAction.loadListDB(0, "loadAllRoom"));

    return () => {
      console.log("실행");
      return dispatch(infinitiAction.clear());
    };
  }, []);

  const roomList = useSelector((props) => props.infinityScroll);

  const getRoomList = () => {
    dispatch(infinitiAction.loadListDB(roomList.page, "loadAllRoom"));
  };
  console.log(roomList);
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
          <InfinityScroll
            callNext={getRoomList}
            paging={{ next: roomList.has_next }}
          >
            {roomList.list.map((el, i) => {
              return <MainCard key={i} {...el} />;
            })}
          </InfinityScroll>
        </FlexGrid>
      </ContentContainer>
      <Footer />
    </>
  );
};

export default More;
