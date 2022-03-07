import React from "react";
import Header from "../../shared/Header"
import styled, { ThemeProvider } from "styled-components";

const UserRanking = () => {
    return (
        <>
            <Header />
            <TopThree>
                <Second>
                    <div>2등</div>
                    <div>뱃지</div>
                    <div style={{margin:"10px 0px 0px 0px"}}>닉네임</div>
                    <SecondBar></SecondBar>
                </Second>
                <First>
                    <div>1등</div>
                    <div>뱃지</div>
                    <div style={{margin:"10px 0px 0px 0px"}}>닉네임</div>
                    <FirstBar></FirstBar>
                </First>
                <Third>
                    <div>3등</div>
                    <div>뱃지</div>
                    <div style={{margin:"10px 0px 0px 0px"}}>닉네임</div>
                    <ThirdBar></ThirdBar>
                </Third>
            </TopThree>


            <GradeInfo>
                <GradeLevel>
                    <div>4</div>
                    <RankingUserInfo>
                        <div>뱃지</div>
                        <div>닉네임</div>
                    </RankingUserInfo>
                    <div>3000</div>
                </GradeLevel>
                <GradeLevel>
                    <div>5</div>
                    <RankingUserInfo>
                        <div>뱃지</div>
                        <div>닉네임</div>
                    </RankingUserInfo>
                    <div>2300</div>
                </GradeLevel>
                <GradeLevel>
                    <div>6</div>
                    <RankingUserInfo>
                        <div>뱃지</div>
                        <div>닉네임</div>
                    </RankingUserInfo>
                    <div>2250</div>
                </GradeLevel>
                <GradeLevel>
                    <div>7</div>
                    <RankingUserInfo>
                        <div>뱃지</div>
                        <div>닉네임</div>
                    </RankingUserInfo>
                    <div>2200</div>
                </GradeLevel>
                <GradeLevel>
                    <div>8</div>
                    <RankingUserInfo>
                        <div>뱃지</div>
                        <div>닉네임</div>
                    </RankingUserInfo>
                    <div>2150</div>
                </GradeLevel>
                <GradeLevel>
                    <div>9</div>
                    <RankingUserInfo>
                        <div>뱃지</div>
                        <div>닉네임</div>
                    </RankingUserInfo>
                    <div>2000</div>
                </GradeLevel>
                <GradeLevel>
                    <div>10</div>
                    <RankingUserInfo>
                        <div>뱃지</div>
                        <div>닉네임</div>
                    </RankingUserInfo>
                    <div>1900</div>
                </GradeLevel>
            </GradeInfo>

            <Me>
                <GradeLevel>
                    <div>권외</div>
                    <RankingUserInfo>
                        <div>뱃지</div>
                        <div>나</div>
                    </RankingUserInfo>
                    <div>1900</div>
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
`

const Second = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 100px;
`

const Third = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 132px;
`

const SecondBar = styled.div`
    background-color: #C4C4C4;
    width: 92px;
    height: 96px;
    border: none;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
`

const FirstBar = styled.div`
    background-color: #C4C4C4;
    width: 92px;
    height: 140px;
    border: none;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
`

const ThirdBar = styled.div`
    background-color: #C4C4C4;
    width: 92px;
    height: 64px;
    border: none;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
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

export default UserRanking;