import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import FlexGrid from "../../elements/FlexGrid";
import { actionCreators as noticeActions } from "../../redux/modules/notice";
import Modal from "../shared/Modal";

function Notice() {
  const dispatch = useDispatch();
  const noticeList = useSelector((state) => state.notice.NoticeList);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [updateModalState, setUpdateModalState] = useState(false);
  const [createModalState, setCreateModalState] = useState(false);

  useEffect(() => {
    dispatch(noticeActions.getNoticeDB());
  }, []);

  const handleAddNotice = () => {
    dispatch(noticeActions.addNoticeDB(title, content));
    setTitle("");
    setContent("");
    setCreateModalState(false);
  };

  const handleUpdateNotice = (noticeId) => {
    dispatch(noticeActions.updateNoticeDB(noticeId, title, content));
    setTitle("");
    setContent("");
    setUpdateModalState(false);
  };

  const handleDelNotice = (noticeId) => {
    dispatch(noticeActions.delNoticeDB(noticeId));
  };

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  return (
    <>
      <Title>현재 공지사항 목록</Title>
      <Label onClick={() => setCreateModalState(true)}>공지사항 등록하기</Label>
      {noticeList.map((r, idx) => {
        return (
          <>
            <List key={idx}>
              <div> {r.title} </div>
              <button onClick={() => setUpdateModalState(true)}>
                {" "}
                수정하기{" "}
              </button>
              <button onClick={() => handleDelNotice(r.noticeId)}>
                {" "}
                삭제{" "}
              </button>
            </List>
            {updateModalState && (
              <Modal
                modalState={updateModalState}
                setModalState={setUpdateModalState}
              >
                <ModalLabel>
                  <div>타이틀</div>
                  <ModalTitleInput
                    type="text"
                    onChange={onChangeTitle}
                    value={title}
                  ></ModalTitleInput>
                </ModalLabel>
                <ModalLabel>
                  <div>내용</div>
                  <ModalContentInput
                    rows="10"
                    onChange={onChangeContent}
                    value={content}
                  ></ModalContentInput>
                </ModalLabel>
                <ModalBtn onClick={() => handleUpdateNotice(r.noticeId)}>
                  수정
                </ModalBtn>
              </Modal>
            )}
          </>
        );
      })}

      {createModalState && (
        <Modal
          modalState={createModalState}
          setModalState={setCreateModalState}
        >
          <FlexGrid is_column gap="10px" padding="30px">
            <div>타이틀</div>
            <ModalTitleInput
              type="text"
              onChange={onChangeTitle}
              value={title}
            ></ModalTitleInput>
            <div>내용</div>
            <ModalContentInput
              rows="10"
              onChange={onChangeContent}
              value={content}
            ></ModalContentInput>
          </FlexGrid>
          <ModalBtn onClick={handleAddNotice}>등록</ModalBtn>
        </Modal>
      )}
    </>
  );
}

const Title = styled.div`
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  padding: 10px;
  font-weight: bold;
  font-size: 20px;
`;
const List = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 10px 0px;
`;
const Label = styled.div`
  margin: 10px;
  padding: 5px;
  width: 120px;
  border-radius: 15px;
  text-align: center;
  background-color: #ddd;
  cursor: pointer;
`;
const ModalLabel = styled.div`
  padding: 30px;
  height: 300px;
`;
const ModalTitleInput = styled.input`
  width: 240px;
  border: 1px solid #333;
`;
const ModalContentInput = styled.textarea`
  width: 240px;
  border: 1px solid #333;
`;
const ModalBtn = styled.div`
  text-align: center;
  font-size: 14px;
  padding: 12px;
  margin: 10px 30px;
  background-color: #ddd;
  border-radius: 15px;
  cursor: pointer;
`;

export default Notice;
