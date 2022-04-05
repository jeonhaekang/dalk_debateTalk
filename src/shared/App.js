import { history } from "../redux/configStore";
import React from "react";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";
import { actionCreators as userActions } from "../redux/modules/user";
import { GlobalStyle } from "../styles/globalStyle";
import { useDispatch, useSelector } from "react-redux";

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
  Announcement,
  AnnounceDetail,
  MyEggPoint,
  MyGrade,
  UserRanking,
  PointShop,
  SearchPost,
  ProjectMember,
  EmptyPage,
} from "../pages/Index";

import Spinner from "./Spinner";
import Onboarding from "./Onboarding";
import Alert from "./Alert";

import { getCookie } from "./Cookie";
import MobileFrame from "../components/shared/MobileFrame";
import RoutePrivate from "../modules/RoutePrivate";

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
        <Switch>
          <Route path="/" exact component={Main} />
          <RoutePrivate path="/createroom" exact component={CreateRoom} />
          <Route path="/search/:keyword" exact component={SearchRoom} />
          <Route path="/admin" exact component={Admin} />
          <RoutePrivate login path="/login" exact component={Login} />
          <RoutePrivate login path="/signup" exact component={Signup} />
          <RoutePrivate path="/mypage" exact component={MyPage} />
          <RoutePrivate path="/mypage/eggpoint" exact component={MyEggPoint} />
          <RoutePrivate path="/mypage/guide" exact component={Guide} />
          <RoutePrivate path="/mypage/grade" exact component={MyGrade} />
          <RoutePrivate path="/mypage/pointshop" exact component={PointShop} />
          <RoutePrivate path="/mypage/gacha" exact component={Gacha} />
          <Route path="/announcement" exact component={Announcement} />
          <Route
            path="/announcement/:noticeId"
            exact
            component={AnnounceDetail}
          />
          <RoutePrivate path="/ranking" exact component={UserRanking} />
          <RoutePrivate
            path="/chatroom/:chatRoomId"
            exact
            component={ChatRoom}
          />
          <Route path="/postlist" exact component={PostList} />
          <Route
            path="/postlist/search/:keyword"
            exact
            component={SearchPost}
          />
          <Route path="/detail/:boardId" exact component={Detail} />
          <Route path="/more" exact component={More} />
          <Route path="/more/:category" exact component={Category} />
          <Route path="/projectmembers" exact component={ProjectMember} />
          <Route component={EmptyPage} />
        </Switch>
        <Onboarding />
      </MobileFrame>
    </ConnectedRouter>
  );
}

export default App;
