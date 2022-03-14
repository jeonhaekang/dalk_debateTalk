import React, { useState, useEffect } from "react";
import Header from "../../shared/Header"
import styled, { keyframes } from "styled-components";
import apis from "../../shared/apis";
import { useSelector } from "react-redux";
import star from "../../image/star.png"
import user from "../../redux/modules/user";
import { pull } from "lodash";

const UserRanking = () => {
    const user = useSelector(state => state.user.user);
    const [RankingList, setRankingList] = useState([]);

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

    const _myrank = (nickname) => nickname == user?.nickname;
    const myrank = RankingList.map((r) => r.nickname).findIndex(_myrank);

    return (
        <>
            <Header height="100%" overflow="scroll" />
            <TopThree>
                <Second>
                    <FadeIn>
                        <div>2등</div>
                        <LevelImg src={star} ></LevelImg>
                        <div style={{ margin: "10px 0px 4px 0px" }}>{RankingList[1]?.nickname}</div>
                    </FadeIn>
                    <SecondBar></SecondBar>
                </Second>
                <First>
                    <FadeIn>
                        <div>1등</div>
                        <LevelImg src={star} ></LevelImg>
                        <div style={{ margin: "10px 0px 4px 0px" }}>{RankingList[0]?.nickname}</div>
                    </FadeIn>
                    <FirstBar></FirstBar>
                </First>
                <Third>
                    <FadeIn>
                        <div>3등</div>
                        <LevelImg src={star} ></LevelImg>
                        <div style={{ margin: "10px 0px 4px 0px" }}>{RankingList[2]?.nickname}</div>
                    </FadeIn>
                    <ThirdBar></ThirdBar>
                </Third>
            </TopThree>


            <GradeInfo>
                {RankingList.map((r, idx) => {
                    return <GradeLevel key={idx}>
                        <div>{idx + 1}</div>
                        <RankingUserInfo>
                            <LevelImgList src={star}></LevelImgList>
                            <div>{r.nickname}</div>
                        </RankingUserInfo>
                        <div>{r.ex}</div>
                    </GradeLevel>
                })}
            </GradeInfo>

            <Me>
                <GradeLevel>
                    <div>{myrank + 1}</div>
                    <RankingUserInfo>
                        <LevelImgList src={star}></LevelImgList>
                        <div>{user?.nickname}</div>
                    </RankingUserInfo>
                    <div>{user?.ex}</div>
                </GradeLevel>
            </Me>


        </>
    )
};
const TopThree = styled.div`
    display: flex;
    border-bottom: 1px solid #C4C4C4;
    justify-content: center;
    // padding-top: 50px;
`
const First = styled.div`
    margin: 0px 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 56px;
    text-align: center;
`
const Second = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 100px;
    text-align: center;
`
const Third = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 132px;
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
    background-color: #C4C4C4;
    width: 92px;
    height: 96px;
    border: none;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    animation: ${pullUp};
    animation-duration: 3s;
    animation-timing-function: ease-out;
    transform-origin: 50% 100%;
`
const FirstBar = styled.div`
    background-color: #C4C4C4;
    width: 92px;
    height: 140px;
    border: none;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    animation: ${pullUp};
    animation-duration: 3.5s;
    animation-timing-function: ease-out;
    transform-origin: 50% 100%;
`
const ThirdBar = styled.div`
    background-color: #C4C4C4;
    width: 92px;
    height: 64px;
    border: none;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    animation: ${pullUp};
    animation-duration: 2s;
    animation-timing-function: ease-out;
    transform-origin: 50% 100%;
`
const GradeInfo = styled.div`
    border-top: 1px solid #C4C4C4;
    padding: 20px;
`
const GradeLevel = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: #C4C4C4;
    margin: 10px 0px 0px 0px;
    padding: 16px;
    height: 54px;
    border-radius: 15px;
`
const RankingUserInfo = styled.div`
    display: flex;
    margin-right: 30px;
`
const Me = styled.div`
    position: sticky;
    padding: 5px 20px;
    background-color: #F0F0F0;
`
const LevelImg = styled.img`
    width: 30px;
    height: 30px;
    object-fit: cover;
`;
const LevelImgList = styled.img`
    position: relative;
    width: 30px;
    height: 30px;
    bottom: 3px;
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
`

export default UserRanking;