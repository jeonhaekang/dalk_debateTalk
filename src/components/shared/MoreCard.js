import React from "react";
import styled from "styled-components";
import Blind from "../shared/Blind";
import FlexGrid from "../../elements/FlexGrid";
import Chip from "../../elements/Chip";
import CardGaugeTimer from "../chatroom/CardGaugeTimer";
import Image from "../../elements/Image";
import { rank, discriminant } from "../../data/rank";
import Badge from "../../elements/Badge";
import { loginCheck } from "../../modules/loginCheck";
import short from "../../image/shared/short.svg";
import long from "../../image/shared/long.svg";
import noImage from "../../image/shared/noImage.png";

const MoreCard = (props) => {
  const userRank = rank[discriminant(props.userInfo.ex)];

  const [blindState, setBlindState] = React.useState(false);
  const [timeState, setTimeState] = React.useState(false);

  const enterRoom = () => {
    if (blindState || timeState) {
      return;
    }
    loginCheck("push", "/chatroom/" + props.roomId);
  };

  React.useEffect(() => {
    if (props.warnCnt >= 3) {
      setBlindState(true);
    }
  }, []);

  return (
    <CardBox is_column _onClick={enterRoom} className="moreBox">
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

      <FlexGrid>
        <FlexGrid width="35%">
          <Image src={props.filePath ? props.filePath : noImage} />
          <Time src={props.time ? short : long}></Time>
        </FlexGrid>

        <FlexGrid is_column between gap="0" width="65%">
          <FlexGrid
            is_column
            height="100%"
            justifyContent="space-evenly"
            gap="0"
          >
            <Topic>{props.topicA}</Topic>
            <VS center>VS</VS>
            <Topic>{props.topicB}</Topic>
          </FlexGrid>
          <FlexGrid>
            <CardGaugeTimer
              {...props}
              borderRadius="10px"
              height="6px"
              setTimeState={setTimeState}
            />
          </FlexGrid>
        </FlexGrid>
      </FlexGrid>
      {blindState && <Blind>블라인드 처리된 채팅방</Blind>}
      {timeState && <Blind>종료된 채팅방</Blind>}
    </CardBox>
  );
};

MoreCard.defaultProps = {};

const Time = styled.img`
  position: absolute;
  bottom: 8px;
  left: 8px;
`;

const VS = styled(FlexGrid)`
  font-size: ${(props) => props.theme.fontSizes.body1};
  font-weight: ${(props) => props.theme.fontWeight.black};
  color: ${(props) => props.theme.color.black};
`;

const CardBox = styled(FlexGrid)`
  background-color: white;
  padding: 23px 0;
`;

const Topic = styled.div`
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  font-size: ${(props) => props.theme.fontSizes.subtitle1};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  line-height: 20px;
`;

export default React.memo(MoreCard);
