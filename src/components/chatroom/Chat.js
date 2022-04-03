import { useState, memo } from "react";
import styled from "styled-components";
import { FcSpeaker } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Badge from "../../elements/Badge";
import { rank, discriminant } from "../../data/rank";
import { actionCreators as userAction } from "../../redux/modules/user";
import { actionCreators as alertAction } from "../../redux/modules/alert";

const Chat = ({ userInfo, message, bigFont, type, createdAt }) => {
  const dispatch = useDispatch();

  const [togleState, setTogleState] = useState(false); // 신고 버튼 표시 상태

  const time = moment(createdAt).format("HH:mm"); // 표기 시간 포멧 변경

  const user = useSelector((state) => state.user.user); // 내 정보
  const myName = useSelector((state) => state.item.itemList.myName); // 내 이름으로 아이템 발동 여부
  const userRank = rank[discriminant(userInfo.ex, userInfo.rank)]; // 각 유저 랭크 정보

  //신고 버튼--------------------------------------------------------------------------------------
  const togleShow = (e) => {
    if (userInfo.userId !== user.userId) setTogleState(!togleState);
    setTimeout(() => {
      setTogleState(false);
    }, 3000);
  };

  //유저 신고--------------------------------------------------------------------------------------
  const reportUser = (e) => {
    if (userInfo.userId === user.userId) {
      return;
    }
    dispatch(
      alertAction.open({
        type: "confirm",
        message: "정말로 신고하시겠습니까?",
        action: () => {
          dispatch(userAction.reportUserDB(userInfo.userId, message));
        },
      })
    );
  };

  //알림 메세지일 경우--------------------------------------------------------------------------------------
  if (type !== "TALK") {
    return (
      <Alert>
        <FcSpeaker />
        {message}
      </Alert>
    );
  }

  //--------------------------------------------------------------------------------------------
  return (
    <>
      <ChatBox
        bigFont={bigFont}
        user={userInfo?.userId === user?.userId ? true : false}
      >
        <NickName gap="3px" width="auto" center onClick={togleShow}>
          <Badge src={userRank.img}></Badge>
          {myName ? myName : userInfo.nickname}
        </NickName>
        <div className="messageBox">
          <div className="message">{message}</div>
          <div>{time}</div>
        </div>
        {togleState && <Report onClick={reportUser}>신고</Report>}
      </ChatBox>
    </>
  );
};
const NickName = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
`;

const Report = styled.div`
  background-color: #eeeeee;
  width: 70px;

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;

  position: absolute;
  top: 20px;
`;

const Alert = styled.div`
  align-self: center;
  background-color: ${(props) => props.theme.color.orange};
  color: white;

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
    border: ${(props) => (props.user ? "none" : "1px solid #D2D2D2")};
    border-radius: ${(props) =>
      props.user ? "10px 0 10px 10px" : "0 10px 10px 10px"};

    background-color: ${(props) => (props.user ? "#FAEDE1" : "white")};

    ${(props) => props.bigFont && "font-size:26px;"}
    word-break: break-all;
    // 영문 한글 상관없이 전부 줄바꿈
  }
`;

export default memo(Chat);
