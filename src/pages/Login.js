import React, { useState } from "react";
import { history } from "../redux/configStore";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import styled from "styled-components";

import Grid from "../elements/Grid";
import Text from "../elements/Text";

const Login = (props) => {
  const dispatch = useDispatch();

  // 유저ID, PW 상태관리
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // 유효성검사
  const [isUsername, setIsUsername] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

  //로그인 onchange
  const onChangeUsername = (e) => {
    let userNameReg = /^[A-za-z0-9]{5,15}/g;
    const currentUsername = e.target.value;
    setUsername(currentUsername);
    if (!userNameReg.test(currentUsername)) {
      setIsUsername(false);
    } else {
      setIsUsername(true);
    }
  };

  //패스워드 onchange
  const onChangePassword = (e) => {
    let pwReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const currentPassword = e.target.value;
    setPassword(currentPassword);
    if (!pwReg.test(currentPassword)) {
      setIsPassword(false);
    } else {
      setIsPassword(true);
    }
  };

  //로그인 버튼 onClick
  const handleLogin = () => {
    if (username === "" || password === "") {
      alert("아이디 또는 비밀번호를 채워주세요!");
    } else {
      //DB dispatch 하기
      dispatch(userActions.logInDB(username, password));
      alert("로그인 완료!");
    }
  };

  //엔터버튼 동작 Keydown
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <>
      <Wrap>
        <LogoImage src="https://img.sbs.co.kr/newsnet/etv/upload/2014/02/04/30000353984_1280.jpg" />

        <Grid padding="30px 0px">
          <LoginInput
            type="text"
            placeholder={"아이디 입력"}
            onKeyDown={handleKeyDown}
            onChange={onChangeUsername}
          ></LoginInput>
          {username.length > 0 && !isUsername && (
            <Validation>올바른 아이디 형식을 입력해주세요.</Validation>
          )}
        </Grid>
        <Grid padding="0px 0px 30px 0px">
          <LoginInput
            type="password"
            placeholder={"패스워드 입력"}
            onKeyDown={handleKeyDown}
            onChange={onChangePassword}
          ></LoginInput>
          {password.length > 0 && !isPassword && (
            <Validation>8자 이상의 영문/숫자 조합을 입력해주세요.</Validation>
          )}
        </Grid>

        <LoginBtn onClick={handleLogin}>로그인</LoginBtn>

        <Grid padding="30px 0px">
          <Text>DALK 회원이 아니신가요?</Text>
          <Text
            color="#A64BF5"
            cursor="pointer"
            onClick={() => {
              history.push("/signup");
            }}
          >
            회원가입
          </Text>
        </Grid>
      </Wrap>
    </>
  );
};
const Wrap = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`
const LogoImage = styled.img`
  display: flex;
  width: 196px;
  height: 196px;
  border: none;
  border-radius: 15px;
  color: #fff;
  font-size: 32px;
  justify-content: center;
  align-items: center;
`;
const LoginInput = styled.input`
  width: 375px;
  height: 60px;
  box-sizing: border-box;
  border: 1px solid #9e9e9e;
  padding: 10px;
  ::placeholder {
    color: #cacaca;
    font-size: 16px;
  }
`;
const Validation = styled.p`
  margin-top: 5px;
  font-size: 6px;
`;
const LoginBtn = styled.button`
  background-color: #cfcfcf;
  border: none;
  color: #fff;
  width: 375px;
  padding: 16px;
  height: 74px;
  font-size: 24px;
  cursor: pointer;
`;

export default Login;
