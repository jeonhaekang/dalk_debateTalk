import React, { useState } from "react";
import { history } from "../redux/configStore";
import styled from "styled-components";

import Grid from "../elements/Grid";
import Input from "../elements/Input";
import Text from "../elements/Text";
import Button from "../elements/Button"

const Login = (props) => {

  // 유저ID, PW 상태관리
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  // 유효성검사
  const [isId, setIsId] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

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

  //로그인 버튼
  const handleLogin = () => {
    if (id === "" || password === "") {
      alert("아이디 또는 비밀번호를 채워주세요!")
    } else {
      //DB dispatch 하기
      alert("로그인 완료!")
    }
  };

  //엔터버튼 동작
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };


  return (
    <Grid>
      <Grid height="100vh" display="flex" justifyContent="center" flexDirection="column" alignItems="center">
        <Grid margin="30px 0px">
          <Input
          width="250px"
            boxSizing="border-box"
            type="text"
            placeholder={"아이디를 입력하세요"}
            onKeyDown={handleKeyDown}
            onChange={onChangeId}
          >
          </Input>
          {id.length > 0 && !isId && (
            <Validation>
              올바른 아이디 형식을 입력해주세요.
            </Validation>
          )}
        </Grid>
        <Grid margin="0px 0px 30px 0px">
          <Input
          width="250px"
            boxSizing="border-box"
            type="text"
            placeholder={"비밀번호를 입력하세요"}
            onKeyDown={handleKeyDown}
            onChange={onChangePassword}
          >
          </Input>
          {password.length > 0 && !isPassword && (
            <Validation>
              8자 이상의 영문/숫자 조합을 입력해주세요.
            </Validation>
          )}
        </Grid>

        <Button 
          cursor="pointer"
          onClick={handleLogin}
          height="40px"
          width="140px"
        >로그인하기
        </Button>

        <Grid margin="30px 0px">
          <Text>DALK 회원이 아니신가요?</Text>
          <Text color="#A64BF5" cursor="pointer"
            onClick={() => {
              history.push("/signup");
            }}
          >
            회원가입
          </Text>
        </Grid>
      </Grid>
    </Grid>
  )
};

const Validation = styled.p`
    margin-top: 5px;
    font-size: 6px;
`;

export default Login;
