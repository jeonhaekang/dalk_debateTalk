import React from 'react'
import styled from 'styled-components'
import Grid from '../../elements/Grid'
import { history } from '../../redux/configStore'

const PostListCard = (props) => {
  const boardId = props.boardId;
  const createdAt = props.createdAt.split("-")[0] + "년 " 
                  + props.createdAt.split("-")[1] + "월 " 
                  + props.createdAt.split("-")[2] + "일";

  return (
    <>
      <Container onClick={() => history.push(`/detail/${boardId}`)}>
        <DebateTitle>{props.topicA} VS {props.topicB}</DebateTitle>
        <DebateSummary>{props.winner}</DebateSummary>
        <Grid height="fit-content">
          <Grid>
            <DebateFirstWriter>{props.userInfo.nickname}</DebateFirstWriter>
            <DebateCreateAt>{createdAt}</DebateCreateAt>
          </Grid>
          <Grid display="flex" margin="5px 0px">
            <DebateWarning>신고수 : {props.warnCnt}</DebateWarning>
            <DebateComment>덧글수 : {props.commentCnt}</DebateComment>
          </Grid>
        </Grid>
      </Container>

    </>
  )
}

const Container = styled.div`
  width: 100%;
  height: fit-content;
  border-top: 2px solid #e5e5e5;
  border-bottom: 2px solid #e5e5e5;
  margin: 10px 0 20px;
  padding: 16px 24px 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  background-color: #fff;
  -webkit-appearance: none;
  cursor: zoom-in;
`

const DebateTitle = styled.div`
  color: #016dad;
  width: 100%;
  height: fit-content;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 700;
`

const DebateSummary = styled.div`
  width: 100%;
  height: fit-content;
  font-size: 14px;
  padding: 10px 0 20px;
  word-break: keep-all;
`

const DebateFirstWriter = styled.div`
  font-size: 10px
  padding: 0 15px 0 0;
  color: gray
  width: fit-content;
  height: fit-content;
`

const DebateCreateAt = styled.div`
  font-size: 10px;
  width: fit-content;
  color: gray;
  margin-top: 5px;
`

const DebateWarning = styled.div`
  font-size: 10px;
  width: fit-content;
  color: gray;
`

const DebateComment = styled.div`
  font-size: 10px;
  width: fit-content;
  color: gray;
  margin-left: 5px;
`

const DebateCategory = styled.div`
  display: flex;
  justify-content: flex-end;
  right : 100px;
  font-size: 14px;
`

export default PostListCard;