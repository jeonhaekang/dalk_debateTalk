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
                <NextGrade>다음 등급까지 <span className="RP">{announceScore}RP</span> 남았습니다</NextGrade>
            </MyGradeInfo>

            <GradeInfo>
                <div style={{ fontSize:"24px", color:"#686868" }}>알포인트 등급</div>

                <GradeLevel>
                    <div>브론즈</div>
                    <div>~1,000 Exp</div>
                </GradeLevel>
                <GradeLevel>
                    <div>실버</div>
                    <div>~2,000 Exp</div>
                </GradeLevel>
                <GradeLevel>
                    <div>골드</div>
                    <div>~3,000 Exp</div>
                </GradeLevel>
                <GradeLevel>
                    <div>플래티넘</div>
                    <div>~4,000 Exp</div>
                </GradeLevel>
                <GradeLevel>
                    <div>다이아</div>
                    <div>4,000 Exp 이상</div>
                </GradeLevel>
                <GradeLevel>
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
    padding: 60px;
`
const MyGradeImage = styled.img`
    width: 184px;
    height: 184px;
    border: none;
    border-radius: 100%;
`
const IsMyGrade = styled.div`
    padding-top: 30px;
    font-size: 20px;
    .GradeColor{
        color: #E9C718;
    }
`
const NextGrade = styled.div`
    padding-top: 20px;
    .RP{
        color: #E9C718;
    }
`
const GradeInfo = styled.div`
    border-top: 1px solid #C4C4C4;
    padding: 20px;
`
const GradeLevel = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: #CFCFCF;
    margin: 10px 0px 0px 0px;
    padding: 8px;
    height: 40px;
    color: #686868;
`

export default MyGrade;