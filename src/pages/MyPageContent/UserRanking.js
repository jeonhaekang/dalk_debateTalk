import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useSelector } from "react-redux";
import { rank, discriminant } from "../../data/rank";
import apis from "../../shared/apis";

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
            <div className="ranknumber">2등</div>
            <LevelImg src={second.img}></LevelImg>
            <div className="rankname" style={{ margin: "4px 0px 14px 0px" }}>
              {RankingList[1]?.nickname}
            </div>
          </FadeIn>
          <SecondBar></SecondBar>
        </Second>
        <First>
          <FadeIn>
            <div className="ranknumber">1등</div>
            <LevelImg src={first.img}></LevelImg>
            <div className="rankname" style={{ margin: "4px 0px 14px 0px" }}>
              {RankingList[0]?.nickname}
            </div>
          </FadeIn>
          <FirstBar></FirstBar>
        </First>
        <Third>
          <FadeIn>
            <div className="ranknumber">3등</div>
            <LevelImg src={third.img}></LevelImg>
            <div className="rankname" style={{ margin: "4px 0px 14px 0px" }}>
              {RankingList[2]?.nickname}
            </div>
          </FadeIn>
          <ThirdBar></ThirdBar>
        </Third>
      </TopThree>

    return (
        <ContentContainer Xfooter >
            <NewHeader page="유저랭킹" />
            <TopThree>
                <Second>
                    <FadeIn>
                        <div className="rankname" style={{ margin: "4px 0px 14px 0px" }}>{RankingList[1]?.nickname}</div>
                        <div className="ranknumber">{RankingList[1]?.ex} EXP</div>
                        <LevelImg className="secondImg" src={second.img} />
                    </FadeIn>
                    <SecondBar />
                </Second>
                <First>
                    <FadeIn>
                        <div className="rankname" style={{ margin: "4px 0px 14px 0px" }}>{RankingList[0]?.nickname}</div>
                        <div className="ranknumber">{RankingList[0]?.ex} EXP</div>
                        <LevelImg clssName="firstImg" src={first.img} />
                    </FadeIn>
                    <FirstBar />
                </First>
                <Third>
                    <FadeIn>
                        <div className="rankname" style={{ margin: "4px 0px 14px 0px" }}>{RankingList[2]?.nickname}</div>
                        <div className="ranknumber">{RankingList[2]?.ex} EXP</div>
                        <LevelImg className="thirdImg" src={third.img} />
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
    margin: 0px 40px;
`;

const Second = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 102px;
  text-align: center;
`;
const Third = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 134px;
  text-align: center;
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
	80% {
		transform: scaleY(1.01);
	}
	100% {
		transform: scaleY(0.98);
	}				
	80% {
		transform: scaleY(1.01);
	}
	100% {
		transform: scaleY(1);
	}							
`;
const SecondBar = styled.div`
    background-color: #FED4A3;
    width: 55px;
    height: 96px;
    border: none;
    animation: ${pullUp};
    animation-duration: 3s;
    animation-timing-function: ease-out;
    transform-origin: 50% 100%;
`
const FirstBar = styled.div`
    background-color: rgba(241, 145, 33, 0.7);
    width: 55px;
    height: 160px;
    border: none;
    animation: ${pullUp};
    animation-duration: 3.5s;
    animation-timing-function: ease-out;
    transform-origin: 50% 100%;
`
const ThirdBar = styled.div`
    background-color: #FAEDE1;
    width: 55px;
    height: 64px;
    border: none;
    animation: ${pullUp};
    animation-duration: 2s;
    animation-timing-function: ease-out;
    transform-origin: 50% 100%;
`

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
`

const FadeIn = styled.div`
  animation: ${rankingMove} 2s;
  animation-duration: 4s;
  .ranknumber {
    font-size: 18px;
    font-weight: ${(props) => props.theme.fontWeight.medium};
  }
  .rankname {
    font-size: 18px;
    font-weight: ${(props) => props.theme.fontWeight.medium};
  }
`;

const ListWrap = styled.div`
    display: flex;
    align-items: center;
`

const GradeLevel = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 12px 0px 36px;
    padding-bottom: 8px;
    border-bottom : 2px solid #E7E7E7;
    width: 290px;
`

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

const LevelImg = styled.img`
    width: 50px;
    height: 50px;
`

const LevelImgList = styled.img`
    width: 23px;
    margin-right: 10px;
`

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
