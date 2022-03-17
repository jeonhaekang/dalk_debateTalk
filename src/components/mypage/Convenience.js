import React, { useState } from "react";
import styled from "styled-components";
import { history } from '../../redux/configStore'
import Modal from "../shared/Modal";
import UserOut from "./UserOut";

const Convenience = () => {
    const [createModalState, setCreateModalState] = useState(false);

    return (
        <>
            <Title>토론정보</Title>
            <Wrap>
                <ContentTop onClick={() => { history.push('/ranking') }}>
                    <div>유저랭킹</div>
                    <div> > </div>
                </ContentTop>
                <Content onClick={() => { history.push('/more') }}>
                    <div>토론리스트</div>
                    <div> > </div>
                </Content>
                <Content>
                    <div>토론 즐기는 방법</div>
                    <div> > </div>
                </Content>
                <Content onClick={() => setCreateModalState(true)}>
                    <div>회원탈퇴</div>
                    <div> > </div>
                </Content>
                <Modal modalState={createModalState} setModalState={setCreateModalState}>
                    <UserOut createModalState={createModalState} setCreateModalState={setCreateModalState}/>
                </Modal>
            </Wrap>
        </>
    )
}

const Title = styled.div`
    padding: 24px 16px;
    font-size: ${(props) => props.theme.fontSizes.gnb};
    font-weight: ${(props) => props.theme.fontWeight.bold};
`
const Wrap = styled.div`
    display: flex;
    flex-direction: column;
`
const ContentTop = styled.div`
    font-size: 20px;
    color: #686868;
    display: flex;
    justify-content: space-between;
    padding: 18px 20px;
    border-top: 1px solid #C4C4C4;
    border-bottom: 1px solid #C4C4C4;
    cursor: pointer;
`
const Content = styled.div`
  font-size: 20px;
  color: #686868;
  display: flex;
  justify-content: space-between;
  padding: 18px 20px;
  border-bottom: 1px solid #C4C4C4;
  cursor: pointer;
`

export default Convenience;