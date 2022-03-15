import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { actionCreators as noticeActions } from '../../redux/modules/notice';
import Modal from '../shared/Modal';

function Notice() {
    const dispatch = useDispatch();
    const noticeList = useSelector(state => state.notice.NoticeList)
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [createModalState, setCreateModalState] = useState(false);

    console.log(noticeList)

    useEffect(() => {
        dispatch(noticeActions.getNoticeDB())
    }, [])

    const handleAddNotice = () => {
        dispatch(noticeActions.addNoticeDB(title, content))
        setTitle("");
        setContent("");
        setCreateModalState(false);
    }

    const handleUpdateNotice = () => {
        dispatch(noticeActions.updateNoticeDB(title, content))
    }

    const handleDelNotice = (noticeId) => {
        dispatch(noticeActions.delNoticeDB(noticeId))
    }

    const onChangeTitle = (e) => {
        setTitle(e.target.value)
    }

    const onChangeContent = (e) => {
        setContent(e.target.value);
    }

    return (
        <>
            <Title>현재 공지사항 목록</Title>
            <div onClick={() => setCreateModalState(true)}>공지사항 등록하기</div>
            {noticeList.map((r, idx) => {
                return <List key={idx}>
                    <div> {r.title} </div>
                    <button> 수정 </button>
                    <button onClick={() => handleDelNotice(r.noticeId)}> 삭제 </button>
                </List>
            })}


            <Modal modalState={createModalState} setModalState={setCreateModalState}>
                <div>
                    <div>타이틀</div>
                    <input type="text" onChange={onChangeTitle} value={title}></input>
                </div>
                <div>
                    <div>내용</div>
                    <input type="text" onChange={onChangeContent} value={content}></input>
                </div>
                <div onClick={handleAddNotice}>등록</div>
            </Modal>
        </>
    )
}

const Title = styled.div`
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    padding: 10px;
    font-weight: bold;
    font-size: 20px;
`
const List = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
    padding: 10px 0px;
`

export default Notice