import { getCookie } from "../shared/Cookie";
import store from "../redux/configStore";
import { actionCreators as alertAction } from "../redux/modules/alert";
import { history } from "../redux/configStore";

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

const loginAction = (action) => {
  const token = getCookie("authorization");
  if (token) {
    action();
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

export { loginCheck, loginAction };
