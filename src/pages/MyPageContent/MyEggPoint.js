import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import apis from "../../shared/apis";
import FlexGrid from "../../elements/FlexGrid";

import styled from "styled-components";
import Grid from "../../elements/Grid";
import Text from "../../elements/Text";
import bank from "../../image/mypage/moneybag.svg";

import Header from "../../shared/Header";
import { history } from "../../redux/configStore";

const MyEggPoint = () => {
  const user = useSelector((state) => state.user.user);

  const [pointCheck, setPointCheck] = useState([]);

  useEffect(() => {
    apis
      .pointcheck()
      .then((res) => {
        console.log("포인트 내역 조회 완료", res.data);

        const dict = res.data.reduce((acc, el) => {
          const date = el.createdAt.split(" ")[0];

          acc[date] = acc[date] ? [...acc[date], el] : [];
          return acc;
        }, {});

        setPointCheck(dict);
      })
      .catch((err) => {
        console.log("포인트 내역 조회 실패", err);
      });
  }, []);

  return (
    <Grid height="100vh" overflow="scroll">
      <Header page="알포인트 내역" />
      <FlexGrid
        is_column
        center
        borderBottom="8px solid #f1f1f1"
        weight="medium"
      >
        <EggImg src={bank} />
        <RPBox center>
          <Text size="headline1" color="orange">
            {user?.point.toLocaleString("ko-KR")}RP
          </Text>
        </RPBox>
        <Text
          size="subtitle1"
          onClick={() => history.replace("/mypage/pointshop")}
        >
          사용하기
        </Text>
      </FlexGrid>

      <Flag>
        <div className="title">내 활동 내역</div>
      </Flag>

      <FlexGrid padding="40px 30px 0 30px">
        <FlexGrid is_column gap="30px">
          {Object.entries(pointCheck).map(([el, value], idx) => {
            console.log(el, value);
            return (
              <FlexGrid is_column key={idx} gap="20px">
                <Text size="body2">{el}</Text>
                {value.map((el) => {
                  return (
                    <FlexGrid between>
                      <Text size="subtitle1" weight="medium" color="black">
                        {el.content}
                      </Text>
                      <Text size="subtitle1" weight="medium" color="orange">
                        {el.changePoint}
                      </Text>
                    </FlexGrid>
                  );
                })}
              </FlexGrid>
            );
          })}
        </FlexGrid>
      </FlexGrid>
    </Grid>
  );
};

const RPBox = styled(FlexGrid)`
  width: 200px;
  height: 40px;
  border-radius: 30px;
  background-color: #fefefe;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
`;
const EggImg = styled.img`
  width: 98px;

  padding-bottom: 10px;
`;
const Flag = styled.div`
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
`;

export default MyEggPoint;
