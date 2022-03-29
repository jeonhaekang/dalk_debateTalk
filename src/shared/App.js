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
  Guide,
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
import Alert from "./Alert";
import SearchPost from "../pages/SearchPost";
import ProjectMember from "../pages/ProjectMember";
import { getCookie } from "./Cookie";
import MobileFrame from "../components/shared/MobileFrame";

function App() {
  // loginCheck
  const user = useSelector((state) => state.user.user);

  const token = getCookie("authorization");

  const dispatch = useDispatch();
  React.useEffect(() => {
    if (token && !user) dispatch(userActions.logincheckDB());
  }, []);

  return (
    <ConnectedRouter history={history}>
      <GlobalStyle />
      <MobileFrame>
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
        <Route path="/mypage/guide" exact component={Guide} />
        <Route path="/mypage/grade" exact component={MyGrade} />
        <Route path="/mypage/pointshop" exact component={PointShop} />
        <Route path="/mypage/gacha" exact component={Gacha} />
        <Route path="/announcement" exact component={Announcement} />
        <Route
          path="/announcement/:noticeId"
          exact
          component={AnnounceDetail}
        />
        <Route path="/ranking" exact component={UserRanking} />
        <Route path="/chatroom/:chatRoomId" exact component={ChatRoom} />
        <Route path="/postlist" exact component={PostList} />
        <Route path="/postlist/search/:keyword" exact component={SearchPost} />
        <Route path="/detail/:boardId" exact component={Detail} />
        <Route path="/more" exact component={More} />
        <Route path="/more/:category" exact component={Category} />
        <Route path="/projectmembers" exact component={ProjectMember} />
        <Onboarding />
      </MobileFrame>
    </ConnectedRouter>
  );
}

export default App;
