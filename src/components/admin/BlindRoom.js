import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators } from '../../redux/modules/chat';
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

    const delBlindRoom = (roomId) => {
        apis.delblindroom(roomId)
            .then((res) => {
                console.log("블라인드 채팅방 삭제완료", res)
            })
            .catch((err) => {
                console.log("블라인드 채팅방 삭제 실패", err)
            })
    }

    return (
        <>
            <Title>현재 블라인드 토론방</Title>
            {BlindRoomList.map((r, idx) => {
                return <List key={idx}>
                    <div> {r.topicA} VS {r.topicB} </div>
                    <div> 신고수 : {r.warnCnt} </div>
                    <button onClick={()=>delBlindRoom(r.roomId)}> 삭제 </button>
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

export default BlindRoom