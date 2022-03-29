import styled from "styled-components";
import { useState } from "react";
import { getCookie } from "../../shared/Cookie";
import { history } from "../../redux/configStore";
import { useDispatch } from "react-redux";
import { actionCreators as commentActions } from "../../redux/modules/comment";
import { actionCreators as alertAction } from "../../redux/modules/alert";

const CommentWrite = ({ debate }) => {
  const boardId = debate.boardId;
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");

  const token = getCookie("authorization");
  const addComment = () => {
    if (!token) {
      dispatch(
        alertAction.open({
          message: "로그인 해주세요!",
        })
      );
      history.push("/login");
    } else {
      dispatch(commentActions.addCommentDB(boardId, comment));
      setComment("");
    }
  };

  const onChangeComment = (e) => {
    setComment(e.target.value);
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      addComment();
    }
  };

  return (
    <>
      <CommentWriteContainer>
        <ImgInput>
          <input
            className="writebox"
            placeholder="내 생각을 남겨주세요 :)"
            type="text"
            value={comment}
            onChange={onChangeComment}
            onKeyDown={onKeyDown}
            style={{ padding: "10px" }}
          ></input>
        </ImgInput>
        <SendBtn onClick={addComment}>등록</SendBtn>
      </CommentWriteContainer>
    </>
  );
};

const CommentWriteContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 430px;
  padding: 8px;
  display: flex;
  align-items: center;
  background: #fcfcfc;
`;
const ImgInput = styled.div`
  width: 100%;
  .writebox {
    border: 1px solid #d2d2d2;
    height: 44px;
    border-radius: 10px;
    width: calc(100% - 10px);
    &::placeholder {
      color: #d9d9d9;
      font-size: ${(props) => props.theme.fontSizes.body2};
    }
  }
`;
const SendBtn = styled.button`
  background-color: ${(props) => props.theme.color.orange};
  font-size: ${(props) => props.theme.fontSizes.subtitle1};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  color: white;
  width: 55px;
  height: 44px;
  border: none;
  border-radius: 10px;
`;

export default CommentWrite;
