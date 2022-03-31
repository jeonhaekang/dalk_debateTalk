import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import apis from '../../shared/apis';
import { actionCreators as alertAction } from '../../redux/modules/alert';
import FlexGrid from '../../elements/FlexGrid';

function WarnComment() {

    const dispatch = useDispatch();
    const [WarnCommentList, setWarnCommentList] = useState([]);

    useEffect(() => {
        apis.getWarnComment()
            .then((res) => {
                setWarnCommentList(res.data)
            })
            .catch((err) => {
                dispatch(alertAction.open({
                    message: "불량댓글 불러오기 실패"
                }))
            })
    }, []);

    const delWarnComment = (commentId) => {
        apis.delWarnComment(commentId)
            .then((res) => {
                dispatch(alertAction.open({
                    message: "불량댓글 삭제 성공"
                }))
            })
            .catch((err) => {
                dispatch(alertAction.open({
                    message: "불량댓글 삭제 실패"
                }))
            })
    }

    return (
        <>
            <Title>현재 신고 댓글</Title>
            {WarnCommentList.map((r, idx) => {
                return <FlexGrid center gap="20px" padding="10px 0px" key={idx}>
                    <div> 댓글 : {r.comment}</div>
                    <div> 신고수 : {r.warnCnt} </div>
                    <button onClick={()=>delWarnComment(r.commentId)}> 삭제 </button>
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

export default WarnComment