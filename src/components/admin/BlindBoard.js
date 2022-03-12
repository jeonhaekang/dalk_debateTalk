import React, { useState } from 'react'
import { useEffect } from 'react';
import styled from 'styled-components';
import apis from '../../shared/apis';

function BlindBoard() {
    const [BlindBoardList, setBlindBoardList] = useState([]);

    useEffect(() => {
        apis.getblindboard()
            .then((res) => {
                console.log("블라인드 게시물 가져오기 성공", res.data)
                setBlindBoardList(res.data)
            })
            .catch((err) => {
                console.log("블라인드 게시물 가져오기 실패", err)
            })
    }, [])

    const delBlindBoard = (boardId) => {
        apis.delblindboard(boardId)
            .then((res) => {
                console.log("블라인드 게시물 삭제완료", res)
            })
            .catch((err) => {
                console.log("블라인드 게시물 삭제 실패", err)
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