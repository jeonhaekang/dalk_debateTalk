import React from "react";

import styled from "styled-components";
import Grid from "../../elements/Grid";

import Header from "../../shared/Header";

const MyEggPoint = () => {
    return (
        <>
            <Header />
            <CurrentEggPoint>현재 알포인트는 <br />
                총 2,855 입니다</CurrentEggPoint>

            <Grid padding="0px 0px 0px 10px">
                <UserEggpoint>
                    <div>날짜</div>
                    <div>내역</div>
                    <div>알포인트 변동</div>
                </UserEggpoint>
                <CheckEggpoint>
                    <PointCreatedAt>2022-03-01</PointCreatedAt>
                    <PointLog>토론 승리</PointLog>
                    <PointPlusMinus>+ 200</PointPlusMinus>
                </CheckEggpoint>
                <CheckEggpoint>
                    <PointCreatedAt>2022-03-01</PointCreatedAt>
                    <PointLog>토론 승리</PointLog>
                    <PointPlusMinus>+ 200</PointPlusMinus>
                </CheckEggpoint>
                <CheckEggpoint>
                    <PointCreatedAt>2022-03-01</PointCreatedAt>
                    <PointLog>토론 승리</PointLog>
                    <PointPlusMinus>+ 200</PointPlusMinus>
                </CheckEggpoint>
                <CheckEggpoint>
                    <PointCreatedAt>2022-03-01</PointCreatedAt>
                    <PointLog>토론 승리</PointLog>
                    <PointPlusMinus>+ 200</PointPlusMinus>
                </CheckEggpoint>
                <CheckEggpoint>
                    <PointCreatedAt>2022-03-01</PointCreatedAt>
                    <PointLog>토론 승리</PointLog>
                    <PointPlusMinus>+ 200</PointPlusMinus>
                </CheckEggpoint>
            </Grid>
        </>
    )
};

const CurrentEggPoint = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin: 80px;
    font-size: 24px;
`


const UserEggpoint = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px 40px;
`

const CheckEggpoint = styled.div`
    display: flex;
    padding: 10px 0px;
`

const PointCreatedAt = styled.div`
    padding: 0px 0px 0px 16px;
`

const PointLog = styled.div`
    padding: 0px 0px 0px 40px;
`

const PointPlusMinus = styled.div`
    padding: 0px 0px 0px 88px;
`

export default MyEggPoint;
