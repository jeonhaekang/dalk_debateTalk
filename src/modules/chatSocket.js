import { actionCreators as chatAction } from "../redux/modules/chat";
import { actionCreators as itemAction } from "../redux/modules/item";
import { actionCreators as alertAction } from "../redux/modules/alert";
import store from "../redux/configStore";
import { history } from "../redux/configStore";

export const connectSocket = ({ roomId, headers, client }) => {
  // 연결 성공시 호출함수
  const connectCallback = () => {
    client.subscribe(`/sub/chat/${roomId}`, subCallback, headers);
    // subscribe("url", callback, headers)
    EnterMessage({ client, headers, roomId });
  };

  // 연결 실패시 호출함수
  const errorCallback = () => {
    client.disconnect(() => client.unsubscribe("sub-0"), headers);
    store.dispatch(
      alertAction.open({
        message: "채팅방 연결에 실패하였습니다.",
        history: () => history.goBack(),
      })
    );
  };

  // 구독 여부 확인
  const EnterMessage = () => {
    setTimeout(() => {
      if (client.subscriptions["sub-0"]) {
        client.send(
          "/pub/chat/enter",
          headers,
          JSON.stringify({ type: "ENTER", roomId: roomId })
        );
        return;
      }
      EnterMessage();
    }, 100);
  };

  // 소켓 연결
  client.connect(headers, connectCallback, errorCallback);
  // connect(headers, connectCallback, errorCallback); : 헤더를 전달해야 하는 경우의 형식
};

// 메세지 수신시 호출 함수
const subCallback = (log) => {
  // 구독 콜백함수
  const newMessage = JSON.parse(log.body);

  //메세지 추가
  store.dispatch(chatAction.newMessage(newMessage));

  if (newMessage.type === "ITEMTIMEOUT") {
    // 아이템 시간 종료시
    store.dispatch(itemAction.clear());
    return;
  }

  if (newMessage.type === "ENTER") {
    store.dispatch(chatAction.enterUser(newMessage.userInfo));
  }

  if (newMessage.type === "EXIT") {
    store.dispatch(chatAction.exitUser(newMessage.userInfo));
  }

  if (newMessage.type === "ENTER" || newMessage.type === "ITEM") {
    // 입장시, 누군가 아이템 사용시 사용중인 사용자 지정
    const myName = newMessage.myName; // myName을 사용중인 유저
    const onlyMe = newMessage.onlyMe; // onlyMe를 사용중인 유저
    const papago = newMessage.papago; // onlyMe를 사용중인 유저
    const reverse = newMessage.reverse; // onlyMe를 사용중인 유저

    if (myName || onlyMe || papago || reverse) {
      // 사용중인 유저가 있을시 유저를 셋팅하고 아이템 사용을 막음
      myName && store.dispatch(itemAction.setUser("myName", myName));
      onlyMe && store.dispatch(itemAction.setUser("onlyMe", onlyMe));
      papago && store.dispatch(itemAction.setUser("papago", papago));
      reverse && store.dispatch(itemAction.setUser("reverse", reverse));
      store.dispatch(itemAction.setItemState(false));
      return;
    }
    // 사용중인 유저가 없으면 아이템을 사용 가능하게 함
    store.dispatch(itemAction.clear());
  }
};
