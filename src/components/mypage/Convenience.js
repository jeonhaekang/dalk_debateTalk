import React, { useState } from "react";
import styled from "styled-components";
import FlexGrid from "../../elements/FlexGrid";
import { history } from '../../redux/configStore'
import Modal from "../shared/Modal";
import UserOut from "./UserOut";

const Convenience = () => {
    const [createModalState, setCreateModalState] = useState(false);

    return (
        <>
            <Title>토론정보</Title>
            <ConvinienceContent>
                <FlexGrid is_column>
                    <Content onClick={() => { history.push('/more') }}>
                        <div style={{ marginLeft: "15px" }}>토론리스트</div>
                    </Content>
                    <Content>
                        <div>토론 안내</div>
                    </Content>
                </FlexGrid>
                <FlexGrid is_column>
                    <Content onClick={() => { history.push('/ranking') }}>
                        <div>유저랭킹</div>
                    </Content>
                    <Content onClick={() => { history.push('/mypage/grade') }}>
                        <div>등급안내</div>
                    </Content>
                </FlexGrid>
            </ConvinienceContent>

            <Title>고객센터</Title>
            <UserOutTitle onClick={() => setCreateModalState(true)}>
                <div>회원탈퇴</div>
            </UserOutTitle>
            <Modal modalState={createModalState} setModalState={setCreateModalState}>
                <UserOut createModalState={createModalState} setCreateModalState={setCreateModalState} />
            </Modal>
        </>
    )
}

const ConvinienceContent = styled(FlexGrid)`
    padding-bottom : 24px;
    border-bottom: 16px solid #F1F1F1;
`
const Title = styled.div`
    padding: 20px 24px;
    font-size: ${(props) => props.theme.fontSizes.gnb};
    font-weight: ${(props) => props.theme.fontWeight.bold};
    color: #CDCDCD;
`
const Content = styled.div`
    font-size: ${(props) => props.theme.fontSizes.gnb};
    font-weight: ${(props) => props.theme.fontWeight.regular};
    color: ${(props) => props.theme.color.black};
    padding: 12px 0px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
`
const UserOutTitle = styled.div`
    font-size: ${(props) => props.theme.fontSizes.gnb};
    font-weight: ${(props) => props.theme.fontWeight.regular};
    color: ${(props) => props.theme.color.black};
    // padding: 10px 0px;
    cursor: pointer;
    margin-left: 24px;
`

export default Convenience;