import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import apis from "../../shared/apis";
import FlexGrid from "../../elements/FlexGrid"

import styled from "styled-components";
import Grid from "../../elements/Grid";
import bank from "../../image/mypage/moneybag.svg";

import Header from "../../shared/Header";
import { history } from "../../redux/configStore";

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

    // const groupBy = function (data, key) {
    //     return data.reduce(function (carry, el) {
    //         let group = el[key];

    //         carry[group]?.push(el)
    //         return carry
    //     }, {})
    // }

    // const _groupByResult = groupBy(pointCheck, "createdAt")
    // console.log(_groupByResult)
    // const groupByResult = Object.values(_groupByResult)
    // console.log(groupByResult)

    return (
        <Grid height="100vh" overflow="scroll">
            <Header page="알포인트 내역" />
            <CurrentEggPoint>
                <EggImg src={bank} />
                <RPBox>
                    <span className="Mypoint">{user?.point.toLocaleString('ko-KR')}</span> RP
                </RPBox>
                <div 
                style={{ fontSize: "18px", paddingTop: "5px", cursor: "pointer" }} 
                onClick={() => history.replace('/mypage/pointshop')}
                >
                사용하기
                </div>
            </CurrentEggPoint>

            <Flag>
                <div className="title">내 활동 내역</div>
            </Flag>


            <Wrap>
                {/* <FlexGrid is_column>
                    {
                        groupByResult.map((x) => {
                            x.map((p, idx) => {
                                return <CheckEggpoint key={idx}>
                                    <PointCreatedAt>
                                        {p.createdAt}
                                    </PointCreatedAt>
                                    <CheckPoint>
                                        <PointLog>{p.content}</PointLog>
                                        <PointPlusMinus>{p.changePoint}</PointPlusMinus>
                                    </CheckPoint>
                                </CheckEggpoint>
                            })
                        })
                    }
                </FlexGrid> */}

                <FlexGrid is_column>
                    {pointCheck.map((p, idx) => {
                        return <CheckEggpoint key={idx}>
                            <PointCreatedAt>
                                {p.createdAt.split(" ")[0]}
                            </PointCreatedAt>
                            <FlexGrid between>
                                <PointLog>{p.content}</PointLog>
                                <PointPlusMinus>{p.changePoint}</PointPlusMinus>
                            </FlexGrid>
                        </CheckEggpoint>
                    })
                    }
                </FlexGrid>
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
const Flag = styled.div`
transform: translate(26px, -8px);
display: inline-block;
    width: 124px;
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
        top: 39px;
        width: 0;
    }
    .title {
        display: flex;
        justify-content: center;
        padding-top: 10px;
        font-size: ${(props) => props.theme.fontSizes.subtitle1};
        font-weight: ${(props) => props.theme.fontWeight.medium};
        color: #fff;
    }
`
const Wrap = styled.div`
    padding: 40px 30px 0px 30px;
`
const CheckEggpoint = styled.div`
    margin-bottom: 10px;
`
const PointCreatedAt = styled.div`
    font-size: ${(props) => props.theme.fontSizes.body2};
`
const PointLog = styled.div`
    font-size: ${(props) => props.theme.fontSizes.subtitle1};
    font-weight: ${(props) => props.theme.fontWeight.medium};
    color: ${(props) => props.theme.color.black};
`
const PointPlusMinus = styled.div`
    font-size: ${(props) => props.theme.fontSizes.subtitle1};
    font-weight: ${(props) => props.theme.fontWeight.medium};
    color: ${(props) => props.theme.color.orange};
    text-align: center;
`

export default MyEggPoint;
