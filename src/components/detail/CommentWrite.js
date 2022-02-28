import React, { useState } from 'react'
import styled from 'styled-components'
import { history } from '../../redux/configStore'

const CommentWrite = (props) => {

  const [comment, setComment] = useState("")

  const onChangeComment = (e) => {
    setComment(e.target.value)
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
        <button style={{ cursor: 'pointer' }} onClick={null}>아이콘</button>
      </CommentWriteContainer>

    </>
  )
}

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

export default CommentWrite;