import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { history } from '../../redux/configStore'
import { actionCreators as commentActions } from '../../redux/modules/comment'
import OneComment from './OneComment'

import Button from '../../elements/Button'
import apis from '../../shared/apis'
import { useDispatch, useSelector } from 'react-redux'

const CommentList = ({ debate }) => {
  const boardId = debate.boardId;

  const dispatch = useDispatch();

  useEffect(() => {
    if(boardId){
    getCommentDB()
    setCommentList()
    } else {
      return;
    }
  }, [boardId])

  // const commentList = useSelector((state) => state.comment.commentList);
  // console.log(commentList)

  const [commentList, setCommentList] = useState();
  const [comment, setComment] = useState("");

  const onChangeComment = (e) => {
    setComment(e.target.value)
  };

  const getCommentDB = async () => {
    await apis
      .getComment(boardId)
      .then((res) => {
        console.log(res)
        setCommentList(res.data)
      })
      .catch((err) => {
        console.log("댓글불러오기 에러", err)
      })
  }

  const token = document.cookie;
  const tokenCheck = token.split("=")[1]
  const addComment = () => {
    if (!tokenCheck) {
      alert("로그인 해주세요!")
      history.replace('/login');
    } else {
      dispatch(commentActions.addCommentDB(boardId, comment))
      document.location.reload()
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

      {commentList
        ? commentList.map((c, idx) => {
          return <OneComment {...c} key={idx} commentList={commentList} />
        })
        : null}
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