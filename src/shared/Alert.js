import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import FlexGrid from "../elements/FlexGrid";
import Text from "../elements/Text";
import { actionCreators } from "../redux/modules/alert";
import Portal from "./Portal";

const Alert = () => {
  const dispatch = useDispatch();
  const alert = useSelector((props) => props.alert);

  const close = () => {
    alert.history();
    dispatch(actionCreators.close());
  };

  const action = () => {
    alert.action();
    dispatch(actionCreators.close());
  };

  if (alert.openState) {
    return (
      <Portal>
        <Background>
          <Content is_column>
            <FlexGrid center padding="40px 24px">
              <Text size="subtitle1" weight="medium">
                {alert.message}
              </Text>
            </FlexGrid>
            <FlexGrid gap="0">
              {alert.type === "alert" && (
                <Yes center _onClick={close}>
                  확인
                </Yes>
              )}
              {alert.type === "confirm" && (
                <>
                  <Yes center _onClick={action}>
                    확인
                  </Yes>
                  <No center _onClick={close}>
                    취소
                  </No>
                </>
              )}
            </FlexGrid>
          </Content>
        </Background>
      </Portal>
    );
  }
  return null;
};

const Background = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);

  display: flex;
  justify-content: center;
  align-items: center;
`;

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

export default Alert;
