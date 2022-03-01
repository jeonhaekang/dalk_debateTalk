import React from "react";
import styled from "styled-components";
import Header from "../shared/Header";
import Grid from "../elements/Grid";
import MainCarousel from "../components/main/MainCarousel";
import TopRank from "../components/main/TopRank";
import MainCard from "../components/main/MainCard";
import MainCategoryCard from "../components/main/MainCategoryCard";
import CreateButton from "../components/shared/CreateButton";
import Modal from "../components/shared/Modal";
import CreateRoom from "../components/shared/CreateRoom";

const Main = (props) => {
  const userRankList = ["카리스마 대빵 큰 오리", "카리스마 오리", "큰 오리"];
  const [createModalState, setCreateModalState] = React.useState(false);

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
            <MainCard />
            <MainCard />
            <MainCard warnCnt="10" />
            <Grid>이런 주제로도 토론해요!!</Grid>
            <MainCategoryCard />
            <MainCard />
            <MainCard />
            <MainCard />
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
