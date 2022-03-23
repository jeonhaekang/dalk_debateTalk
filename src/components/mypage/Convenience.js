import React, { useState } from "react";
import styled from "styled-components";
import { history } from "../../redux/configStore";

import FlexGrid from "../../elements/FlexGrid";
import Text from "../../elements/Text";

import Modal from "../shared/Modal";
import UserOut from "./UserOut";

const Convenience = () => {
  const [createModalState, setCreateModalState] = useState(false);

  return (
    <>
      <ConvinienceContent is_column gap="0px">
        <Title>토론정보</Title>
        <FlexGrid is_column gap="0px">
          <Content
            onClick={() => {
              history.push("/more");
            }}
          >
            토론리스트
          </Content>
          <Content>
            토론 안내
            </Content>

          <Content
            onClick={() => {
              history.push("/ranking");
            }}
          >
            유저랭킹
          </Content>
          <Content
            onClick={() => {
              history.push("/mypage/grade");
            }}
          >
            등급안내
          </Content>
        </FlexGrid>
      </ConvinienceContent>

      <ConvinienceContent is_column gap="0px">
        <Title>고객센터</Title>
        <Content onClick={() => setCreateModalState(true)}>
          회원탈퇴
        </Content>
      </ConvinienceContent>

      <Modal modalState={createModalState} setModalState={setCreateModalState}>
        <UserOut
          createModalState={createModalState}
          setCreateModalState={setCreateModalState}
        />
      </Modal>
    </>
  );
};

const ConvinienceContent = styled(FlexGrid)`
  background-color: white;
`;

const Title = styled.div`
  font-size: ${(props) => props.theme.fontSizes.gnb};
  font-weight: ${(props) => props.theme.fontWeight.bold};
  color: #333333;
  background-color: #FAEDE1;
  padding: 16px 27px;
`;

const Content = styled.div`
  font-size: ${(props) => props.theme.fontSizes.gnb};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  color: ${(props) => props.theme.color.black};
  cursor: pointer;
  padding: 16px 27px;
  border-bottom: 1px solid #C4C4C4;
  :last-child {
    border: none;
  }
`;

export default Convenience;
