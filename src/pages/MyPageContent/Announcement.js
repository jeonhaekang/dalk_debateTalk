import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as noticeActions } from "../../redux/modules/notice";
import styled from "styled-components";
import Header from "../../shared/Header";
import { history } from "../../redux/configStore";

const Announcement = () => {
    const dispatch = useDispatch();
    const noticeList = useSelector(state => state.notice.NoticeList)

    useEffect(() => {
        dispatch(noticeActions.getNoticeDB())
    }, [])

    const handleDetail = (noticeId) => {
        history.push(`/announcement/${noticeId}`)
    }

    return (
        <>
            <Header />
            {noticeList.map((el, idx) => {
                return <ContentTop key={idx}>
                    <AnnouncementContent>
                        <div style={{ fontSize: "14px" }}>{el.title}</div>
                        <div style={{ fontSize: "12px" }}>{el.createdAt}</div>
                    </AnnouncementContent>
                    <Inner onClick={() => handleDetail(el.noticeId)}> > </Inner>
                </ContentTop>
            })
            }
        </>
    )
};

const ContentTop = styled.div`
    font-size: 20px;
    color: #686868;
    display: flex;
    justify-content: space-between;
    padding: 18px 20px;
    border-top: 1px solid #C4C4C4;
    border-bottom: 1px solid #C4C4C4;
`
const AnnouncementContent = styled.div`
    display: flex;
    flex-direction: column;
`
const Inner = styled.div`
    display: flex;
    align-items: center;
`

export default Announcement;