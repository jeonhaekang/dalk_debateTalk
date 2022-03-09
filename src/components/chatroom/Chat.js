import React from "react";
import styled from "styled-components";
import { FcSpeaker } from "react-icons/fc";
import { useSelector } from "react-redux";
import moment from "moment";

const Chat = (props) => {
  const { userInfo, message, bigFont, type, createdAt } = props;

  const [state, setState] = React.useState(false);
  console.log(bigFont);
  const time = moment(createdAt).format("HH:mm");

  const user = useSelector((state) => state.user.user);
  const myName = useSelector((state) => state.item.myName);

  const reportRef = React.useRef();

  const report = (e) => {
    if (reportRef.current === e.target) {
      setState(true);
    } else {
      setState(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener("click", report);

    return () => {
      window.removeEventListener("click", report);
    };
  });

  if (type !== "TALK") {
    return (
      <Alert>
        <FcSpeaker />
        {message}
      </Alert>
    );
  }

  return (
    <>
      <ChatBox bigFont={bigFont} user={userInfo.id === user.id ? true : false}>
        <div onClick={report} className="nickname" ref={reportRef}>
          {myName ? myName : userInfo.nickname}
        </div>
        <div className="messageBox">
          <div className="message">{message}</div>
          <div>{time}</div>
        </div>
        {state && <Report onClick={() => console.log("신고")}>신고</Report>}
      </ChatBox>
    </>
  );
};

const Report = styled.div`
  background-color: pink;
  width: 70px;

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;

  position: absolute;
  left: 20px;
  top: 20px;
`;

const Alert = styled.div`
  align-self: center;
  background-color: #9dcce0;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 5px 10px;
  border-radius: 10px;
`;

const ChatBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.user ? "flex-end" : "flex-start")};
  gap: 5px;

  position: relative;

  .messageBox {
    display: flex;
    align-items: flex-end;
    flex-direction: ${(props) => (props.user ? "row-reverse" : "row")};
    gap: 5px;
  }

  .message {
    padding: 10px;
    border-radius: 10px;
    background-color: ${(props) => (props.user ? "#E0E0E0" : "#EAEAEA")};
    ${(props) => props.bigFont && "font-size:26px;"}
    word-break: break-all;
    // 영문 한글 상관없이 전부 줄바꿈
  }
`;

export default React.memo(Chat);
