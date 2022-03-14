import React from "react";
import styled from "styled-components";
import { history } from "../../redux/configStore";
import Blind from "../shared/Blind";
import FlexGrid from "../../elements/FlexGrid";
import Chip from "../../elements/Chip";
import GaugeTimer from "../chatroom/GaugeTimer";
import Image from "../../elements/Image";
import { rank, discriminant } from "../../data/rank";
import Badge from "../../elements/Badge";
import LoginCheck from "../../shared/LoginCheck";
import { useDispatch } from "react-redux";
import { actionCreators as alertAction } from "../../redux/modules/alert";

const MainCard = (props) => {
  const dispatch = useDispatch();
  const userRank = rank[discriminant(props.userInfo.ex)];

  const loginCheck = () => {
    console.log(LoginCheck());
    if (LoginCheck()) {
      history.push("/chatroom/" + props.roomId);
    } else {
      dispatch(
        alertAction.open({
          type: "confirm",
          message: "로그인이 필요합니다",
          action: () => history.push("/login"),
        })
      );
    }
  };

  return (
    <CardBox is_column _onClick={loginCheck}>
      {props.warnCnt >= 3 && <Blind>블라인드 처리된 채팅방</Blind>}
      <FlexGrid is_flex between>
        <FlexGrid is_flex gap="8px">
          {props.category.map((el, i) => {
            return <Chip key={i}>{el}</Chip>;
          })}
        </FlexGrid>

        <FlexGrid center justifyContent="flex-end" gap="4px">
          <Badge src={userRank.img}></Badge>
          {props.userInfo.nickname}
        </FlexGrid>
      </FlexGrid>

      <FlexGrid is_flex between center>
        <FlexGrid>
          {props.page && <Image src={props.filePath} borderRadius="15px" />}
        </FlexGrid>

        <FlexGrid is_column justifyContent="space-between" height="100%">
          <Topic>{props.topicA}</Topic>
          <VS center>VS</VS>
          <Topic>{props.topicB}</Topic>
        </FlexGrid>
      </FlexGrid>
      <GaugeTimer {...props} page />
    </CardBox>
  );
};

MainCard.defaultProps = {};
const VS = styled(FlexGrid)`
  font-size: ${(props) => props.theme.fontSizes.subtitle}px;
  font-weight: 900;
  color: #f19121;
`;

const CardBox = styled(FlexGrid)`
  padding: 16px;
  border-radius: 15px;
  background-color: white;
  background: linear-gradient(5deg, #f5f5f5 45%, white 0);
  overflow: hidden;
  box-shadow: 0px 4px 15px 2px rgba(0, 0, 0, 0.1);
`;

const Topic = styled.div`
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  font-size: 18px;
  font-weight: ${(props) => props.theme.fontWeight.semiBold};
`;

export default MainCard;
