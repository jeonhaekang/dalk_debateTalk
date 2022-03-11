import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Input from "../../elements/Input";
import itemData from "../../data/itemData";
import { actionCreators } from "../../redux/modules/user";

const ChatInput = (props) => {
  const dispatch = useDispatch();
  const message = React.useRef();
  const { client, roomId, headers } = props;
  const [fontState, setFontState] = React.useState(false);
  const [state, setState] = React.useState(false);

  const itemState = useSelector((state) => state.item.itemState);
  const itemList = useSelector((state) => state.item.itemList);
  const user = useSelector((state) => state.user.user);

  const sendMessage = () => {
    if (itemList.onlyMe && itemList.onlyMe !== user.nickname) {
      console.log("나만 말하기 발동!!!");
      return;
    }
    if (!message.current.value) {
      return;
    }
    const data = {
      type: "TALK",
      roomId: roomId,
      message: message.current.value,
      bigFont: fontState ? true : false,
      papago: itemList.papago,
      reverse: itemList.reverse,
    };

    client.send("/pub/chat/message", headers, JSON.stringify(data));
    // send(url(destination), headers, body)
    message.current.value = "";
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
      console.log("bigFont");
      setFontState(true);

      setTimeout(() => {
        setFontState(false);
      }, 10000);

      dispatch(actionCreators.useItemDB(item));
      return;
    }
    // 그 외 아이템 사용
    if (user.item[item] <= 0 || !itemState) {
      console.log("아이템을 사용할 수 없습니다.");
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
    <div>
      <InputWrap>
        <button onClick={() => setState(!state)}>아이템</button>
        <Input
          flexGrow="1"
          onKeyPress={MessageEnter}
          padding="10px"
          height="40px"
          ref={message}
        />
        <button onClick={sendMessage}>송신</button>
      </InputWrap>

      <ItemWrap state={state}>
        {itemData.map((el) => {
          if (el.itemCode !== "exBuy") {
            return (
              <ItemButton
                key={el.itemCode}
                onClick={() => {
                  itemUse(el.itemCode);
                }}
              >
                {el.name}
                {user.item[el.itemCode]}
              </ItemButton>
            );
          }
        })}
      </ItemWrap>
    </div>
  );
};

const InputWrap = styled.div`
  display: flex;
`;

const ItemWrap = styled.div`
  transition: 0.2s;
  padding: 0 15px;
  height: ${(props) => (props.state ? "120px" : "0px")};

  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 15px;

  overflow: scroll;
`;

const ItemButton = styled.button`
  width: 90px;
  height: 90px;

  flex-shrink: 0;
`;

export default ChatInput;
