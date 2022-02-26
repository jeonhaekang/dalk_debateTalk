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
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasscheck, setIsPasscheck] = useState(false);
  const [isNickname, setIsNickname] = useState(false);


  //정규식 넣고, if로 유효성 검사 다해줘야함.
  const onChangeId = (e) => {
    const currentId = e.target.value;
    setId(currentId);
  }

  const onChangePassword = (e) => {
    const currentPassword = e.target.value;
    setPassword(currentPassword);
  }

  const onChangePasswordcheck = (e) => {
    const currentPasswordcheck = e.target.value;
    setPasswordCheck(currentPasswordcheck);

  };

  const onChangeNickname = (e) => {
    const currentNickname = e.target.value;
    setNickname(currentNickname);
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
    <>
      <div>
        <div>
          <Grid>
            <input
              value={id}
              onChange={onChangeId}
              placeholder={"아이디"}
            ></input>
          </Grid>
          <Grid>
            <input
              value={nickname}
              _onChange={onChangeNickname}
              placeholder={"닉네임"}
            ></input>
          </Grid>
          <Grid>
            <input
              type="password"
              value={password}
              onChange={onChangePassword}
              placeholder={"비밀번호"}
            ></input>
          </Grid>
          <Grid>
            <input
              type="password"
              value={passwordCheck}
              onChange={onChangePasswordcheck}
              placeholder={"비밀번호 확인"}
            ></input>
          </Grid>
        </div>
        <div>
          <button
            onClick={clickSignUp}
          >회원가입 완료</button>
        </div>
        <Grid>
          <Text color="#C4C4C4">이미 계정이 있으신가요?</Text>
          <div
            onClick={() => {
              history.push("/login");
            }}
          >
            로그인
          </div>
        </Grid>
      </div>
    </>
  );
};

export default Signup;
