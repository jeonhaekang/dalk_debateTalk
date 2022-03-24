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
  More,
  Category,
  Gacha,
  SearchRoom,
  CreateRoom,
} from "../pages/Index";
import Announcement from "../pages/MyPageContent/Announcement";
import MyEggPoint from "../pages/MyPageContent/MyEggPoint";
import MyGrade from "../pages/MyPageContent/MyGrade";
import UserRanking from "../pages/MyPageContent/UserRanking";
import PointShop from "../pages/MyPageContent/PointShop";
import AnnounceDetail from "../pages/MyPageContent/AnnounceDetail";
import { GlobalStyle } from "../styles/globalStyle";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "./Spinner";
import Onboarding from "./Onboarding";
import SearchCategory from "../pages/SearchCategory";
import Alert from "./Alert";
import SearchPost from "../pages/SearchPost";

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
    <ConnectedRouter history={history}>
      <GlobalStyle />
      <Alert />
      <Spinner />
      <Route path="/" exact component={Main} />
      <Route path="/createroom" exact component={CreateRoom} />
      <Route path="/search/:keyword" exact component={SearchRoom} />
      <Route path="/admin" exact component={Admin} />
      <Route path="/login" exact component={Login} />
      <Route path="/signup" exact component={Signup} />
      <Route path="/mypage" exact component={MyPage} />
      <Route path="/mypage/eggpoint" exact component={MyEggPoint} />
      <Route path="/mypage/grade" exact component={MyGrade} />
      <Route path="/mypage/pointshop" exact component={PointShop} />
      <Route path="/mypage/gacha" exact component={Gacha} />
      <Route path="/announcement" exact component={Announcement} />
      <Route path="/announcement/:noticeId" exact component={AnnounceDetail} />
      <Route path="/ranking" exact component={UserRanking} />
      <Route path="/chatroom/:chatRoomId" exact component={ChatRoom} />
      <Route path="/postlist" exact component={PostList} />
      <Route path="/postlist/search/:keyword" exact component={SearchPost} />
      <Route path="/postlist/:category" exact component={SearchCategory} />
      <Route path="/detail/:boardId" exact component={Detail} />
      <Route path="/more" exact component={More} />
      <Route path="/more/:category" exact component={Category} />
      <Onboarding />
    </ConnectedRouter>
  );
}

export default App;
