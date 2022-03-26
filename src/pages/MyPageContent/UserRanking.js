import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { rank, discriminant } from "../../data/rank";
import { actionCreators as alertAction } from "../../redux/modules/alert";
import apis from "../../shared/apis";

import Grid from "../../elements/Grid";
import NewHeader from "../../shared/NewHeader";
import FlexGrid from "../../elements/FlexGrid";
import Text from "../../elements/Text";
import RankingBar from "../../components/mypage/RankingBar";

const UserRanking = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [RankingList, setRankingList] = useState([]);
  //4등부터 보여주기
  const SliceRankingList = RankingList.slice(3);

  const userRank = rank[discriminant(user?.ex, user?.rank)];

  const topUser = [RankingList[1], RankingList[0], RankingList[2]];

  useEffect(() => {
    apis
      .rank()
      .then((res) => {
        setRankingList(res.data);
      })
      .catch((err) => {
        dispatch(
          alertAction.open({
            message: "랭킹 조회 실패",
          })
        );
      });
  }, []);

  // 내 등수 찾기
  const _myrank = (nickname) => nickname == user?.nickname;
  const myrank = RankingList.map((r) => r.nickname).findIndex(_myrank);

  return (
    <>
      <NewHeader page="유저랭킹" />
      <RankingWrap>
        {/* 랭킹바 부분 */}
        {RankingList.length !== 0 && <RankingBar topUser={topUser} />}

        <FlexGrid between padding="12px 28px 0px 28px">
          <Text>랭킹</Text>
          <Text>닉네임</Text>
          <Text marginRight="10px">EXP</Text>
        </FlexGrid>

        <Grid padding="12px 24px 24px 24px">
          {SliceRankingList.map((r, idx) => {
            return (
              <div key={idx}>
                <ListWrap>
                  <RankingBox>{idx + 4}</RankingBox>
                  <GradeLevel>
                    <Grid display="flex">
                      <LevelImgList
                        src={rank[discriminant(r.ex)].img}
                      ></LevelImgList>
                      <div style={{ fontSize: "16px", fontWeight: "400" }}>
                        {r.nickname}
                      </div>
                    </Grid>

                    <div style={{ fontSize: "16px", fontWeight: "400" }}>
                      {r.ex.toLocaleString("ko-KR")}
                    </div>
                  </GradeLevel>
                </ListWrap>
              </div>
            );
          })}
        </Grid>

        <Me>
          <MyGradeLevel style={{ backgroundColor: "#fff" }}>
            <RankingBox>{myrank + 1}</RankingBox>
            <Grid display="flex">
              <LevelImgList src={userRank.img}></LevelImgList>
              <div style={{ fontSize: "16px", fontWeight: "400" }}>
                {user?.nickname}
              </div>
            </Grid>
            <div style={{ fontSize: "16px", fontWeight: "400" }}>
              {user?.ex}
            </div>
          </MyGradeLevel>
        </Me>
      </RankingWrap>
    </>
  );
};

const ListWrap = styled.div`
  display: flex;
  align-items: center;
`;

const RankingWrap = styled.div`
  height: calc(100% - 90px);
  overflow-x: hidden;
  overflow-y: scroll;
  background-color: white;
`

const GradeLevel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 12px 0px 36px;
  padding-bottom: 8px;
  border-bottom: 2px solid #e7e7e7;
  width: 290px;
`;

const RankingBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  background-color: #fdb178;
  font-size: 18px;
  font-weight: bolder;
`;

const LevelImgList = styled.img`
  width: 30px;
  margin-right: 10px;
`;

const MyGradeLevel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 11px 16px;
  height: 54px;
  border-radius: 15px;
  background-color: #fff;
`;

const Me = styled.div`
  position: absolute;
  bottom: 0;
  padding: 14px 16px;
  width: 100%;
  height: 84px;
  background-color: #f0f0f0;
`;

export default UserRanking;
