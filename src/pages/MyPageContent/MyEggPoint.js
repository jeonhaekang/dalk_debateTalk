import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import apis from "../../shared/apis";

import styled from "styled-components";
import Grid from "../../elements/Grid";

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
        <>
            <Header />
            <CurrentEggPoint>현재 알포인트는 <br />
                총 <span className="Mypoint">{user?.point}</span> RP 입니다</CurrentEggPoint>

            <Wrap>
                <ColumnList>
                    <UserEggpoint>
                        <div>날짜</div>
                    </UserEggpoint>
                    {pointCheck.map((p, idx) => {
                        return <CheckEggpoint key={idx}>
                            <PointCreatedAt>
                                {p.createdAt.split("-")[0] + "년 "
                                    + p.createdAt.split("-")[1] + "월 "
                                    + p.createdAt.split("-")[2] + "일"}
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
        </>
    )
};

const Wrap = styled.div`
    display: flex;
    justify-content: center;
    text-align: center;
    gap: 20px;
    padding-right: 10px;
`
const CurrentEggPoint = styled.div`
    text-align: center;
    font-size: 24px;
    padding: 70px;
    .Mypoint{
        color: #E9C718;
    }
`
const ColumnList = styled.div`
    display: flex;
    flex-direction: column;
`
const UserEggpoint = styled.div`
    margin-bottom: 5px;
`
const CheckEggpoint = styled.div`
    margin-bottom: 5px;
`
const PointCreatedAt = styled.div`
    font-size: 12px;
`
const PointLog = styled.div`
    font-size: 12px;
`
const PointPlusMinus = styled.div`
    font-size: 12px;
`

export default MyEggPoint;
