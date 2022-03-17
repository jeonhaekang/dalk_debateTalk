import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import FlexGrid from "../../elements/FlexGrid";
import Text from "../../elements/Text";
import Input from "../../elements/Input";
import test from "../../image/chatRoom/voteDalk.svg";
import { actionCreators as alertAction } from "../../redux/modules/alert";
import { actionCreators as chatAction } from "../../redux/modules/chat";

const Vote = ({ topic, setModalState }) => {
  const dispatch = useDispatch();
  const user = useSelector((props) => props.user.user);
  const [point, setPoint] = React.useState("");
  const [state, setState] = React.useState(false);
  const roomInfo = useSelector((props) => props.chat.currentRoom.roomInfo);

  const vote = () => {
    if (point > user.point) {
      dispatch(alertAction.open({ message: "까불지 말고 적당히 배팅하십쇼" }));
      return;
    }
    if (point === 0) {
      dispatch(alertAction.open({ message: "돈 없으면 가서 자라" }));
      return;
    }
    dispatch(chatAction.voteDB(roomInfo.roomId, topic, point));
    setModalState(false);
  };

  useEffect(() => {
    if (point === "") {
      setState(false);
      return;
    }
    setState(true);
  }, [point]);

  return (
    <>
      {roomInfo && (
        <FlexGrid
          is_column
          center
          padding="24px"
          size="subtitle1"
          lineHeight="20px"
          weight="medium"
          width="300px"
        >
          <img alt="voteDalk" src={test} style={{ marginTop: "20px" }} />
          <FlexGrid center is_column>
            <Text color="orange">
              {topic ? roomInfo.topicA : roomInfo.topicB}
            </Text>
            <Text>선택했어요!</Text>
          </FlexGrid>

          <FlexGrid between margin="40px 0 25px 0">
            <Text>보유 알포인트</Text>
            {user && <Text>{user.point.toLocaleString()} RP</Text>}
          </FlexGrid>

          <FlexGrid is_column gap="8px" marginBottom="36px">
            <Text> 몇 알포인트를 사용할까요?</Text>

            <FlexGrid center padding="5px 8px" backgroundColor="#F5F5F5">
              <Input
                fontSize="16px"
                width="100%"
                onChange={(e) => setPoint(e.target.value)}
                type="number"
                padding="0"
                border="none"
                backgroundColor="#F5F5F5"
                placeholder="포인트를 입력해주세요"
              />
              <Text>RP</Text>
            </FlexGrid>
          </FlexGrid>
        </FlexGrid>
      )}
      <Button state={state} onClick={vote} disabled={!state ? true : false}>
        알포인트 사용
      </Button>
    </>
  );
};

const Button = styled.button`
  width: 100%;
  height: 50px;
  border-radius: 0 0 15px 15px;
  background-color: ${(props) =>
    props.state ? props.theme.color.orange : "#CBCBCB"};
  border: none;

  font-size: ${(props) => props.theme.fontSizes.subtitle1};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  color: white;
`;

export default Vote;
