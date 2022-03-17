import React, { memo } from 'react'
import FlexGrid from "../../elements/FlexGrid";
import Chip from "../../elements/Chip";
import Badge from "../../elements/Badge";
import { rank, discriminant } from "../../data/rank";
import Image from "../../elements/Image";
import styled from 'styled-components'
import Grid from '../../elements/Grid'
import { history } from '../../redux/configStore'

const PostListCard = (props) => {
  console.log(props);
  const userRank = rank[discriminant(props.userInfo.ex)];
  const boardId = props.boardId;
  const createdAt = props.createdAt.split(" ")[0];

  return (
    <>
      <CardBox is_column onClick={() => history.push(`/detail/${boardId}`)}>
        <FlexGrid is_flex between>
          <FlexGrid is_flex gap="8px">
            {props.category.map((el, i) => {
              return <Chip key={i}>{el}</Chip>;
            })}
          </FlexGrid>

          <FlexGrid center justifyContent="flex-end" gap="4px" margin="0px 5px 0px 0px">
            <Badge src={userRank.img}></Badge>
            {props.userInfo.nickname}
          </FlexGrid>
        </FlexGrid>

        <FlexGrid is_flex between center>
          <FlexGrid width="200px">
            <Image src={props.filePath} borderRadius="15px" />
          </FlexGrid>

          <FlexGrid is_column justifyContent="space-between" height="100%" gap="10px">
            <Topic>{props.topicA}</Topic>
            <VS center>VS</VS>
            <Topic>{props.topicB}</Topic>
            <DebateInfo>
              <div>사람 5</div>
              <div>|</div>
              <div>댓글 5</div>
              <div>|</div>
              <div>신고 5</div>
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
  margin-bottom : 16px;
  border-bottom: 1px solid #c4c4c4;

`;
const VS = styled(FlexGrid)`
  font-size: ${(props) => props.theme.fontSizes.headline2};
  font-weight: ${(props) => props.theme.fontWeight.black};
  color: ${(props) => props.theme.color.orange};
  font-family: "Noto Sans", sans-serif;
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
  gap: 15px;
  background-color: #F8F8F8;
  border-radius: 10px;
  padding: 5px 30px;
`

export default React.memo(PostListCard);
