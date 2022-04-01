import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Blind from "../shared/Blind";
import FlexGrid from "../../elements/FlexGrid";
import Chip from "../../elements/Chip";
import GaugeTimer from "../chatroom/GaugeTimer";
import Image from "../../elements/Image";
import { rank, discriminant } from "../../data/rank";
import Badge from "../../elements/Badge";
import { loginCheck } from "../../modules/loginCheck";
import short from "../../image/shared/short.svg";
import long from "../../image/shared/long.svg";
import noImage from "../../image/shared/noImage.png";
import { ReactComponent as PersonIcon } from "../../image/header/person.svg";
import Text from "../../elements/Text";

const MainCard = (props) => {
  const userRank = rank[discriminant(props.userInfo.ex, props.userInfo.rank)];
  const [blindState, setBlindState] = useState(false);
  const [timeState, setTimeState] = useState(false);

  const enterRoom = () => {
    if (blindState || timeState) {
      return;
    }
    loginCheck("push", "/chatroom/" + props.roomId);
  };

  useEffect(() => {
    if (props.warnCnt >= 3) {
      setBlindState(true);
    }
  }, []);

  return (
    <CardBox is_column _onClick={enterRoom}>
      <FlexGrid is_flex between>
        <FlexGrid is_flex gap="8px">
          {props.category.map((el, i) => {
            return <Chip key={i}>{el}</Chip>;
          })}
        </FlexGrid>

        <FlexGrid center justifyContent="flex-end" gap="4px">
          <Badge src={userRank.img} />
          {props.userInfo.nickname}
        </FlexGrid>
      </FlexGrid>

      <FlexGrid is_flex between center>
        <FlexGrid>
          <Image src={props.filePath ? props.filePath : noImage} />
          <Time src={props.time ? short : long}></Time>
          <Users>
            <PersonIcon />
            {props.userCnt}
          </Users>
        </FlexGrid>

        <FlexGrid center is_column>
          <Topic>{props.topicA}</Topic>
          <Text size="headline2" weight="black" color="orange">
            VS
          </Text>
          <Topic>{props.topicB}</Topic>
        </FlexGrid>
      </FlexGrid>

      <GaugeTimer {...props} setTimeState={setTimeState} />
      {blindState && <Blind>블라인드 처리된 채팅방</Blind>}
      {timeState && <Blind>종료된 채팅방</Blind>}
    </CardBox>
  );
};

const Time = styled.img`
  position: absolute;
  bottom: 8px;
  left: 8px;
`;

const Users = styled.div`
  position: absolute;
  bottom: 8px;
  right: 8px;

  color: rgba(0, 0, 0, 0.5);
  background-color: rgba(255, 255, 255, 0.5);
  padding: 2px 5px;
  border-radius: 15px;

  display: flex;
  align-items: center;
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
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  font-size: ${(props) => props.theme.fontSizes.subtitle1};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  line-height: 20px;
`;

export default React.memo(MainCard);
