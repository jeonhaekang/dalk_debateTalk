import { Route, Redirect } from "react-router-dom";
import { isLogin, adminCheck } from "./loginCheck";

const RoutePrivate = ({
  user,
  admin,
  login,
  component: Component,
  ...rest
}) => {
  //관리자 페이지 접근 막음 -------------------------------------------------------------
  if (admin) {
    return (
      <Route
        {...rest}
        render={(props) =>
          adminCheck() ? <Component {...props} /> : <Redirect to="/" />
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
