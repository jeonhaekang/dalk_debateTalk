import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import itemData from "../../data/itemData";
import { actionCreators } from "../../redux/modules/user";
import FlexGrid from "../../elements/FlexGrid";
import XScrollDrag from "../shared/XScrollDrag";

import { history } from "../../redux/configStore";
import { actionCreators as alertAction } from "../../redux/modules/alert";
import ItemButton from "../../elements/ItemButton";
import { ReactComponent as ItemBuy } from "../../image/chatRoom/itemBuy.svg";
import { ReactComponent as SendIcon } from "../../image/chatRoom/send.svg";
import { ReactComponent as RocketIcon } from "../../image/chatRoom/rocket.svg";

const ChatInput = ({ client, roomId, headers }) => {
  const dispatch = useDispatch();
  const [message, setMessage] = React.useState("");

  const [fontState, setFontState] = React.useState(false);
  const [state, setState] = React.useState(false);

  const itemState = useSelector((state) => state.item.itemState);
  const itemList = useSelector((state) => state.item.itemList);
  const user = useSelector((state) => state.user.user);

  const sendMessage = () => {
    if (itemList.onlyMe && itemList.onlyMe !== user.nickname) {
      dispatch(
        alertAction.open({
          message: "나만 말하기 발동 중입니다",
        })
      );
      return;
    }
    if (message === "") {
      return;
    }
    const data = {
      type: "TALK",
      roomId: roomId,
      message: message,
      bigFont: fontState ? true : false,
      papago: itemList.papago,
      reverse: itemList.reverse,
    };

    client.send("/pub/chat/message", headers, JSON.stringify(data));
    // send(url(destination), headers, body)
    setMessage("");
  };

  const MessageEnter = (e) => {
    // enter입력시 메세지 전송
    if (e.key === "Enter") {
      sendMessage();
    }
  };
  const itemUse = (item) => {
    // 빅폰트사용
    if (user.item[item] > 0 && item === "bigFont") {
      setFontState(true);

      setTimeout(() => {
        setFontState(false);
      }, 20000);

      dispatch(actionCreators.useItemDB(item));
      return;
    }
    // 그 외 아이템 사용
    if (user.item[item] <= 0 || !itemState) {
      dispatch(
        alertAction.open({
          message: "아이템을 사용할 수 없습니다",
        })
      );
      return;
    }
    dispatch(actionCreators.useItemDB(item));

    const data = {
      type: "ITEM",
      roomId: roomId,
      item: item,
    };

    client.send("/pub/chat/message", headers, JSON.stringify(data));
  };
  return (
    <InputContainer>
      <InputWrap>
        <FlexGrid center width="28px">
          <RocketIcon
            fill={state ? "#F19121" : "#B4B4B4"}
            onClick={() => setState(!state)}
          />
        </FlexGrid>
        <MessageInput
          value={message}
          onKeyPress={MessageEnter}
          onChange={(e) => setMessage(e.target.value)}
        />
        <EnterBtn onClick={sendMessage} message={message}>
          <SendIcon />
        </EnterBtn>
      </InputWrap>

      <ItemWrap state={state}>
        <XScrollDrag gap="15px">
          {itemData.map((el) => {
            if (user?.item[el.itemCode] !== 0 && el.itemCode !== "exBuy") {
              return (
                <ItemButton
                  {...el}
                  key={el.itemCode}
                  count={user?.item[el.itemCode]}
                  onClick={() => itemUse(el.itemCode)}
                />
              );
            }
          })}
          <FlexGrid>
            <ItemBuy onClick={() => history.push("/mypage/pointshop")} />
          </FlexGrid>
        </XScrollDrag>
      </ItemWrap>
    </InputContainer>
  );
};
const InputContainer = styled.div`
  width: 100%;
`;

const EnterBtn = styled.button`
  width: 55px;
  height: 44px;
  background-color: ${(props) =>
    props.message === "" ? "#dddddd" : props.theme.color.orange};
  border-radius: 10px;
  border: none;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const MessageInput = styled.input`
  width: 100%;
  font-size: 16px;
  height: 44px;
  border-radius: 10px;
  border: 1px solid #d2d2d2;
  padding: 0 10px;
`;
const InputWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  height: 60px;
  padding: 0px 16px;
  background-color: #f3f3f3;
  width: 100%;
`;

const ItemWrap = styled(FlexGrid)`
  transition: 0.2s;
  padding: 0 15px;
  height: ${(props) => (props.state ? "120px" : "0px")};
  background-color: #f3f3f3;
`;

export default ChatInput;
