import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import FlexGrid from "../../elements/FlexGrid";
import Image from "../../elements/Image";
import Input from "../../elements/Input";
import test from "../../image/testlogo.jpeg";
import { actionCreators as alertAction } from "../../redux/modules/alert";
import { actionCreators as chatAction } from "../../redux/modules/chat";

const Vote = ({ topic, setModalState }) => {
  const dispatch = useDispatch();
  const user = useSelector((props) => props.user.user);
  const [point, setPoint] = React.useState(0);
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

  return (
    <>
      {roomInfo && (
        <FlexGrid is_column center padding="20px">
          <Image src={test} width="100px" heigh="100px" />
          <FlexGrid center textAlign="center">
            {topic ? roomInfo.topicA : roomInfo.topicB}
            <br />을 선택했어요!
          </FlexGrid>
          <FlexGrid center is_column gap="0">
            <FlexGrid>보유 알포인트</FlexGrid>
            {user && <FlexGrid>{user.point.toLocaleString()}</FlexGrid>}
          </FlexGrid>
          <FlexGrid center is_column gap="0">
            <FlexGrid>알포인트 걸기</FlexGrid>
            <FlexGrid>
              <Input
                fontSize="16px"
                width="100%"
                onChange={(e) => setPoint(parseInt(e.target.value))}
                type="number"
              />
            </FlexGrid>
          </FlexGrid>
        </FlexGrid>
      )}
      <Button onClick={vote}>배팅</Button>
    </>
  );
};

const Button = styled.button`
  width: 100%;
  padding: 10px;
  border-radius: 0 0 15px 15px;
  background-color: gray;
  border: none;
`;

export default Vote;
