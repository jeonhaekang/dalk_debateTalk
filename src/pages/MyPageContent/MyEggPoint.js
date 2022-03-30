import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as alertAction } from "../../redux/modules/alert";

import apis from "../../shared/apis";

import FlexGrid from "../../elements/FlexGrid";
import Text from "../../elements/Text";
import bank from "../../image/mypage/moneybag.svg";
import mypoint from "../../image/mypage/MyEggPoint.svg"

import Header from "../../shared/Header";
import { history } from "../../redux/configStore";
import Container from "../../elements/Container";

const MyEggPoint = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const [pointCheck, setPointCheck] = useState([]);

  useEffect(() => {
    apis
      .pointcheck()
      .then((res) => {
        const dict = res.data.reduce((acc, el) => {
          const date = el.createdAt.split(" ")[0];

          acc[date] = acc[date] ? [...acc[date], el] : [el];
          return acc;
        }, {});

        setPointCheck(dict);
      })
      .catch((err) => {
        dispatch(
          alertAction.open({
            message: "배너목록 가져오기 실패",
          })
        );
      });
  }, []);

  return (
    <>
      <Header page="알포인트 내역" />
      <Container>
        <FlexGrid
          is_column
          center
          borderBottom="8px solid #f1f1f1"
          weight="medium"
          padding="40px"
        >
          <EggImg src={bank} />
          <RPBox center>
            <Text size="headline2" color="orange">
              {user?.point.toLocaleString("ko-KR")} RP
            </Text>
          </RPBox>
          <Text
            size="subtitle1"
            onClick={() => history.replace("/mypage/pointshop")}
          >
            사용하기
          </Text>
        </FlexGrid>

        <Flag src={mypoint} alt="mypoint" />

        <FlexGrid padding="40px 30px 0 30px">
          <FlexGrid is_column gap="30px">
            {Object.entries(pointCheck).map(([el, value], idx) => {
              return (
                <FlexGrid is_column key={idx} gap="20px">
                  <Text size="body2">{el}</Text>
                  {value.map((el, i) => {
                    return (
                      <FlexGrid between key={el.createdAt + i}>
                        <Text size="subtitle1" weight="medium" color="black">
                          {el.content}
                        </Text>
                        <Text size="subtitle1" weight="medium" color="orange">
                          {el.changePoint.toLocaleString("ko-KR")}
                        </Text>
                      </FlexGrid>
                    );
                  })}
                </FlexGrid>
              );
            })}
          </FlexGrid>
        </FlexGrid>
      </Container>
    </>
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

const Flag = styled.img`
  transform: translate(26px, -8px);
  display: inline-block;
  width: 125px;
`;

export default MyEggPoint;
