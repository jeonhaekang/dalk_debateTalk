import React from "react";
import Header from "../shared/Header";
import Grid from "../elements/Grid";
import MainCarousel from "../components/main/MainCarousel";
import TopRank from "../components/main/TopRank";
import MainCard from "../components/main/MainCard";
import MainCategoryCard from "../components/main/MainCategoryCard";
import CreateButton from "../components/shared/CreateButton";
import Modal from "../components/shared/Modal";
import CreateRoom from "../components/shared/CreateRoom";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../redux/modules/chat";

const Main = (props) => {
  const dispatch = useDispatch();
  const userRankList = ["카리스마 대빵 큰 오리", "카리스마 오리", "큰 오리"];
  const [createModalState, setCreateModalState] = React.useState(false);

  const roomList = useSelector((state) => state.chat.roomList);

  React.useEffect(() => {
    dispatch(actionCreators.loadAllRoomDB());
  }, []);

  return (
    <>
      <Grid height="100%" overflow="scroll">
        <Header page="메인" />
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
              console.log(el);
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

          <CreateButton _onClick={() => setCreateModalState(true)} />
        </Grid>
      </Grid>
    </>
  );
};

Main.defaultProps = {};

export default Main;
