import { Route, Redirect } from "react-router-dom";
import { isLogin } from "./loginCheck";

const RoutePrivate = ({ login, component: Component, ...rest }) => {
  //로그인시 로그인, 회원가입 페이지 접근 막음 -------------------------------------------------------------
  if (login) {
    return (
      <Route
        {...rest}
        render={(props) =>
          !isLogin() ? <Component {...props} /> : <Redirect to="/" />
        }
      />
    );
  }
  //비로그인시 토큰이 필요한 페이지 접근 막음 -------------------------------------------------------------
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin() ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default RoutePrivate;
