import React, { useState } from "react";
import styled from "styled-components";
import { history } from "../redux/configStore";

import { useDispatch } from "react-redux";
import { actionCreators as userAcions } from "../redux/modules/user";

import Grid from "../elements/Grid";
import Text from "../elements/Text";

const Signup = (props) => {
  const dispatch = useDispatch();

  //아이디, 닉네임, 비밀번호 상태관리
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  // 유효성검사 체크
  const [isUsername, setIsUsername] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordCheck, setIsPasswordCheck] = useState(false);
  const [isNickname, setIsNickname] = useState(false);


  //5자이상 15자 이하 아이디
  const onChangeUsername = (e) => {
    let userNameReg = /^[A-za-z0-9]{5,15}/g;
    const currentUsername = e.target.value;
    setUsername(currentUsername);

    if (!userNameReg.test(currentUsername)) {
      setIsUsername(false);
    } else {
      setIsUsername(true);
    }
  }

  //영문 숫자 조합 8자리 패스워드
  const onChangePassword = (e) => {
    let pwReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const currentPassword = e.target.value;
    setPassword(currentPassword);

    if (!pwReg.test(currentPassword)) {
      setIsPassword(false);
    } else {
      setIsPassword(true);
    }
  }

  const onChangePasswordCheck = (e) => {
    const currentPasswordCheck = e.target.value;
    setPasswordCheck(currentPasswordCheck);

    if (password !== currentPasswordCheck) {
      setIsPasswordCheck(false);
    } else {
      setIsPasswordCheck(true);
    }
  };

  // 2자 이상 8자 이하의 닉네임
  const onChangeNickname = (e) => {
    let nicknameReg = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]{2,8}$/;
    const currentNickname = e.target.value;
    setNickname(currentNickname);

    if (!nicknameReg.test(currentNickname)) {
      setIsNickname(false);
    } else {
      setIsNickname(true);
    }
  };

  //회원가입 하면 자동로그인하게 만들기
  //signDB redux에 자동으로 로그인되게 함
  const clickSignUp = () => {
    if (
      username === "" ||
      password === "" ||
      passwordCheck === "" ||
      nickname === ""
    ) {
      alert("빈칸을 다 채워주세요!");
      return;
    } else {
      alert("회원가입 완료! 바로 메인창으로 이동합니다")
      dispatch(userAcions.signUpDB(username, password, nickname, passwordCheck))
    }
  };

  return (
    <Grid height="100vh" display="flex" justifyContent="center" flexDirection="column" alignItems="center">
      <LogoImage>
        LOGO
      </LogoImage>
      <Grid padding="0px 0px 40px 0px">
        <Grid padding="40px 0px 0px 0px">
          <LoginInput
            defaultValue={username}
            onChange={onChangeUsername}
            placeholder={"아이디 입력"}
          ></LoginInput>
          {username.length > 0 && !isUsername && (
            <Validation>아이디는 5자리 이상으로 해주세요.</Validation>
          )}
        </Grid>
        <Grid padding="10px 0px 0px 0px">
          <LoginInput
            defaultValue={nickname}
            onChange={onChangeNickname}
            placeholder={"닉네임 입력"}
          ></LoginInput>
          {nickname.length > 0 && !isNickname && (
            <Validation>닉네임은 2자리 이상 8자리 이하로 해주세요.</Validation>
          )}
        </Grid>
        <Grid padding="30px 0px 0px 0px">
          <LoginInput
            type="password"
            defaultValue={password}
            onChange={onChangePassword}
            placeholder={"패스워드 입력"}
          ></LoginInput>
          {password.length > 0 && !isPassword && (
            <Validation>8자 이상의 영문과 숫자조합을 입력해주세요.</Validation>
          )}
        </Grid>
        <Grid padding="10px 0px 0px 0px">
          <LoginInput
            type="password"
            defaultValue={passwordCheck}
            onChange={onChangePasswordCheck}
            placeholder={"패스워드 확인"}
          ></LoginInput>
          {passwordCheck.length > 0 && !isPasswordCheck && (
            <Validation>비밀번호가 다릅니다.</Validation>
          )}
        </Grid>
      </Grid>
      <Grid>
        <Grid>
          <Text>이미 계정이 있으신가요?</Text>
          <Text color="#A64BF5" cursor="pointer"
            onClick={() => {
              history.push("/login");
            }}
          >
            로그인
          </Text>
        </Grid>
      </Grid>
      <SignupBox onClick={clickSignUp}>회원가입</SignupBox>
    </Grid>
  );
};

const LogoImage = styled.div`
  display: flex;
  width: 196px;
  height: 74px;
  border: none;
  border-radius: 15px;
  color: #fff;
  font-size: 32px;
  justify-content: center;
  align-items: center;
  background-color: #CFCFCF;
`
const LoginInput = styled.input`
  width: 375px;
  height: 60px;
  box-sizing: border-box;
  border: 1px solid #9E9E9E;
  ::placeholder {
    color: #CACACA;
    font-size: 16px;
  }
`
const Validation = styled.p`
  margin-top: 5px;
  font-size: 5px;
`
const SignupBox = styled.div`
  display: flex;
  background-color: #CFCFCF;
  width: 100%;
  border: none;
  color: #fff;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 0;
  height: 74px;
  font-size: 24px;
  cursor: pointer;
`

export default Signup;
