import React, { useState, useEffect } from 'react'
import styled from 'styled-components';

import { useDispatch } from 'react-redux';
import { actionCreators as alertAction } from '../../redux/modules/alert';

import apis from '../../shared/apis';


function BlindBoard() {
    const dispatch = useDispatch();
    const [BlindBoardList, setBlindBoardList] = useState([]);

    useEffect(() => {
        apis.getblindboard()
            .then((res) => {
                setBlindBoardList(res.data)
            })
            .catch((err) => {
                dispatch(alertAction.open({
                    message: "블라인드 게시물 불러오기 실패"
                }))
            })
    }, [])

    const delBlindBoard = (boardId) => {
        apis.delblindboard(boardId)
            .then((res) => {
                dispatch(alertAction.open({
                    message: "블라인드 게시물 삭제 성공"
                }))
            })
            .catch((err) => {
                dispatch(alertAction.open({
                    message: "블라인드 게시물 삭제 실패"
                }))
            })
    }

    return (
        <>
        <Title>현재 블라인드 게시글</Title>
            {BlindBoardList.map((r, idx) => {
                return <List key={idx}>
                    <div> {r.topicA} VS {r.topicB} </div>
                    <div> 신고수 : {r.warnCnt} </div>
                    <button onClick={()=>delBlindBoard(r.boardId)}> 삭제 </button>
                </List>
            })}
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

export default BlindBoard