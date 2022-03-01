import React from 'react'
import styled from 'styled-components'
import { history } from '../../redux/configStore'

import star from '../../image/star.png'

const CommentList = (props) => {

  return (
    <>
      <Wrap>
        <FlexAlign>
          <LevelImg src={star} />
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <UserName>차민재</UserName>
            <CreatedAt>2022-03-01</CreatedAt>
          </div>
        </FlexAlign>
      </Wrap>
      <ContentWrap>
        <Content>나는 댓글이다 나는 댓글이다 나는 댓글이다 나는 댓글이다 나는 댓글이다</Content>
        <IconBox>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Number className="like-count">❤ 2</Number>
          </div>
        </IconBox>
      </ContentWrap>

      <Wrap>
        <FlexAlign>
          <LevelImg src={star} />
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <UserName>차민재</UserName>
            <CreatedAt>2022-03-01</CreatedAt>
          </div>
        </FlexAlign>
      </Wrap>
      <ContentWrap>
        <Content>나는 댓글이다 나는 댓글이다 나는 댓글이다 나는 댓글이다 나는 댓글이다</Content>
        <IconBox>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Number className="like-count">❤ 2</Number>
          </div>
        </IconBox>
      </ContentWrap>

      <Wrap>
        <FlexAlign>
          <LevelImg src={star} />
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <UserName>차민재</UserName>
            <CreatedAt>2022-03-01</CreatedAt>
          </div>
        </FlexAlign>
      </Wrap>
      <ContentWrap>
        <Content>나는 댓글이다 나는 댓글이다 나는 댓글이다 나는 댓글이다 나는 댓글이다</Content>
        <IconBox>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Number className="like-count">❤ 2</Number>
          </div>
        </IconBox>
      </ContentWrap>

      <Wrap>
        <FlexAlign>
          <LevelImg src={star} />
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <UserName>차민재</UserName>
            <CreatedAt>2022-03-01</CreatedAt>
          </div>
        </FlexAlign>
      </Wrap>
      <ContentWrap>
        <Content>나는 댓글이다 나는 댓글이다 나는 댓글이다 나는 댓글이다 나는 댓글이다</Content>
        <IconBox>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Number className="like-count">❤ 2</Number>
          </div>
        </IconBox>
      </ContentWrap>
    </>
  )
}

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid #e5e5e5;
  border-top: 2px solid #e5e5e5;
  padding: 10px 0px;
`
const FlexAlign = styled.div`
  display: flex;
  align-items: center;
`
const LevelImg = styled.img`
  width: 30px;
  height: 30px;
  object-fit: cover;
  margin:0 12px 0 20px ;
`
const UserName = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  display: flex;
  align-items: center;
`
const CreatedAt = styled.div`
  font-size: 8px;
  font-weight: 300;
`
const ContentWrap = styled.div`
  border-bottom: 10px solid #e5e5e5;
  padding: 16px 20px;
`
const Content = styled.div`
  font-size: 10px;
  line-height: 16px;
  display: flex;
  align-items: center;
  padding: 0 0 20px;
`
const IconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const Number = styled.p`
  font-size: 10px;
  font-weight: 300;
  margin: 0 0 0 5px;
`
export default CommentList;