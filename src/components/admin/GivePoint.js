import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { actionCreators as alertAction } from '../../redux/modules/alert';
import styled from 'styled-components'
import apis from '../../shared/apis';
import FlexGrid from '../../elements/FlexGrid';

function GivePoint() {
    const dispatch = useDispatch();
    const [username, setUserName] = useState("");
    const [point, setPoint] = useState("");
    const [content, setContent] = useState("");

    const handleUserName = (e) => {
        setUserName(e.target.value);
    };

    const handlePoint = (e) => {
        setPoint(e.target.value);
    };

    const handleContent = (e) => {
        setContent(e.target.value);
    };

    const addPoint = () => {
        apis.sendPoint(username, point, content)
            .then((res) => {
                dispatch(alertAction.open({
                    message: "포인트 보내기 성공"
                }))
                setUserName("");
                setPoint("");
                setContent("");
            })
            .catch((err) => {
                dispatch(alertAction.open({
                    message: "포인트 보내기 실패"
                }))
            })
    };

    return (
        <FlexGrid is_column padding="16px">
            <Title>유저 포인트 지급</Title>
            <FlexGrid>
                포인트 보낼 유저ID :
                <input type="text" onChange={handleUserName} value={username}></input>
            </FlexGrid>
            <FlexGrid>
                포인트 입력 :
                <input type="text" onChange={handlePoint} value={point}></input>
                Point
            </FlexGrid>
            <FlexGrid>
                로그에 보낼 내용 ;
                <input type="text" onChange={handleContent} value={content}></input>
            </FlexGrid>
                <button onClick={addPoint}>보내기</button>
        </FlexGrid>
    )
}

const Title = styled.div`
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    padding: 10px;
    font-weight: bold;
    font-size: 20px;
`

export default GivePoint