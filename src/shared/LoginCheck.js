import { getCookie } from "./Cookie";

const LoginCheck = (history) => {
  const token = getCookie("authorization");
  if (token) {
    return true;
  } else {
    return false;
  }
};

export default LoginCheck;
