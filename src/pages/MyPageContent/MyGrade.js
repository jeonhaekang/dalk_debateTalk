import React from "react";
import styled from "styled-components";
import Header from "../../shared/Header";

const MyGrade = () => {
    return (
        <>
            <Header />
            <MyGradeInfo>
                <MyGradeImage></MyGradeImage>
                <IsMyGrade>
                    나의 등급은 <br/>
                    <span className="GradeColor">브론즈</span> 입니다
                </IsMyGrade>
                <NextGrade>다음 등급까지 <span className="RP">586RP</span> 남았습니다</NextGrade>
            </MyGradeInfo>

            <GradeInfo>
                <div style={{ fontSize:"24px", color:"#686868" }}>알포인트 등급</div>

                <GradeLevel>
                    <div>아이언</div>
                    <div>3,000 RP</div>
                </GradeLevel>
                <GradeLevel>
                    <div>브론즈</div>
                    <div>3,000 RP</div>
                </GradeLevel>
                <GradeLevel>
                    <div>실버</div>
                    <div>3,000 RP</div>
                </GradeLevel>
                <GradeLevel>
                    <div>골드</div>
                    <div>3,000 RP</div>
                </GradeLevel>
                <GradeLevel>
                    <div>플래티넘</div>
                    <div>3,000 RP</div>
                </GradeLevel>
                <GradeLevel>
                    <div>다이아</div>
                    <div>3,000 RP</div>
                </GradeLevel>
                <GradeLevel>
                    <div>랭커</div>
                    <div>3,000 RP</div>
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

const MyGradeImage = styled.div`
    width: 184px;
    height: 184px;
    background-color: #CFCFCF;
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