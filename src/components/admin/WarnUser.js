import React,{ useState } from 'react'
import styled from 'styled-components';

function WarnUser() {
    const [WarnUserList, setWarnUserList] = useState([]);
    return (
        <Title>다신고 유저 목록</Title>
    )
}

const Title = styled.div`
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    padding: 10px;
    font-weight: bold;
    font-size: 20px;
`

export default WarnUser