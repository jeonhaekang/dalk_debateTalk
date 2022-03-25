import React from "react";
import styled from "styled-components";
import ContentContainer from "../elements/Container";
import NewHeader from "../shared/NewHeader";
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
  const [data, setData] = React.useState(gachaData.first);
  const [animation, setAnimation] = React.useState({
    animation: shake,
    duration: 2000,
    infinite: "infinite",
  });

  const user = useSelector((props) => props.user.user);

  const cacha = () => {
    if (user.point < 200) {
      dispatch(alertAction.open({ message: "포인트가 부족합니다." }));
      return;
    }
    dispatch(actionCreators.setPoint(-200));
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
      <NewHeader page="행운뽑기" />
      <ContentContainer overflow="visible" padding="54px">
        <FlexGrid center height="100%">
          <FlexGrid center is_column>
            <ResultImg src={data.img} animation={animation} />

            <Text size="headline1" weight="regular" textAlign="center">
              {data.message}
            </Text>
            {/* <Text>{data.rank === 6 && `${data.count}번 연속 꽝`}</Text> */}
          </FlexGrid>
        </FlexGrid>
      </ContentContainer>
      <Button onClick={cacha}>200RP로 행운뽑기</Button>
    </>
  );
};

const ResultImg = styled.img`
  width: 100%;

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
  background-color: ${(props) => props.theme.color.orange};
  color: white;
  border: none;

  cursor: pointer;
`;

export default Gacha;
