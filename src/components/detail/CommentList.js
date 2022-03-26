import React, { useState } from 'react'
import styled from 'styled-components'
import { history } from '../../redux/configStore'
import { useDispatch, useSelector } from 'react-redux'
import { actionCreators as commentActions } from '../../redux/modules/comment'
import { actionCreators as alertAction} from '../../redux/modules/alert'

import OneComment from './OneComment'

const CommentList = ({ debate }) => {
  const boardId = debate.boardId;

  const dispatch = useDispatch();

  const commentList = useSelector((state) => state.comment.commentList);
  const [comment, setComment] = useState("");

  const onChangeComment = (e) => {
    setComment(e.target.value)
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      addComment();
    }
  }

  const token = document.cookie;
  const tokenCheck = token.split("=")[1]
  const addComment = () => {
    if (!tokenCheck) {
      dispatch(alertAction.open({
        message : "로그인 해주세요!"
      }))
      history.push('/login');
    } else {
      dispatch(commentActions.addCommentDB(boardId, comment))
      setComment("");
    }
  }

  return (
    <>
     {commentList.map((c, idx) => {
        return <OneComment index={idx} {...c} key={idx} boardId={boardId} />
      })}

      <CommentWriteContainer>
        <ImgInput>
          <input className='writebox'
            placeholder="내 생각을 남겨주세요 :)"
            type="text"
            value={comment}
            onChange={onChangeComment}
            onKeyDown={onKeyDown}
            style={{padding: "10px"}}
          ></input>
        </ImgInput>
        <SendBtn onClick={addComment}>등록</SendBtn>
      </CommentWriteContainer>
    </>
  )
};

const CommentWriteContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 8px;
  display: flex;
  align-items: center;
  background: #fcfcfc;
`
const ImgInput = styled.div`
  width: 100%;
  .writebox {
    border: 1px solid #D2D2D2;
    height: 44px;
    border-radius: 10px;
    width: calc(100% - 10px);
    &::placeholder {
      color: #D9D9D9;
      font-size: ${(props) => (props.theme.fontSizes.body2)};
    }
  }
`
const SendBtn = styled.button`
  background-color: ${(props) => (props.theme.color.orange)};
  font-size: ${(props) => (props.theme.fontSizes.subtitle1)};
  font-weight: ${(props) => (props.theme.fontWeight.medium)};
  color: white;
  width: 55px;
  height: 44px;
  border: none;
  border-radius: 10px;

`
export default CommentList;