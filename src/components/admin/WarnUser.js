import React, { useState } from 'react'
import { useEffect } from 'react';
import styled from 'styled-components';
import apis from '../../shared/apis';

function WarnUser() {
    const [WarnUserList, setWarnUserList] = useState([]);

    useEffect(() => {
        apis.getWarnUser()
            .then((res) => {
                console.log("불량유저 가져오기 성공", res)
                setWarnUserList(res.data)
            })
            .catch((err) => {
                console.log("불량유저 가져오기 실패", err)
            })
    }, [])

    const delWarnUser = (id) => {
        apis.delWarnUser(id)
            .then((res) => {
                console.log("불량유저 삭제 성공", res)
            })
            .catch((err) => {
                console.log("불량유저 삭제 실패", err)
            })
    }

    return (
        <>
            <Title>다신고 유저 목록</Title>
            {WarnUserList.map((u, idx) => {
                return <List key={idx}>
                <div> 유저 아이디 : {u.username} </div>
                <div> 신고수 : {u.warnUserCnt} </div>
                <button onClick={()=>delWarnUser(u.id)}> 삭제 </button>
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

export default WarnUser