import React from "react";
import styled from "styled-components";
import { history } from '../../redux/configStore'

const ShopGachaAnnounce = (props) => {
    return (
        <Wrap>
            <Content>
                <ContentImage onClick={() => {history.push('/mypage/pointshop')}}></ContentImage>
                <ContentTitle>알포인트 상점</ContentTitle>
            </Content>

            <Content>
                <ContentImage></ContentImage>
                <ContentTitle>행운뽑기</ContentTitle>
            </Content>

            <Content>
                <ContentImage onClick={() => {history.push('/announcement')}}></ContentImage>
                <ContentTitle>공지사항</ContentTitle>
            </Content>
        </Wrap>
    )
};

const Wrap = styled.div`
    display: flex;
    justify-content: space-evenly;
    padding: 30px 20px;
`

const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
`

const ContentImage = styled.div`
    width: 90px;
    height: 90px;
    background-color: #CFCFCF;
    border: none;
    border-radius: 100%;
    cursor: pointer;
`

const ContentTitle = styled.div`
    padding-top: 10px;
    color : #686868;
`



export default ShopGachaAnnounce;