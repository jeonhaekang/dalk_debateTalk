import React, { useState } from "react";
import styled from "styled-components";
import { history } from "../redux/configStore";

import Grid from "../elements/Grid";
import Text from "../elements/Text";

const Signup = (props) => {

  //아이디, 닉네임, 비밀번호 상태관리
  const [id, setId] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  // 유효성검사 체크
  const [isId, setIsId] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordCheck, setIsPasswordCheck] = useState(false);
  const [isNickname, setIsNickname] = useState(false);


  //5자이상 15자 이하 아이디
  const onChangeId = (e) => {
    let idReg = /^[A-za-z0-9]{5,15}/g;
    const currentId = e.target.value;
    setId(currentId);

    if (!idReg.test(currentId)) {
      setIsId(false);
    } else {
      setIsId(true);
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

  const clickSignUp = () => {
    if (
      id == "" ||
      password === "" ||
      passwordCheck === "" ||
      nickname == ""
    ) {
      alert("빈칸을 다 채워주세요!");
      return;
    } else {
      //dispatch 해야됨
      alert("회원가입 완료!")
    }
  };

  return (
    <div>
      <div>
        <Grid>
          <input
            value={id}
            onChange={onChangeId}
            placeholder={"아이디"}
          ></input>
          {id.length > 0 && !isId && (
                <p>아이디는 5자리 이상의 영문숫자 조합으로 해주세요.</p>
              )}
        </Grid>
        <Grid>
          <input
            value={nickname}
            onChange={onChangeNickname}
            placeholder={"닉네임"}
          ></input>
          {nickname.length > 0 && !isNickname && (
                <p>닉네임은 2자리 이상 8자리 이하로 해주세요.</p>
              )}
        </Grid>
        <Grid>
          <input
            type="password"
            value={password}
            onChange={onChangePassword}
            placeholder={"비밀번호"}
          ></input>
          {password.length > 0 && !isPassword && (
                <p>8자 이상의 영문과 숫자, 특수문자 조합을 입력해주세요.</p>
              )}
        </Grid>
        <Grid>
          <input
            type="password"
            value={passwordCheck}
            onChange={onChangePasswordCheck}
            placeholder={"비밀번호 확인"}
          ></input>
          {passwordCheck.length > 0 && !isPasswordCheck && (
                <p>비밀번호가 다릅니다.</p>
              )}
        </Grid>
      </div>
      <div>
        <button
          onClick={clickSignUp}
        >회원가입 완료</button>
      </div>
      <Grid>
        <Text>이미 계정이 있으신가요?</Text>
        <div
          onClick={() => {
            history.push("/login");
          }}
        >
          로그인
        </div>
      </Grid>
    </div>
  );
};

export default Signup;
