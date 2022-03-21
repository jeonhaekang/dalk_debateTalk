import React from "react";
import styled from "styled-components";
import Header from "../../shared/Header";
import { rank, RankInfo } from "../../data/rank";
import { discriminant } from "../../data/rank";
import { useSelector } from "react-redux";
import point from "../../image/mypage/point.svg"
import FlexGrid from "../../elements/FlexGrid"
import Grid from "../../elements/Grid";

const MyGrade = () => {
    const user = useSelector(state => state.user.user);
    const userRank = rank[discriminant(user?.ex)];

    const nowExp = user?.ex;
    const nextScore = () => {
        if (nowExp < 1000) {
            return 1000 - nowExp
        } else if (1000 <= nowExp && nowExp < 2000) {
            return 2000 - nowExp
        } else if (2000 <= nowExp && nowExp < 3000) {
            return 3000 - nowExp
        } else if (3000 <= nowExp && nowExp < 4000) {
            return 4000 - nowExp
        } else return 0
    };
    const announceScore = nextScore();

    return (
        <Grid height="100vh" overflow="scroll">
            <Header page="등급표" />
            <MyGradeInfo>
                <Radius>
                    <MyGradeImage src={userRank.img}></MyGradeImage>
                </Radius>
                <IsMyGrade>
                    나의 등급은 <br />
                    <span className="GradeColor">{userRank.name}</span> 입니다
                </IsMyGrade>
                <NextGrade>다음 등급까지 <span className="RP">{announceScore.toLocaleString('ko-KR')} EXP</span> 남았습니다</NextGrade>
            </MyGradeInfo>

            <GradeInfo>
                <GradeTitle>알포인트 등급</GradeTitle>

                <GradeWrap>
                    {RankInfo.map((el, i) => {
                        return <FlexGrid key={i}>
                            <div><GradeImg src={el.img} /></div>
                            <RankList>
                                <Grid display="flex">
                                    <div className="LevelBox">{el.level}</div>
                                    <div className="NameBox">{el.name}</div>
                                </Grid>
                                <Grid display="flex">
                                    <PoingImg src={point} />
                                    <div className="ExpBox">{el.exp}</div>
                                </Grid>
                            </RankList>
                        </FlexGrid>
                    })
                    }
                </GradeWrap>
            </GradeInfo>
        </Grid>
    )
};
const QuestionRP = styled.div`
    padding: 20px 24px;
    font-weight: ${(props) => props.theme.fontWeight.medium};
    font-size: ${(props) => props.theme.fontSizes.headline2};
`
const MyGradeInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 100px 40px;
`
const Radius = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 100%;
    width: 184px;
    height: 184px;
    background-color: #F5F5F5;
`
const MyGradeImage = styled.img`
    width: 130px;
    height: 130px;
`
const Mygradeis = styled.div`
    font-weight: ${(props) => props.theme.fontWeight.medium};
    font-size: ${(props) => props.theme.fontSizes.subtitle1};
`
const IsMyGrade = styled.div`
    padding-top: 60px;
    font-size: 28px;
    font-weight: ${(props) => props.theme.fontWeight.medium};
    .GradeColor{
        color: #E9C718;
        font-weight: ${(props) => props.theme.fontWeight.bold};
    }
`
const NextGrade = styled.div`
    padding-top: 10px;
    font-weight: ${(props) => props.theme.fontWeight.medium};
    .RP{
        color: #E9C718;
    }
`
const GradeInfo = styled.div`
    border-top: 16px solid #F1F1F1;
`
const GradeTitle = styled.div`
    padding: 15px;
    font-weight: ${(props) => props.theme.fontWeight.medium};
    font-size: ${(props) => props.theme.fontSizes.headline2};
`
const GradeWrap = styled.div`
    padding: 15px;
`
const RankList = styled(FlexGrid)`
    justify-content: space-between;
    font-size: ${(props) => props.theme.fontSizes.subtitle1};
    align-items: center;
    .LevelBox {
        background-color: #FAA94C;
        font-size: 12px;
        font-weight: ${(props) => props.theme.fontWeight.light};
        padding: 4px 12px 0px 12px;
        border-radius: 30px;
        margin-right: 12px;
    }
    .NameBox {
        font-size: ${(props) => props.theme.fontSizes.body1};
        font-weight: ${(props) => props.theme.fontWeight.medium};
        margin-bottom: 4px;
    }
    .ExpBox {
        font-size: ${(props) => props.theme.fontSizes.body1};
        font-weight: ${(props) => props.theme.fontWeight.light};
    }
`
const GradeImg = styled.img`
    width: 66px;
    height: 68px;
`
const PoingImg = styled.img`
    width: 18px;
    height: 18px;
    margin: 4px 8px 0px 0px;
`

export default MyGrade;