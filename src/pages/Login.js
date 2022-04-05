import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { history } from "../redux/configStore";
import styled from "styled-components";

import { actionCreators as userActions } from "../redux/modules/user";

import { ReactComponent as Visible } from "../image/login/visible.svg";
import { ReactComponent as NoneVisible } from "../image/login/noneVisible.svg";

import { Text, FlexGrid } from "../elements/Index";

const Login = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState(""); // 아이디
  const [password, setPassword] = useState(""); // 패스워드
  const [state, setState] = useState(false); // 로그인 버튼 활성화 여부
  const [passwordType, setPasswordType] = useState(false); // 비밀번호 표시 여부

  //아이디, 비밀번호 입력 여부 확인 ------------------------------------------------------------------------
  useEffect(() => {
    if (username !== "" && password !== "") setState(true);
    else setState(false);
  }, [username, password]);

  //로그인 액션 ----------------------------------------------------------------------------------
  const handleLogin = () => {
    if (!state) return;
    dispatch(userActions.logInDB(username, password));
  };

  //엔터키 입력시 로그인 액션 실행-----------------------------------------------------------------------
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };
  //------------------------------------------------------------------------------------------------
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
              onKeyDown={handleKeyDown}
              autoComplete="off"
              onChange={(e) => setUsername(e.target.value)}
            />
          </InputBox>
          <InputBox center>
            <input
              type={passwordType ? "text" : "password"}
              placeholder={"패스워드 입력"}
              onKeyDown={handleKeyDown}
              autoComplete="off"
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordType ? (
              <NoneVisible onClick={() => setPasswordType(!passwordType)} />
            ) : (
              <Visible onClick={() => setPasswordType(!passwordType)} />
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
