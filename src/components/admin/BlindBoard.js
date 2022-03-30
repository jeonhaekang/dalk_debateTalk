import React, { useState, useEffect } from 'react'
import styled from 'styled-components';

import { useDispatch } from 'react-redux';
import { actionCreators as alertAction } from '../../redux/modules/alert';

import apis from '../../shared/apis';
import FlexGrid from '../../elements/FlexGrid';


function BlindBoard() {
    const dispatch = useDispatch();
    const [BlindBoardList, setBlindBoardList] = useState([]);

    useEffect(() => {
        apis.getblindboard()
            .then((res) => {
                setBlindBoardList(res.data)
            })
            .catch(() => {
                dispatch(alertAction.open({
                    message: "블라인드 게시물 불러오기 실패"
                }))
            })
    }, [])

    const delBlindBoard = (boardId) => {
        apis.delblindboard(boardId)
            .then(() => {
                dispatch(alertAction.open({
                    message: "블라인드 게시물 삭제 성공"
                }))
            })
            .catch(() => {
                dispatch(alertAction.open({
                    message: "블라인드 게시물 삭제 실패"
                }))
            })
    }

    return (
        <>
        <Title>현재 블라인드 게시글</Title>
            {BlindBoardList.map((r, idx) => {
                return <FlexGrid center gap="20px" padding="10px 0px" key={idx}>
                    <div> {r.topicA} VS {r.topicB} </div>
                    <div> 신고수 : {r.boardWarnCnt} </div>
                    <button onClick={()=>delBlindBoard(r.boardId)}> 삭제 </button>
                </FlexGrid>
            })}
        </>
    )
}

const Title = styled.div`
    border-bottom: 1px solid #ccc;
    padding: 10px;
    font-weight: bold;
    font-size: 20px;
`

export default BlindBoard