import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import apis from "../../shared/apis";

import styled from "styled-components";
import Grid from "../../elements/Grid";
import bank from "../../image/mypage/moneybag.svg";

import Header from "../../shared/Header";

const MyEggPoint = () => {
    const user = useSelector(state => state.user.user);

    const [pointCheck, setPointCheck] = useState([]);

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
                <EggImg src={bank} />
                <RPBox>
                    <span className="Mypoint">{user?.point.toLocaleString('ko-KR')}</span> RP
                </RPBox>
                <div style={{fontSize:"18px", paddingTop:"5px"}}>사용하기</div>
            </CurrentEggPoint>

            <Flag>
                <div className="title">내 활동 내역</div>
            </Flag>


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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: ${(props) => props.theme.fontSizes.headline2};
    font-weight: ${(props) => props.theme.fontWeight.medium};
    padding: 50px;
    border-bottom: 8px solid #f1f1f1;
    .Mypoint{
        color: #F17521;
    }
`
const RPBox = styled.div`
    width: 200px;
    height: 40px;
    border-radius: 30px;
    background-color: #FEFEFE;
    box-shadow:inset 0 0 10px rgba(0, 0, 0, 0.2);
`
const EggImg = styled.img`
    width: 150px;
    height: auto;
    padding-bottom: 10px;
`
const Wrap = styled.div`
    display: flex;
    justify-content: center;
    text-align: center;
    padding: 40px 0px 0px 0px;
`
const ColumnList = styled.div`
    display: flex;
    flex-direction: column;
`
const Flag = styled.div`
    postion: relative;
    transform: translate(26px, -8px);
    display: inline-block;
    width: 125px;
    height: 40px;
    background: ${(props) => props.theme.color.orange};
    :before {
        border-top: 25px solid ${(props) => props.theme.color.orange};
        border-left: 62px solid transparent;
        border-right: 62px solid transparent;
        content: "";
        height: 0;
        left: 0;
        position: absolute;
        top: 40px;
        width: 0;
      }
    .title{
        display: flex;
        justify-content: center;
        padding-top: 10px;
        font-size: ${(props) => props.theme.fontSizes.subtitle1};
        font-weight: ${(props) => props.theme.fontWeight.medium};
        color: #fff;
    }
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
