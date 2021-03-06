import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import FlexGrid from "../elements/FlexGrid";
import Text from "../elements/Text";
import { actionCreators as alertAction } from "../redux/modules/alert";
import Portal from "./Portal";
import { fadeIn, fadeOut, slideIn } from "../animation/alert";
import { history } from "../redux/configStore";

const Alert = () => {
  const dispatch = useDispatch();
  const alert = useSelector((props) => props.alert);
  const [aniState, setAniState] = React.useState(false);

  useEffect(() => {
    // history 변경 감지
    if (alert.openState) {
      history.listen(() => {
        dispatch(alertAction.close());
      });
    }
  }, [alert.openState]);

  const close = () => {
    setAniState(true);

    setTimeout(() => {
      setAniState(false);
      alert.history();
      dispatch(alertAction.close());
    }, 200);
  };

  const action = () => {
    alert.action();
    dispatch(alertAction.close());
  };

  if (alert.openState) {
    return (
      <Portal>
        <AlertLayout aniState={aniState}>
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
                  <No center _onClick={close}>
                    취소
                  </No>
                  <Yes center _onClick={action}>
                    확인
                  </Yes>
                </>
              )}
            </FlexGrid>
          </Content>
        </AlertLayout>
      </Portal>
    );
  }
  return null;
};

const AlertLayout = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);

  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;

  animation: ${(props) => (props.aniState ? fadeOut : fadeIn)} 0.2s;
`;

const Content = styled(FlexGrid)`
  border-radius: 15px;
  width: 300px;
  background-color: white;
  gap: 0;
  overflow: hidden;

  animation: ${(props) => !props.aniState && slideIn} 0.2s;
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
