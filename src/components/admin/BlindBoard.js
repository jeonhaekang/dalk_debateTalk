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

    const delBlindBoard = () => {
        apis.delblindboard()
            .then((res) => {
                console.log("블라인드 게시물 삭제완료", res)
                alert("삭제 완료")
            })
            .catch((err) => {
                console.log("블라인드 게시물 삭제 실패", err)
            })
    }

    return (
        <>
            {BlindBoardList.map((r, idx) => {
                return <List key={idx}>
                    <div> {r.topicA} VS {r.topicB} </div>
                    <div> 신고수 : {r.warnCnt} </div>
                    <button onClick={delBlindBoard}> 삭제 </button>
                </List>
            })}
        </>
    )
}

const List = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
    padding: 10px 0px;
`

export default BlindBoard