import React from "react";
import styled from "styled-components";
import Container from "../elements/Container";
import Header from "../shared/Header";
import FlexGrid from "../elements/FlexGrid";
import Text from "../elements/Text";
import apis from "../shared/apis";
import gachaData from "../data/gachaData";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../redux/modules/user";
import { actionCreators as alertAction } from "../redux/modules/alert";
import { shake, zoomIn, zoomOut } from "../animation/gacha";

const Gacha = (props) => {
  const dispatch = useDispatch();
  const [data, setData] = React.useState(gachaData[0]);
  const [animation, setAnimation] = React.useState({
    animation: shake,
    duration: 2000,
    infinite: "infinite",
  });

  const user = useSelector((props) => props.user.user);

  const cacha = () => {
    if (user.lottoCount < 1) {
      dispatch(alertAction.open({ message: "모두 소진되었습니다." }));
      return;
    }
    dispatch(actionCreators.lottoCount());

    setAnimation({ animation: zoomIn, duration: 600, infinite: "unset" });
    setTimeout(() => {
      apis
        .Gacha()
        .then((res) => {
          setData({ ...gachaData[res.data.rank], count: res.data.count });
          dispatch(actionCreators.setPoint(gachaData[res.data.rank].point));
          setAnimation({
            animation: zoomOut,
            duration: 600,
            infinite: "unset",
          });
        })
        .catch((err) => {
          dispatch(
            alertAction.open({
              message: "에러가 발생하였습니다",
            })
          );
        });
    }, animation.duration);
  };
  return (
    <>
      <Header page="행운뽑기" />
      {user && (
        <Container footer overflow="visible" padding="54px">
          <FlexGrid center height="100%">
            <FlexGrid center is_column>
              <ResultImg src={data.img} animation={animation} />

              <FlexGrid
                is_column
                center
                size="headline1"
                weight="regular"
                textAlign="center"
              >
                {data.rank === 0 ? (
                  <>
                    <Text>
                      {user.lottoCount < 1
                        ? "오늘은 모두 소진되었어요"
                        : "행운뽑기"}
                      <br />
                      <Text color="gray">{user.lottoCount}회 남음</Text>
                    </Text>
                  </>
                ) : data.rank === 6 ? (
                  <Text color="gray">
                    꽉.. <br />
                    아쉬워요
                  </Text>
                ) : (
                  <Text>
                    축하합니다! <br />
                    <Text color="orange">
                      {data.point.toLocaleString("ko-KR")}알포인트
                    </Text>
                    당첨!
                  </Text>
                )}
              </FlexGrid>
            </FlexGrid>
          </FlexGrid>
        </Container>
      )}
      {user && (
        <Button onClick={cacha} state={user.lottoCount}>
          {data.rank === 0
            ? "행운뽑기"
            : data.rank === 6
            ? "다시뽑기"
            : "한번 더 뽑기"}
        </Button>
      )}
    </>
  );
};

const ResultImg = styled.img`
  width: 100%;
  z-index: 5;
  transform-origin: center;
  animation-name: ${(props) => props.animation.animation};
  animation-duration: ${(props) => props.animation.duration}ms;
  animation-iteration-count: ${(props) => props.animation.infinite};
  animation-fill-mode: forwards;
`;

const Button = styled.button`
  height: 76px;
  width: 100%;
  font-size: ${(props) => props.theme.fontSizes.headline2};
  font-weight: ${(props) => props.theme.fontWeight.bold};
  background-color: ${(props) =>
    props.state !== 0 ? props.theme.color.orange : "#CBCBCB"};
  color: white;
  border: none;
  cursor: pointer;
`;

export default Gacha;
