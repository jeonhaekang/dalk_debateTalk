import React from "react";
import styled from "styled-components";
import { history } from "../../redux/configStore";

import FlexGrid from "../../elements/FlexGrid";
import Chip from "../../elements/Chip";
import Badge from "../../elements/Badge";
import Grid from "../../elements/Grid";
import Image from "../../elements/Image";

import { rank, discriminant } from "../../data/rank";

import Person from "../../image/post/person.svg";
import Textsms from "../../image/post/textsms.svg";
import Notification from "../../image/post/notification.svg";

const PostListCard = (props) => {
  const userRank = rank[discriminant(props.userInfo.ex)];
  const boardId = props.boardId;

  return (
    <>
      <CardBox
        className="test"
        is_column
        _onClick={() => history.push(`/detail/${boardId}`)}
      >
        <FlexGrid is_flex between>
          <FlexGrid is_flex gap="8px">
            {props.category.map((el, i) => {
              return <Chip key={i}>
                {el}
              </Chip>;
            })}
          </FlexGrid>

          <FlexGrid
            center
            justifyContent="flex-end"
            gap="4px"
            marginRight="5px"
          >
            <Badge src={userRank.img}></Badge>
            {props.userInfo.nickname}
          </FlexGrid>
        </FlexGrid>

        <FlexGrid is_flex between center>
          <FlexGrid width="200px">
            <Image src={props.filePath} borderRadius="15px" />
          </FlexGrid>

          <FlexGrid
            is_column
            justifyContent="space-between"
            height="100%"
            gap="8px"
          >
            {props.winner?.includes(props.topicA) ? (
              <>
                <WinnerTopic>{props.topicA}</WinnerTopic>
                <VS center>VS</VS>
                <Topic>{props.topicB}</Topic>
              </>
            ) : (
              <>
                <Topic>{props.topicA}</Topic>
                <VS center>VS</VS>
                <WinnerTopic>{props.topicB}</WinnerTopic>
              </>
            )}
            <DebateInfo>
              <Grid display="flex">
                <img src={Person} style={{ padding: "0px 5px 0px 0px" }} alt="person"/>
                <div>{props.voteCnt}</div>
              </Grid>
              <div>|</div>
              <Grid display="flex">
                <img src={Textsms} style={{ padding: "0px 5px 0px 0px" }} alt="textsms"/>
                {props.commentCnt}
              </Grid>
              <div>|</div>
              <Grid display="flex">
                <img
                  src={Notification}
                  style={{ padding: "0px 5px 0px 0px" }}
                  alt="noti"
                />
                {props.warnCnt}
              </Grid>
            </DebateInfo>
          </FlexGrid>
        </FlexGrid>
      </CardBox>
    </>
  );
};

const CardBox = styled(FlexGrid)`
  padding: 16px;
  background-color: white;
  overflow: hidden;
  margin-bottom: 8px;
`;

const VS = styled(FlexGrid)`
  font-size: ${(props) => props.theme.fontSizes.headline2};
  font-weight: ${(props) => props.theme.fontWeight.black};
  color: ${(props) => props.theme.color.orange};
  font-family: "Noto Sans", sans-serif;
`;

const WinnerTopic = styled.div`
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  font-size: ${(props) => props.theme.fontSizes.subtitle1};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  line-height: 20px;
  color: ${(props) => props.theme.color.orange};
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

const DebateInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  background-color: #efefef;
  border-radius: 10px;
  height: 30px;
  padding: 0px 30px;
`

export default React.memo(PostListCard);