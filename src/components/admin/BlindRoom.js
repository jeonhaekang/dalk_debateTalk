import React, { useState, useEffect } from 'react'
import styled from 'styled-components';

import { useDispatch } from 'react-redux';
import { actionCreators as alertAction } from '../../redux/modules/alert';

import apis from '../../shared/apis';
import FlexGrid from '../../elements/FlexGrid';

function BlindRoom() {
    const dispatch = useDispatch();
    const [BlindRoomList, setBlindRoomList] = useState([]);

    useEffect(() => {
        apis.getblindroom()
            .then((res) => {
                setBlindRoomList(res.data)
            })
            .catch((err) => {
                dispatch(alertAction.open({
                    message: "불량유저 불러오기 실패"
                }))
            })
    }, [])

    const delBlindRoom = (roomId) => {
        apis.delblindroom(roomId)
            .then(() => {
                dispatch(alertAction.open({
                    message: "블라인드 채팅방 삭제 성공"
                }))
            })
            .catch(() => {
                dispatch(alertAction.open({
                    message: "블라인드 채팅방 삭제 실패"
                }))
            })
    }

    return (
        <>
            <Title>현재 블라인드 토론방</Title>
            {BlindRoomList.map((r, idx) => {
                return <FlexGrid center gap="20px" padding="10px 0px" key={idx}>
                    <div> {r.topicA} VS {r.topicB} </div>
                    <div> 신고수 : {r.chatRoomWarnCnt} </div>
                    <button onClick={()=>delBlindRoom(r.roomId)}> 삭제 </button>
                </FlexGrid>
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

export default BlindRoom