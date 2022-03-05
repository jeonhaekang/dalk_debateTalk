import React from "react";
import styled from "styled-components";
import Header from "../../shared/Header";

const Announcement = () => {
    return (
        <>
            <Header />
            <ContentTop>
                <AnnouncementContent>
                    <div style={{fontSize:"14px"}}>개인정보처리방침 개정 안내 (3월 9일 시행)</div>
                    <div style={{fontSize:"12px"}}>2022-02-28</div>
                </AnnouncementContent>
                <Inner> > </Inner>
            </ContentTop>
            <ContentTop>
                <AnnouncementContent>
                    <div style={{fontSize:"14px"}}>서비스 이용약관 개정안내 (3월 23일 시행)</div>
                    <div style={{fontSize:"12px"}}>2022-02-28</div>
                </AnnouncementContent>
                <Inner> > </Inner>
            </ContentTop>
            <ContentTop>
                <AnnouncementContent>
                    <div style={{fontSize:"14px"}}>불량유저 제제내역 안내</div>
                    <div style={{fontSize:"12px"}}>2022-02-28</div>
                </AnnouncementContent>
                <Inner> > </Inner>
            </ContentTop>
            <ContentTop>
                <AnnouncementContent>
                    <div style={{fontSize:"14px"}}>Debate Talk, DALK 오픈 이벤트!</div>
                    <div style={{fontSize:"12px"}}>2022-02-28</div>
                </AnnouncementContent>
                <Inner> > </Inner>
            </ContentTop>
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