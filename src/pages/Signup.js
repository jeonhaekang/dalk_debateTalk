import React, { useState } from "react";
import styled from "styled-components";
import { history } from "../redux/configStore";

import { useDispatch } from "react-redux";
import { actionCreators as userAcions } from "../redux/modules/user";

import Grid from "../elements/Grid";
import Text from "../elements/Text";
import Input from "../elements/Input";
import Button from "../elements/Button";

const Signup = (props) => {
  const dispatch = useDispatch()

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
      username == "" ||
      password === "" ||
      passwordCheck === "" ||
      nickname == ""
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
      <Grid margin="30px 0px">
        <Grid margin="30px 0px 0px 0px">
          <Input
            width="250px"
            boxSizing="border-box"
            defaultValue={username}
            onChange={onChangeUsername}
            placeholder={"아이디"}
          ></Input>
          {username.length > 0 && !isUsername && (
            <Validation>아이디는 5자리 이상으로 해주세요.</Validation>
          )}
        </Grid>
        <Grid margin="30px 0px 0px 0px">
          <Input
            width="250px"
            boxSizing="border-box"
            defaultValue={nickname}
            onChange={onChangeNickname}
            placeholder={"닉네임"}
          ></Input>
          {nickname.length > 0 && !isNickname && (
            <Validation>닉네임은 2자리 이상 8자리 이하로 해주세요.</Validation>
          )}
        </Grid>
        <Grid margin="30px 0px 0px 0px">
          <Input
            width="250px"
            boxSizing="border-box"
            type="password"
            defaultValue={password}
            onChange={onChangePassword}
            placeholder={"비밀번호"}
          ></Input>
          {password.length > 0 && !isPassword && (
            <Validation>8자 이상의 영문과 숫자조합을 입력해주세요.</Validation>
          )}
        </Grid>
        <Grid margin="30px 0px 0px 0px">
          <Input
            width="250px"
            boxSizing="border-box"
            type="password"
            defaultValue={passwordCheck}
            onChange={onChangePasswordCheck}
            placeholder={"비밀번호 확인"}
          ></Input>
          {passwordCheck.length > 0 && !isPasswordCheck && (
            <Validation>비밀번호가 다릅니다.</Validation>
          )}
        </Grid>
      </Grid>
      <Grid>
        <Button
          cursor="pointer"
          onClick={clickSignUp}
          height="40px"
          width="140px"
        >회원가입 완료</Button>
      </Grid>
      <Grid margin="30px 0px 0px 0px">
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
  );
};

const Validation = styled.p`
    margin-top: 5px;
    font-size: 5px;
`;

export default Signup;
