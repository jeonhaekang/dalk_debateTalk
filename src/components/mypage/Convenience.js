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
      <ConvinienceContent is_column>
        <Title>토론정보</Title>
        <FlexGrid flexWrap="wrap" gap="20px">
          <Content
            onClick={() => {
              history.push("/more");
            }}
          >
            토론리스트
          </Content>
          <Content>토론 안내</Content>

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

      <ConvinienceContent is_column>
        <Title>고객센터</Title>
        <UserOutTitle onClick={() => setCreateModalState(true)}>
          회원탈퇴
        </UserOutTitle>
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
  padding: 24px;
`;

const Title = styled.div`
  font-size: ${(props) => props.theme.fontSizes.gnb};
  font-weight: ${(props) => props.theme.fontWeight.bold};
  color: #cdcdcd;
`;

const Content = styled.div`
  font-size: ${(props) => props.theme.fontSizes.gnb};
  font-weight: ${(props) => props.theme.fontWeight.regular};
  color: ${(props) => props.theme.color.black};
  cursor: pointer;
  width: calc(100% / 2 - 20px);
`;

const UserOutTitle = styled.div`
  font-size: ${(props) => props.theme.fontSizes.gnb};
  font-weight: ${(props) => props.theme.fontWeight.regular};
  color: ${(props) => props.theme.color.black};
  cursor: pointer;
`;

export default Convenience;
