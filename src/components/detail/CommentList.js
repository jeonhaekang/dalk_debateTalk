import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { history } from '../../redux/configStore'
import { actionCreators as commentActions } from '../../redux/modules/comment'
import OneComment from './OneComment'

import Button from '../../elements/Button'

import { useDispatch, useSelector } from 'react-redux'

const CommentList = ({ debate }) => {
  const boardId = debate.boardId;

  const dispatch = useDispatch();

  // 상위컴포넌트에서는 useEffect 말고 useSelector
  const commentList = useSelector((state) => state.comment.commentList);

  const [comment, setComment] = useState("");

  const onChangeComment = (e) => {
    setComment(e.target.value)
  };

  const token = document.cookie;
  const tokenCheck = token.split("=")[1]
  const addComment = () => {
    if (!tokenCheck) {
      alert("로그인 해주세요!")
      history.replace('/login');
    } else {
      dispatch(commentActions.addCommentDB(boardId, comment))
    }
  }

  return (
    <>
        <CommentWriteContainer>
          <ImgInput>
            <input className='writebox'
              placeholder="토론에 대한 댓글을 작성해주세요"
              type="text"
              value={comment}
              onChange={onChangeComment}
            ></input>
          </ImgInput>
          <Button onClick={addComment}>아이콘</Button>
        </CommentWriteContainer>

      {commentList.map((c, idx) => {
          return <OneComment {...c} key={idx} />
        })}
    </>
  )
};

const CommentWriteContainer = styled.div`
  bottom: 0;
  width: 100%;
  padding: 8px;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  align-items: center;
  background: #fcfcfc;
`
const ImgInput = styled.div`
  width: 100%;
  display: flex;
  display: -ms-flexbox;
  display: -webkit-flex;
  align-items: center;
  .writebox {
    border: none;
    font-size: 16px;
    padding: 0 20px 0 0;
    width: calc(100% - 50px);
    &::placeholder {
      color: gray
    }
  }
`
export default CommentList;