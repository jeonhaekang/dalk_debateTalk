import React from "react";
import Grid from "../../elements/Grid";
import MainCarousel from "./MainCarousel";
import TopRank from "./TopRank";
import MainCard from "./MainCard";
import MainCategoryCard from "./MainCategoryCard";
import Modal from "../shared/Modal";
import CreateRoom from "../shared/CreateRoom";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../redux/modules/chat";

const MainComponent = (props) => {
  const dispatch = useDispatch();
  const userRankList = ["카리스마 대빵 큰 오리", "카리스마 오리", "큰 오리"];
  const [createModalState, setCreateModalState] = React.useState(false);

  const roomList = useSelector((state) => state.chat.roomList);

  React.useEffect(() => {
    dispatch(actionCreators.loadAllRoomDB());
  }, []);

  return (
    <>
      <Grid
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        gap="10px"
      >
        <MainCarousel />
        <TopRank userRankList={userRankList} />
        <Grid
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          gap="10px"
        >
          {roomList.map((el, key) => {
            return <MainCard key={el.roomId} {...el} />;
          })}
          {/* <MainCard warnCnt="10" /> */}
          <Grid>이런 주제로도 토론해요!!</Grid>
          <MainCategoryCard />
        </Grid>
        <Grid>토론 더보기</Grid>

        {/* 채팅방 생성 모달 */}
        <Modal
          modalState={createModalState}
          setModalState={setCreateModalState}
        >
          <CreateRoom />
        </Modal>
      </Grid>
    </>
  );
};

export default MainComponent;
