import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import FlexGrid from "../../elements/FlexGrid";
import Text from "../../elements/Text";

import { history } from "../../redux/configStore";
import { actionCreators as alertAction } from "../../redux/modules/alert";
import apis from "../../shared/apis";
import { deleteCookie } from "../../shared/Cookie";

function UserOut(props) {
  const dispatch = useDispatch();

  const HandleUserOut = () => {
    apis
      .userOut()
      .then((res) => {
        dispatch(
          alertAction.open({
            message: "정상적으로 탈퇴되었습니다",
          })
        );
        deleteCookie("authorization");
        history.replace("/");
      })
      .catch((err) => {
        dispatch(
          alertAction.open({
            message: "탈퇴에 실패하였습니다",
          })
        );
      });
  };

  const NotUserOut = () => {
    props.setCreateModalState(false);
  };

  return (
    <Content is_column>
      <FlexGrid padding="30px">
        <Text size="subtitle1" weight="medium">
          정말 탈퇴하시겠어요?
          <br />
          탈퇴를 하시면 작성된 게시물과 댓글은
          복구할 수 없습니다
        </Text>
      </FlexGrid>
      <FlexGrid gap="0">
        <Yes center _onClick={HandleUserOut}>
          네
        </Yes>
        <No center _onClick={NotUserOut}>
          아니오
        </No>
      </FlexGrid>
    </Content>
  );
}
const Content = styled(FlexGrid)`
  border-radius: 15px;
  width: 300px;
  background-color: white;
  gap: 0;
  overflow: hidden;
`;

const Yes = styled(FlexGrid)`
  width: 100%;
  height: 48px;
  font-size: ${(props) => props.theme.fontSizes.subtitle1};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  background-color: ${(props) => props.theme.color.orange};
  color: white;
`;

const No = styled(Yes)`
  background-color: #cbcbcb;
`;

export default UserOut;
