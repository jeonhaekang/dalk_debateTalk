import React from "react";
import Header from "../shared/Header";
import Grid from "../elements/Grid";
import MainCarousel from "../components/main/MainCarousel";
import TopRank from "../components/main/TopRank";
import MainCard from "../components/main/MainCard";
import MainCategoryCard from "../components/main/MainCategoryCard";
import styled from "styled-components";

const Main = (props) => {
  const userRankList = ["카리스마 대빵 큰 오리", "카리스마 오리", "큰 오리"];

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
            <MainCard />
            <MainCard />
            <Grid>이런 주제로도 토론해요!!</Grid>
            <CategoryBox>
              <MainCategoryCard />
              <MainCategoryCard />
              <MainCategoryCard />
              <MainCategoryCard />
              <MainCategoryCard />
              <MainCategoryCard />
              <MainCategoryCard />
            </CategoryBox>
            <MainCard />
            <MainCard />
            <MainCard />
          </Grid>
          <Grid>토론 더보기</Grid>
        </Grid>
      </Grid>
    </>
  );
};

Main.defaultProps = {};

const CategoryBox = styled.div`
  display: flex;
  flex-wrap: nowrap; // 넘쳐도 줄바꿈 X, white-space: no-wrap과 같은 효과
  overflow-x: scroll; // x축 넘치면 스크롤 생성
  gap: 10px;
`;

export default Main;
