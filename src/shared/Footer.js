import React from "react";
import styled from "styled-components";
import { history } from "../redux/configStore";
import Text from "../elements/Text";
import { loginCheck } from "../modules/loginCheck";
import { ReactComponent as ChatRoom } from "../image/footer/chatRoom.svg";
import { ReactComponent as Home } from "../image/footer/home.svg";
import { ReactComponent as MyPage } from "../image/footer/myPage.svg";
import { ReactComponent as Result } from "../image/footer/result.svg";
import { ReactComponent as CreateRoom } from "../image/footer/createRoom.svg";

const Footer = () => {
  const path = window.location.pathname;

  return (
    <FooterContainer>
      <Icon onClick={() => history.push("/")}>
        <Home fill={path === "/" ? "#F19121" : "#CDCDCD"} />
        <Text>홈</Text>
      </Icon>
      <Icon onClick={() => history.push("/more")}>
        <ChatRoom fill={path === "/more" ? "#F19121" : "#CDCDCD"} />
        <Text>토론방</Text>
      </Icon>

      <Icon onClick={() => history.push("/postlist")}>
        <Result fill={path === "/postlist" ? "#F19121" : "#CDCDCD"} />
        <Text>결과방</Text>
      </Icon>

      <Icon onClick={() => loginCheck("push", "/mypage")}>
        <MyPage fill="#CDCDCD" />
        <Text>마이페이지</Text>
      </Icon>

      <Icon onClick={() => loginCheck("push", "/createroom")}>
        <CreateRoom />
      </Icon>
    </FooterContainer>
  );
};
const Icon = styled.div`
  width: 38px;
  display: flex;
  flex-direction: column;
  align-items: center;
  white-space: nowrap;
`;

const FooterContainer = styled.div`
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 0;

  height: 76px;
  border-top: 1px solid #c4c4c4;
  background-color: white;

  display: flex;
  align-items: center;
  justify-content: space-evenly;

  z-index: 5;
`;
export default Footer;
