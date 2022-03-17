import React from "react";
import styled from "styled-components";
import Header from "../../shared/Header";
import { rank } from "../../data/rank";
import { discriminant } from "../../data/rank";
import { useSelector } from "react-redux";

const MyGrade = () => {
    const user = useSelector(state => state.user.user);
    const userRank = rank[discriminant(user?.ex)];

    const nowExp = user?.ex;
    const nextScore = () => {
        if(nowExp < 1000){
            return 1000 - nowExp
        }else if(1000 <= nowExp && nowExp < 2000){
            return 2000 - nowExp
        }else if(2000 <= nowExp && nowExp < 3000){
            return 3000 - nowExp
        }else if(3000 <= nowExp && nowExp < 4000){
            return 4000 - nowExp
        }else return 0
    };
    const announceScore = nextScore();

    return (
        <>
            <Header page="등급표" />
            <MyGradeInfo>
                <MyGradeImage src={userRank.img}></MyGradeImage>
                <IsMyGrade>
                    나의 등급은 <br/>
                    <span className="GradeColor">{userRank.name}</span> 입니다
                </IsMyGrade>
                <NextGrade>얼마 안남았네요 :) 다음 등급까지 <span className="RP">{announceScore.toLocaleString('ko-KR')} EXP</span> 남았습니다</NextGrade>
            </MyGradeInfo>

            <GradeInfo>
                <GradeTitle>알포인트 등급소개</GradeTitle>

                <GradeLevel backgroundColor="#F9CD9A">
                    <p>브론즈</p>
                    <p>~1,000 Exp</p>
                </GradeLevel>
                <GradeLevel backgroundColor="rgba(249, 205, 154, 0.5)">
                    <div>실버</div>
                    <div>~2,000 Exp</div>
                </GradeLevel>
                <GradeLevel backgroundColor="rgba(249, 205, 154, 0.4)">
                    <div>골드</div>
                    <div>~3,000 Exp</div>
                </GradeLevel>
                <GradeLevel backgroundColor="rgba(249, 205, 154, 0.3)">
                    <div>플래티넘</div>
                    <div>~4,000 Exp</div>
                </GradeLevel>
                <GradeLevel backgroundColor="rgba(249, 205, 154, 0.2)">
                    <div>다이아</div>
                    <div>4,000 Exp 이상</div>
                </GradeLevel>
                <GradeLevel backgroundColor="rgba(249, 205, 154, 0.1)">
                    <div>랭커</div>
                    <div>TOP 1, 2, 3</div>
                </GradeLevel>
            </GradeInfo>
        </>
    )
};

const MyGradeInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 60px 40px;
`
const MyGradeImage = styled.img`
    width: 184px;
    height: 184px;
    border: none;
    border-radius: 100%;
`
const IsMyGrade = styled.div`
    padding-top: 30px;
    font-size: 28px;
    font-weight: ${(props) => props.theme.fontWeight.medium};
    .GradeColor{
        color: #E9C718;
        font-weight: ${(props) => props.theme.fontWeight.bold};
    }
`
const NextGrade = styled.div`
    padding-top: 20px;
    font-weight: ${(props) => props.theme.fontWeight.medium};
    .RP{
        color: #E9C718;
    }
`
const GradeInfo = styled.div`
    border-top: 16px solid #F1F1F1;
`
const GradeTitle = styled.div`
    margin: 15px;
    font-weight: ${(props) => props.theme.fontWeight.medium};
    font-size: ${(props) => props.theme.fontSizes.headline2};
`
const GradeLevel = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 16px 30px;
    height: 50px;
    background-color: ${(props) => props.backgroundColor};
    font-weight: ${(props) => props.theme.fontWeight.regular};
    font-size: ${(props) => props.theme.fontSizes.body1};
    color: ${(props) => props.theme.color.black};
`

export default MyGrade;