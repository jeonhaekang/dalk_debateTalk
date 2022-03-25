import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import itemData from "../../data/itemData";
import { actionCreators } from "../../redux/modules/user";
import FlexGrid from "../../elements/FlexGrid";
import XScrollDrag from "../shared/XScrollDrag";
import sendIcon from "../../image/chatRoom/sendButton.svg";
import itemBuy from "../../image/chatRoom/itemBuy.svg";
import { history } from "../../redux/configStore";

const ChatInput = (props) => {
  const dispatch = useDispatch();
  // const message = React.useRef();
  const [message, setMessage] = React.useState("");
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
        <FlexGrid center width="28px">
          <svg height="28" onClick={() => setState(!state)}>
            <path
              d="M10.7218 7.40835C8.34183 10.08 6.7085 13.9183 6.55683 14.28L2.3335 12.4717L7.0585 7.74668C7.60683 7.19835 8.40016 6.95335 9.17016 7.10501L10.7218 7.40835ZM13.0318 19.8333C13.0318 19.8333 17.3952 18.025 19.9035 15.5167C26.2035 9.21668 25.1535 4.29335 24.8152 3.18501C23.7068 2.83501 18.7835 1.79668 12.4835 8.09668C9.97516 10.605 8.16683 14.9683 8.16683 14.9683L13.0318 19.8333ZM20.5918 17.2783C17.9202 19.6583 14.0818 21.2917 13.7202 21.4433L15.5285 25.6667L20.2535 20.9417C20.8018 20.3933 21.0468 19.6 20.8952 18.83L20.5918 17.2783ZM10.5002 21C10.5002 21.9683 10.1035 22.8433 9.4735 23.4733C8.09683 24.85 2.3335 25.6667 2.3335 25.6667C2.3335 25.6667 3.15016 19.9033 4.52683 18.5267C5.15683 17.8967 6.03183 17.5 7.00016 17.5C8.93683 17.5 10.5002 19.0633 10.5002 21ZM15.1668 10.5C15.1668 9.21668 16.2168 8.16668 17.5002 8.16668C18.7835 8.16668 19.8335 9.21668 19.8335 10.5C19.8335 11.7833 18.7835 12.8333 17.5002 12.8333C16.2168 12.8333 15.1668 11.7833 15.1668 10.5Z"
              fill={state ? "#F19121" : "#B4B4B4"}
            />
          </svg>
        </FlexGrid>
        <MessageInput
          value={message}
          onKeyPress={MessageEnter}
          onChange={(e) => setMessage(e.target.value)}
        />
        <EnterBtn onClick={sendMessage} message={message}>
          <img src={sendIcon} alt="send" />
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
                  onClick={() => itemUse(el.itemCode)}
                >
                  {user && <ItemCount>{user.item[el.itemCode]}</ItemCount>}
                  <ItemImg alt="item" src={el.img} />
                  <ItemText>{el.name}</ItemText>
                </ItemButton>
              );
            }
          })}
          <img
            src={itemBuy}
            alt="itemBuy"
            onClick={() => history.push("/mypage/pointshop")}
          />
        </XScrollDrag>
      </ItemWrap>
    </div>
  );
};
const ItemCount = styled.div`
  position: absolute;
  top: 5px;
  left: 6px;
  font-size: ${(props) => props.theme.fontSizes.body1};
  font-weight: ${(props) => props.theme.fontWeight.regular};
  color: white;
  text-shadow: -1px 0 #333333, 0 1px #333333, 1px 0 #333333, 0 -1px #333333;
`;

const ItemImg = styled.img`
  transform: translateY(-8px);
`;

const ItemText = styled.div`
  position: absolute;
  bottom: 13px;
  line-height: 18px;
  text-align: center;

  color: white;

  font-weight: ${(props) => props.theme.fontWeight.medium};
  text-shadow: -1px 0 #333333, 0 1px #333333, 1px 0 #333333, 0 -1px #333333;
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
  flex-grow: 1;
  font-size: 16px;
  height: 44px;
  border-radius: 10px;
  border: 1px solid #d2d2d2;
  padding: 0 10px;
`;
const InputWrap = styled.div`
  display: flex;
  gap: 8px;
  padding: 8px 16px;
  background-color: #f3f3f3;
`;

const ItemWrap = styled(FlexGrid)`
  transition: 0.2s;
  padding: 0 15px;
  height: ${(props) => (props.state ? "120px" : "0px")};
  background-color: #f3f3f3;
`;

const ItemButton = styled.div`
  width: 95px;
  height: 95px;

  flex-shrink: 0;

  background-color: ${(props) => props.color};
  border: 2px solid ${(props) => props.border};
  border-radius: 15px;

  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export default ChatInput;
