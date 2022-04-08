import { getCookie } from "../shared/Cookie";
import store from "../redux/configStore";
import { actionCreators as alertAction } from "../redux/modules/alert";
import { history } from "../redux/configStore";

//페이지 이동 전 로그인 여부 판단 후 알림 메세지 출력----------------------------------------------------
const loginCheck = (action, url) => {
  const token = getCookie("authorization");
  if (token) {
    history[action](url);
  } else {
    store.dispatch(
      alertAction.open({
        type: "confirm",
        message: "로그인이 필요합니다",
        action: () => history.push("/login"),
      })
    );
  }
};

//RoutePrivate에서 로그인 여부 판단---------------------------------------------------------------
const isLogin = () => {
  const token = getCookie("authorization");

  return token;
};

export { loginCheck, isLogin};
