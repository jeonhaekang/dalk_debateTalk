import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as noticeActions } from '../../redux/modules/notice';
import apis from '../../shared/apis';

function AnnounceDetail(props) {
    const noticeId = props.match.params.noticeId;
    const dispatch = useDispatch();

    const [detailNotice, setDetailNotice] = useState({});
    const createdAt = detailNotice.createdAt?.split("T")[0];

    useEffect(() => {
        getOneNotice();
    }, [])

    const getOneNotice = () => {
        apis.getDetailNotice(noticeId)
            .then((res) => {
                console.log("공지 상세 받기 성공", res.data)
                setDetailNotice(res.data)
            })
            .catch((err) => {
                console.log("공지 상세 받기 실패", err)
            })
    }

    return (
        <>
            <div>{detailNotice.title}</div>
            <div>{createdAt}</div>
            <div>{detailNotice.content}</div>
        </>
    )
}

export default AnnounceDetail