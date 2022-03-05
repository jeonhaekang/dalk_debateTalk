import "./App.css";
import { history } from "../redux/configStore";
import React from "react";
import { ConnectedRouter } from "connected-react-router";
import { Route } from "react-router-dom";
import { actionCreators as userActions } from "../redux/modules/user";

import {
  Admin,
  ChatRoom,
  Detail,
  Login,
  Main,
  MyPage,
  PostList,
  Signup,
} from "../pages/Index";
import Announcement from "../pages/MyPageContent/Announcement";
import MyEggPoint from "../pages/MyPageContent/MyEggPoint";
import MyGrade from "../pages/MyPageContent/MyGrade";
import UserRanking from "../pages/MyPageContent/UserRanking";
import styled from "styled-components";
import { GlobalStyle } from "../styles/globalStyle";
import { useDispatch, useSelector } from "react-redux";
import Footer from "./Footer";

function App() {
  // 모바일 환경에서 100vh가 적용이 안될때가 있음, 오류 해결을 위한 함수
  const handleResize = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };

  // 브라우저 창 크기를 변경시 다시 계산
  React.useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // loginCheck
  const user = useSelector((state) => state.user.user);
  const token = document.cookie;
  const tokenCheck = token.split("=")[1];

  const dispatch = useDispatch();
  React.useEffect(() => {
    if (tokenCheck && !user) dispatch(userActions.logincheckDB());
  }, []);
  
  return (
    <React.Fragment>
      <GlobalStyle />

      <ConnectedRouter history={history}>
        <Container>
          <Wrap>
            <Route path="/" exact component={Main} />
            <Route path="/admin" exact component={Admin} />
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/mypage" exact component={MyPage} />
            <Route path="/mypage/eggpoint" exact component={MyEggPoint} />
            <Route path="/mypage/grade" exact component={MyGrade} />
            <Route path="/announcement" exact component={Announcement} />
            <Route path="/ranking" exact component={UserRanking} />
            <Route path="/chatroom/:chatRoomId" exact component={ChatRoom} />
            <Route path="/postlist" exact component={PostList} />
            <Route path="/detail/:boardId" exact component={Detail} />
          </Wrap>
        </Container>
      </ConnectedRouter>
    </React.Fragment>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;

  background-color: #f6f6f6;
  //배경 이미지 받으면 url에 넣기
  background-image: url();
  background-size: cover;
  background-repeat: no-repeat;
  background-position: bottom;

  @media screen and (max-width: 1024px) {
    background-image: none;
  }
`;

const Wrap = styled.div`
  width: 100%;
  max-width: 420px;
  height: calc(var(--vh) * 100);
  box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
  position: relative;

  @media screen and (min-width: 1024px) {
    left: 11%;
    top: 0%;
    overflow: auto;
  }
`;
export default App;
