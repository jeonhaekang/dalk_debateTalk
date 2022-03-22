import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import FlexGrid from "../elements/FlexGrid";
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
    console.log(alert.action());
    alert.action();
    dispatch(actionCreators.close());
  };

  if (alert.openState) {
    return (
      <Portal>
        <Background>
          <Content is_column>
            <FlexGrid>{alert.message}</FlexGrid>

            {alert.type === "alert" && <button onClick={close}>확인</button>}
            {alert.type === "confirm" && (
              <FlexGrid center justifyContent="space-around">
                <button onClick={action}>확인</button>
                <button onClick={close}>취소</button>
              </FlexGrid>
            )}
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
  padding: 15px;
  width: auto;
  background-color: white;
`;

export default Alert;
