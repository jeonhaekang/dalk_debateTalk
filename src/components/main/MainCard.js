import React from "react";
import styled from "styled-components";
import Grid from "../../elements/Grid";
import { history } from "../../redux/configStore";
import Blind from "../shared/Blind";
import FlexGrid from "../../elements/FlexGrid";
import Chip from "../../elements/Chip";
import GaugeTimer from "../chatroom/GaugeTimer";
import Center from "../../elements/Center";
import Image from "../../elements/Image";

const MainCard = (props) => {
  console.log(props);
  return (
    <FlexGrid
      is_column
      padding="15px 15px"
      borderRadius="10px"
      backgroundColor="#eee"
      gap="30px"
      _onClick={() => history.push("/chatroom/" + props.roomId)}
    >
      {/* {warnCnt >= 10 && <Blind>블라인드 처리된 채팅방</Blind>} */}
      <FlexGrid is_flex between>
        <FlexGrid is_flex>
          {props.category.map((el, i) => {
            return <Chip key={i}>{el}</Chip>;
          })}
        </FlexGrid>
        <Grid>{props.userInfo.nickname}</Grid>
      </FlexGrid>
      <FlexGrid is_flex alignItems="flex-start" between>
        <FlexGrid is_column center width="45%">
          {props.page && <Image src={props.filePath} />}

          <Topic>{props.topicA}</Topic>
        </FlexGrid>
        <Center>VS</Center>
        <FlexGrid is_column center width="45%">
          {props.page && <Image src={props.filePath} />}
          <Topic>{props.topicB}</Topic>
        </FlexGrid>
      </FlexGrid>
      <GaugeTimer {...props} page />
    </FlexGrid>
  );
};

MainCard.defaultProps = {};

const Topic = styled.div`
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
`;

const Img = styled.div``;

export default MainCard;
