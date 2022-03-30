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
import Text from "../../elements/Text";

const MoreCard = (props) => {
  const userRank = rank[discriminant(props.userInfo.ex, props.userInfo.rank)];

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
          <Badge src={userRank.img} />
          {props.userInfo.nickname}
        </FlexGrid>
      </FlexGrid>

      <FlexGrid>
        <FlexGrid width="35%">
          <Image src={props.filePath ? props.filePath : noImage} />
          <Time src={props.time ? short : long}></Time>
          <Users>
            <svg width="22" height="22" viewBox="0 0 22 22">
              <path
                d="M10.9998 11C13.0257 11 14.6665 9.35913 14.6665 7.33329C14.6665 5.30746 13.0257 3.66663 10.9998 3.66663C8.974 3.66663 7.33317 5.30746 7.33317 7.33329C7.33317 9.35913 8.974 11 10.9998 11ZM10.9998 12.8333C8.55234 12.8333 3.6665 14.0616 3.6665 16.5V17.4166C3.6665 17.9208 4.079 18.3333 4.58317 18.3333H17.4165C17.9207 18.3333 18.3332 17.9208 18.3332 17.4166V16.5C18.3332 14.0616 13.4473 12.8333 10.9998 12.8333Z"
                fill="rgba(0,0,0,0.2)"
              />
            </svg>
            {props.userCnt}
          </Users>
        </FlexGrid>

        <FlexGrid is_column between width="65%">
          <FlexGrid is_column gap="10px" center height="100%">
            <Topic>{props.topicA}</Topic>
            <Text size="headline2" weight="black" color="orange">
              VS
            </Text>
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
