import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useSelector } from "react-redux";
import { rank, discriminant } from "../../data/rank";
import apis from "../../shared/apis";

import first from "../../image/rank/first.png"
import second from "../../image/rank/second.png"
import third from "../../image/rank/third.png"

import Grid from "../../elements/Grid";
import NewHeader from "../../shared/NewHeader";
import ContentContainer from "../../elements/Container";

const UserRanking = () => {
    const user = useSelector(state => state.user.user);
    const [RankingList, setRankingList] = useState([]);
    //4등부터 보여주기
    const SliceRankingList = RankingList.slice(3);

    const userRank = rank[discriminant(user?.ex)];

    useEffect(() => {
        apis.rank()
            .then((res) => {
                console.log("랭킹 조회 완료", res.data)
                setRankingList(res.data);
            })
            .catch((err) => {
                console.log("랭킹 조회 실패", err)
            })
    }, []);

    // 내 등수 찾기
    const _myrank = (nickname) => nickname == user?.nickname;
    const myrank = RankingList.map((r) => r.nickname).findIndex(_myrank);

    return (
        <ContentContainer Xfooter >
            <NewHeader page="유저랭킹" />
            <TopThree>
                <Second>
                    <FadeIn>
                        <div className="ranknumber">2등</div>
                        <LevelImg src={second} ></LevelImg>
                        <div className="rankname" style={{ margin: "4px 0px 14px 0px" }}>{RankingList[1]?.nickname}</div>
                    </FadeIn>
                    <SecondBar></SecondBar>
                </Second>
                <First>
                    <FadeIn>
                        <div className="ranknumber">1등</div>
                        <LevelImg src={first} ></LevelImg>
                        <div className="rankname" style={{ margin: "4px 0px 14px 0px" }}>{RankingList[0]?.nickname}</div>
                    </FadeIn>
                    <FirstBar></FirstBar>
                </First>
                <Third>
                    <FadeIn>
                        <div className="ranknumber">3등</div>
                        <LevelImg src={third} ></LevelImg>
                        <div className="rankname" style={{ margin: "4px 0px 14px 0px" }}>{RankingList[2]?.nickname}</div>
                    </FadeIn>
                    <ThirdBar></ThirdBar>
                </Third>
            </TopThree>


            <Grid padding="20px">
                {SliceRankingList.map((r, idx) => {
                    return <div key={idx}>
                        <ListWrap>
                            <RankingBox>{idx + 4}</RankingBox>
                            <GradeLevel>
                                <Grid display="flex">
                                    <LevelImgList src={rank[discriminant(r.ex)].img}></LevelImgList>
                                    <div style={{ fontSize: '16px', fontWeight: '400' }}>{r.nickname}</div>
                                </Grid>

                                <div style={{ fontSize: '16px', fontWeight: '400' }}>{r.ex}</div>
                            </GradeLevel>
                        </ListWrap>
                    </div>
                })}
            </Grid>

            <Me>
                <MyGradeLevel style={{ backgroundColor: "#fff" }}>
                    <RankingBox>{myrank + 1}</RankingBox>
                    <Grid display="flex">
                        <LevelImgList src={userRank.img}></LevelImgList>
                        <div style={{ fontSize: '16px', fontWeight: '400' }}>{user?.nickname}</div>
                    </Grid>
                    <div style={{ fontSize: '16px', fontWeight: '400' }}>{user?.ex}</div>
                </MyGradeLevel>
            </Me>

        </ContentContainer>
    )
};
const TopThree = styled.div`
    display: flex;
    border-bottom: 4px solid ${(props) => props.theme.color.orange};
    justify-content: center;
`
const First = styled.div`
    margin: 0px 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 38px;
    text-align: center;
`
const Second = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 102px;
    text-align: center;
`
const Third = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 134px;
    text-align: center;
`
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
`
const SecondBar = styled.div`
    background-color: #FED4A3;
    width: 80px;
    height: 96px;
    border: none;
    animation: ${pullUp};
    animation-duration: 3s;
    animation-timing-function: ease-out;
    transform-origin: 50% 100%;
`
const FirstBar = styled.div`
    background-color: rgba(241, 145, 33, 0.7);
    width: 80px;
    height: 160px;
    border: none;
    animation: ${pullUp};
    animation-duration: 3.5s;
    animation-timing-function: ease-out;
    transform-origin: 50% 100%;
`
const ThirdBar = styled.div`
    background-color: #FAEDE1;
    width: 80px;
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
    .ranknumber{
        font-size: 18px;
        font-weight: ${(props) => props.theme.fontWeight.medium};
    }
    .rankname{
        font-size: 18px;
        font-weight: ${(props) => props.theme.fontWeight.medium};
    }
`

const ListWrap = styled.div`
    display: flex;
    align-items: center;
`
const GradeLevel = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 24px 0px 36px;
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
    background-color: #FDB178;
    font-size: 18px;
    font-weight: bolder;
`

const LevelImg = styled.img`
    width: 30px;
    height: 30px;
    object-fit: cover;
`
const LevelImgList = styled.img`
    width: 23px;
    height: auto;
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
`

const Me = styled.div`
    position: fixed;
    bottom: 0;
    padding: 14px 16px;
    width: 100%;
    max-width: 420px;
    height: 84px;
    background-color: #F0F0F0;
`
export default UserRanking;