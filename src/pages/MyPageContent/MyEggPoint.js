import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import apis from "../../shared/apis";

import styled from "styled-components";
import Grid from "../../elements/Grid";
import GoldenEgg from "../../image/goldenegg.png"

import Header from "../../shared/Header";
import FlexGrid from "../../elements/FlexGrid";

const MyEggPoint = () => {
    const user = useSelector(state => state.user.user);

    const [pointCheck, setPointCheck] = useState([]);

    // const pointCreatedAt = pointCheck.createdAt.split("-")[0] + "년 "
    //                      + pointCheck.createdAt.split("-")[1] + "월 "
    //                      + pointCheck.createdAt.split("-")[2] + "일";

    useEffect(() => {
        apis.pointcheck()
            .then((res) => {
                console.log("포인트 내역 조회 완료", res.data)
                setPointCheck(res.data)
            })
            .catch((err) => {
                console.log("포인트 내역 조회 실패", err)
            })
    }, [])


    return (
        <Grid height="100vh" overflow="scroll">
            <Header page="알포인트 내역" />
            <CurrentEggPoint>
                <EggImg src={GoldenEgg} />
                <div>
                    현재 나의 알포인트는 <br />
                    총 <span className="Mypoint">{user?.point.toLocaleString('ko-KR')}</span> RP 입니다
                </div>
            </CurrentEggPoint>

            <Wrap>
                <ColumnList>
                    <UserEggpoint>
                        <div>날짜</div>
                    </UserEggpoint>
                    {pointCheck.map((p, idx) => {
                        return <CheckEggpoint key={idx}>
                            <PointCreatedAt>
                                {p.createdAt.split(" ")[0]}
                            </PointCreatedAt>
                        </CheckEggpoint>
                    })
                    }
                </ColumnList>

                <ColumnList>
                    <UserEggpoint>
                        <div>내역</div>
                    </UserEggpoint>
                    {pointCheck.map((p, idx) => {
                        return <CheckEggpoint key={idx}>
                            <PointLog>{p.content}</PointLog>
                        </CheckEggpoint>
                    })
                    }
                </ColumnList>

                <ColumnList>
                    <UserEggpoint>
                        <div>변동</div>
                    </UserEggpoint>
                    {pointCheck.map((p, idx) => {
                        return <CheckEggpoint key={idx}>
                            <PointPlusMinus>{p.changePoint}</PointPlusMinus>
                        </CheckEggpoint>
                    })
                    }
                </ColumnList>
            </Wrap>
        </Grid>
    )
};

const CurrentEggPoint = styled.div`
    text-align: center;
    font-size: ${(props) => props.theme.fontSizes.headline2};
    font-weight: ${(props) => props.theme.fontWeight.medium};
    padding: 50px;
    border-bottom: 16px solid #f1f1f1;
    .Mypoint{
        color: #F17521;
    }
`
const EggImg = styled.img`
    width: 150px;
    height: auto;
`
const Wrap = styled.div`
    display: flex;
    justify-content: center;
    text-align: center;
    padding: 10px 0px 0px 0px;
`
const ColumnList = styled.div`
    display: flex;
    flex-direction: column;
`
const UserEggpoint = styled.div`
    border-bottom: 2px solid ${(props) => props.theme.color.orange};
    padding-bottom: 10px;
    margin-bottom: 10px;
    width: 140px;
`
const CheckEggpoint = styled.div`
    margin-bottom: 10px;
`
const PointCreatedAt = styled.div`
    font-size: ${(props) => props.theme.fontSizes.body2};
`
const PointLog = styled.div`
    font-size: ${(props) => props.theme.fontSizes.body2};
`
const PointPlusMinus = styled.div`
    font-size: ${(props) => props.theme.fontSizes.body2};
`

export default MyEggPoint;
