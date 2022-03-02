import React from "react";
import styled from "styled-components";

import Grid from "../../elements/Grid";

const EggpointList = (props) => {
    return (
        <Grid margin="20px">
            <ChangeEggPoint>나의 알포인트 변동여부</ChangeEggPoint>

            <UserEggpoint>
                <div>날짜</div>
                <div>알포인트 변동</div>
                <div style={{ margin: "0px 0px 0px 20px" }}>내역</div>
            </UserEggpoint>

            <CheckEggpoint>
                <div style={{ margin: "0px 0px 0px 25px" }}>2022-03-01</div>
                <div style={{ margin: "0px 0px 0px 50px" }}>+ 200</div>
                <div style={{ margin: "0px 0px 0px 84px" }}>토론 승리</div>
            </CheckEggpoint>

            <CheckEggpoint>
                <div style={{ margin: "0px 0px 0px 25px" }}>2022-03-01</div>
                <div style={{ margin: "0px 0px 0px 50px" }}>+ 200</div>
                <div style={{ margin: "0px 0px 0px 84px" }}>댓글 작성</div>
            </CheckEggpoint>

        </Grid>
    )
};

const ChangeEggPoint = styled.div`
    font-size: 20px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    margin: 10px;
    padding: 10px;
`

const UserEggpoint = styled.div`
    display: flex;
    justify-content: space-evenly;
    border-bottom: 1px solid #d7a6b7;
    border-top: 1px solid #d7a6b7;
    padding: 10px 0px;
`

const CheckEggpoint = styled.div`
    display: flex;
    padding: 10px 0px;
`


export default EggpointList;