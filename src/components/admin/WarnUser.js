import React, { useState, useEffect } from 'react'
import styled from 'styled-components';

import { useDispatch } from 'react-redux';
import { actionCreators as alertAction } from '../../redux/modules/alert';

import apis from '../../shared/apis';


function WarnUser() {
    const dispatch = useDispatch();
    const [WarnUserList, setWarnUserList] = useState([]);

    useEffect(() => {
        apis.getWarnUser()
            .then((res) => {
                setWarnUserList(res.data)
            })
            .catch((err) => {
                dispatch(alertAction.open({
                    message: "불량유저 정보 불러오기 실패"
                }))
            })
    }, [])

    const delWarnUser = (userId) => {
        apis.delWarnUser(userId)
            .then((res) => {
                dispatch(alertAction.open({
                    message: "불량유저 삭제 성공"
                }))
            })
            .catch((err) => {
                dispatch(alertAction.open({
                    message: "불량유저 삭제 실패"
                }))
            })
    }

    return (
        <>
            <Title>다신고 유저 목록</Title>
            {WarnUserList.map((u, idx) => {
                return <List key={idx}>
                <div> ID : {u.username} </div>
                <div> 닉네임 : {u.nickname} </div>
                <div> 신고수 : {u.userWarnCnt} </div>
                <button onClick={()=>delWarnUser(u.userId)}> 삭제 </button>
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
    gap: 8px;
    padding: 10px 0px;
`

export default WarnUser