import { useEffect, useState } from "react";
import { history } from "../redux/configStore";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import styled from "styled-components";

import { ReactComponent as Visible } from "../image/login/visible.svg";
import { ReactComponent as NoneVisible } from "../image/login/noneVisible.svg";

import { actionCreators as alertAction } from "../redux/modules/alert";

import { getCookie } from "../shared/Cookie";

import { Text, FlexGrid } from "../elements/Index";

const Login = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getCookie("authorization");

    if (token) {
      dispatch(
        alertAction.open({
          message: "비정상적인 접근입니다.",
          history: () => history.replace("/"),
        })
      );
    }
  }, []);
  // 유저ID, PW 상태관리
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [state, setState] = useState(false);

  useEffect(() => {
    if (username !== "" && password !== "") setState(true);
    else setState(false);
  }, [username, password]);

  //인풋 패스워드 눈
  const [passwordType, setPasswordType] = useState(false);

  //로그인 버튼 onClick
  const handleLogin = () => {
    if (!state) return;

    //DB dispatch 하기
    dispatch(userActions.logInDB(username, password));
  };

  //엔터버튼 동작 Keydown
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <>
      <FlexGrid is_column center height="100%" padding="16px" gap="20px">
        <Text size="headline1" weight="black" color="orange" margin="80px 0">
          LET'S DALKING
        </Text>

        <FlexGrid is_column gap="20px">
          <InputBox center>
            <input
              type="text"
              placeholder={"아이디 입력"}
              onChange={(e) => setUsername(e.target.value)}
            />
          </InputBox>
          <InputBox center>
            <input
              type={passwordType ? "password" : "text"}
              placeholder={"패스워드 입력"}
              onKeyDown={handleKeyDown}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordType ? (
              <Visible onClick={() => setPasswordType(!passwordType)} />
            ) : (
              <NoneVisible onClick={() => setPasswordType(!passwordType)} />
            )}
          </InputBox>

          <LoginBtn state={state} onClick={handleLogin}>
            시작하기
          </LoginBtn>
        </FlexGrid>

        <Text
          margin="20px 0"
          size="body1"
          weight="medium"
          textDecoration="underline"
          onClick={() => {
            history.push("/signup");
          }}
        >
          아직 회원이 아니신가요? 지금 <Text color="orange">가입</Text>
          하세요
        </Text>

        <Text onClick={() => history.push("/")} cursor="pointer">
          한번 둘러볼래요
        </Text>
      </FlexGrid>
    </>
  );
};
const InputBox = styled(FlexGrid)`
  height: 60px;
  border-radius: 10px;
  padding: 0 25px;

  &,
  & input {
    width: 100%;
    background-color: #f1f1f1;
    font-size: 16px;
    font-weight: 300;
    border: none;
  }
`;

const LoginBtn = styled.button`
  background-color: ${(props) =>
    props.state ? props.theme.color.orange : "#CBCBCB"};
  border: none;
  border-radius: 10px;
  color: white;
  width: 100%;
  height: 60px;
  font-size: 24px;
  font-weight: ${(props) => props.theme.fontWeight.medium};
  cursor: pointer;
`;

export default Login;
