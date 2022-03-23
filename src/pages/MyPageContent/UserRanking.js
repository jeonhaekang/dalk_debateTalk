import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useSelector } from "react-redux";
import { rank, discriminant } from "../../data/rank";
import apis from "../../shared/apis";

import rankfirst from "../../image/rank/rankfirst.svg"
import ranksecond from "../../image/rank/ranksecond.svg"
import rankthird from "../../image/rank/rankthird.svg"

import Grid from "../../elements/Grid";
import NewHeader from "../../shared/NewHeader";
import ContentContainer from "../../elements/Container";
import FlexGrid from "../../elements/FlexGrid";
import Text from "../../elements/Text";

const UserRanking = () => {
  const user = useSelector((state) => state.user.user);
  const [RankingList, setRankingList] = useState([]);
  //4등부터 보여주기
  const SliceRankingList = RankingList.slice(3);

  const userRank = rank[discriminant(user?.ex, user?.rank)];

  const first = rank[discriminant(null, RankingList[0]?.rank)];
  const second = rank[discriminant(null, RankingList[1]?.rank)];
  const third = rank[discriminant(null, RankingList[2]?.rank)];

  // const topUser = [RankingList[1], RankingList[0], RankingList[2]];

  useEffect(() => {
    apis
      .rank()
      .then((res) => {
        console.log("랭킹 조회 완료", res.data);
        setRankingList(res.data);
      })
      .catch((err) => {
        console.log("랭킹 조회 실패", err);
      });
  }, []);

  // 내 등수 찾기
  const _myrank = (nickname) => nickname == user?.nickname;
  const myrank = RankingList.map((r) => r.nickname).findIndex(_myrank);
  console.log(RankingList);
  return (
    <ContentContainer Xfooter>
      <NewHeader page="유저랭킹" />
      <TopThree>
        <Second>
          <FadeIn>
            <FlexGrid is_column gap="0px" paddingBottom="80px">
              <FlexGrid is_flex gap="4px" center>
                <img
                  src={second.img}
                  style={{ width: "20px", marginTop: "2px" }}
                  alt="secondImg"
                />
                <div className="rankname">{RankingList[1]?.nickname}</div>
              </FlexGrid>
              <div className="ranknumber">EXP {RankingList[1]?.ex}</div>
            </FlexGrid>
            <SecondImg src={ranksecond} />
          </FadeIn>
          <SecondBar />
        </Second>
        <First>
          <FadeIn>
            <FlexGrid is_column gap="0px" paddingBottom="80px">
              <FlexGrid is_flex gap="4px" center>
                <img
                  src={first.img}
                  style={{ width: "20px", marginTop: "2px" }}
                  alt="firstImg"
                />
                <div className="rankname">{RankingList[0]?.nickname}</div>
              </FlexGrid>
              <div className="ranknumber">EXP {RankingList[0]?.ex}</div>
            </FlexGrid>
            <FirstImg src={rankfirst} />
          </FadeIn>
          <FirstBar />
        </First>
        <Third>
          <FadeIn>
            <FlexGrid is_column gap="0px" paddingBottom="80px">
              <FlexGrid is_flex gap="4px" center>
                <img
                  src={third.img}
                  style={{ width: "20px", marginTop: "2px" }}
                  alt="thirdimg"
                />
                <div className="rankname">{RankingList[2]?.nickname}</div>
              </FlexGrid>
              <div className="ranknumber">EXP {RankingList[2]?.ex}</div>
            </FlexGrid>
            <ThirdImg src={rankthird} />
          </FadeIn>
          <ThirdBar />
        </Third>
      </TopThree>

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
                    {r.ex}
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
          <div style={{ fontSize: "16px", fontWeight: "400" }}>{user?.ex}</div>
        </MyGradeLevel>
      </Me>
    </ContentContainer>
  );
};

const TopThree = styled.div`
  display: flex;
  border-bottom: 4px solid ${(props) => props.theme.color.orange};
  justify-content: center;
`;
const First = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 38px;
  text-align: center;
  margin: 0px 16px;
`;
const Second = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 102px;
  text-align: center;
  margin: 0px 16px;
`;
const Third = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 134px;
  text-align: center;
  margin: 0px 16px;
`;
const pullUp = keyframes`
	0% {
		transform: scaleY(0.1);
	}
	40% {
		transform: scaleY(1.02);
	}
	60% {
		transform: scaleY(0.98);
	}
	100% {
		transform: scaleY(1.00);
  }					
`;
const SecondBar = styled.div`
  background-color: #fed4a3;
  width: 55px;
  height: 96px;
  border: none;
  animation: ${pullUp};
  animation-duration: 2s;
  animation-timing-function: ease-out;
  transform-origin: 50% 100%;
`;
const FirstBar = styled.div`
  background-color: rgba(241, 145, 33, 0.7);
  width: 55px;
  height: 160px;
  border: none;
  animation: ${pullUp};
  animation-duration: 2.5s;
  animation-timing-function: ease-out;
  transform-origin: 50% 100%;
`;
const ThirdBar = styled.div`
  background-color: #faede1;
  width: 55px;
  height: 64px;
  border: none;
  animation: ${pullUp};
  animation-duration: 1s;
  animation-timing-function: ease-out;
  transform-origin: 50% 100%;
`;

const rankingMove = keyframes`
    0% {
        opacity: 0;
    }
    70%{
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`;

const FadeIn = styled.div`
  animation: ${rankingMove} 1s;
  animation-duration: 2.8s;
  position: relative;
  .ranknumber {
    font-size: 14px;
    font-weight: ${(props) => props.theme.fontWeight.light};
  }
  .rankname {
    font-size: 18px;
    font-weight: ${(props) => props.theme.fontWeight.medium};
  }
`;

const ListWrap = styled.div`
  display: flex;
  align-items: center;
`;

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

const FirstImg = styled.img`
  position: absolute;
  width: 90px;
  transform: translate(-45px, -65px);
`;

const SecondImg = styled.img`
  position: absolute;
  width: 80px;
  transform: translate(-40px, -60px);
`;

const ThirdImg = styled.img`
  position: absolute;
  width: 70px;
  transform: translate(-34px, -55px);
`;

const LevelImgList = styled.img`
  width: 23px;
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
  position: fixed;
  bottom: 0;
  padding: 14px 16px;
  width: 100%;
  max-width: 420px;
  height: 84px;
  background-color: #f0f0f0;
`;
export default UserRanking;
