import React, { useState } from 'react'
import { useEffect } from 'react';
import styled from 'styled-components';
import apis from '../../shared/apis';

function BlindRoom() {
    const [BlindRoomList, setBlindRoomList] = useState([]);

    useEffect(() => {
        apis.getblindroom()
            .then((res) => {
                console.log("블라인드 채팅방 가져오기 성공", res.data)
                setBlindRoomList(res.data)
            })
            .catch((err) => {
                console.log("블라인드 채팅방 가져오기 실패", err)
            })
    }, [])

    const delBlindRoom = () => {
        apis.delblindroom()
            .then((res) => {
                console.log("블라인드 채팅방 삭제완료", res)
                alert("삭제 완료")
            })
            .catch((err) => {
                console.log("블라인드 채팅방 삭제 실패", err)
            })
    }

    return (
        <>
            {BlindRoomList.map((r, idx) => {
                return <List key={idx}>
                    <div> {r.topicA} VS {r.topicB} </div>
                    <div> 신고수 : {r.warnCnt} </div>
                    <button onClick={delBlindRoom}> 삭제 </button>
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

export default BlindRoom