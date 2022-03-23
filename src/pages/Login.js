import React, { useState } from "react";
import { history } from "../redux/configStore";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import styled from "styled-components";

import noon from "../image/login/noon.svg";
import opennoon from "../image/login/opennoon.svg";

import Grid from "../elements/Grid";
import Text from "../elements/Text";
import { actionCreators as alertAction } from "../redux/modules/alert";
import FlexGrid from "../elements/FlexGrid";

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
      dispatch(
        alertAction.open({
          message: "아이디, 비밀번호를 모두 적어주세요",
        })
      );
    } else {
      //DB dispatch 하기
      dispatch(userActions.logInDB(username, password));
    }
  };

  //엔터버튼 동작 Keydown
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  //인풋 패스워드 눈
  const [passwordType, setPasswordType] = useState({
    type: "password",
    visible: false,
  });

  const handlePasswordType = (e) => {
    setPasswordType(() => {
      if (!passwordType.visible) {
        return { type: "text", visible: true };
      }
      return { type: "password", visible: false };
    });
  };

  return (
    <>
      <FlexGrid is_column center height="100%" padding="16px" gap="20px">
        <FlexGrid center margin="80px 0px">
          <Text size="headline1" weight="black" color="orange">
            LET'S DALKING
          </Text>
        </FlexGrid>
        {/* <LogoImage src="https://img.sbs.co.kr/newsnet/etv/upload/2014/02/04/30000353984_1280.jpg" /> */}
        <FlexGrid is_column gap="20px">
          <FlexGrid is_column gap="8px">
            <LoginInput
              type="text"
              placeholder={"아이디 입력"}
              onKeyDown={handleKeyDown}
              onChange={onChangeUsername}
            ></LoginInput>
            {username.length > 0 && !isUsername && (
              <Validation>올바른 아이디 형식을 입력해주세요.</Validation>
            )}
          </FlexGrid>
          <FlexGrid is_column gap="8px">
            <InputContainer>
              <LoginInput
                type={passwordType.type}
                placeholder={"패스워드 입력"}
                onKeyDown={handleKeyDown}
                onChange={onChangePassword}
              ></LoginInput>
              <VisiblePw onClick={handlePasswordType}>
                {passwordType.visible ? (
                  <img src={noon} alt="noon" />
                ) : (
                  <img src={opennoon} alt="opennoon" />
                )}
              </VisiblePw>
            </InputContainer>
            {password.length > 0 && !isPassword && (
              <Validation>다시 입력해주세요</Validation>
            )}
          </FlexGrid>

          <LoginBtn onClick={handleLogin}>시작하기</LoginBtn>
        </FlexGrid>

        <Grid padding="30px 0px">
          <Signuptext>
            아직 회원이 아니신가요? 지금{" "}
            <span
              className="gosignup"
              onClick={() => {
                history.push("/signup");
              }}
            >
              가입
            </span>
            하세요
          </Signuptext>
        </Grid>
      </FlexGrid>
    </>
  );
};

const LogoImage = styled.img`
  width: 196px;
`;

const LoginInput = styled.input`
  width: 100%;
  height: 60px;
  border: none;
  border-radius: 10px;
  background-color: #f1f1f1;
  padding: 25px;
  ::placeholder {
    color: #333333;
    font-size: 16px;
    font-weight: ${(props) => props.theme.fontWeight.light};
  }
`;
const Validation = styled.p`
  margin-left: 10px;
  font-size: 10px;
  color: #ff5454;
`;

const LoginBtn = styled.button`
  background-color: ${(props) => props.theme.color.orange};
  border: none;
  border-radius: 10px;
  color: #fff;
  width: 100%;
  height: 60px;
  font-size: 24px;
  font-weight: ${(props) => props.theme.fontWeight.medium};
  cursor: pointer;
`;

const Signuptext = styled.div`
  font-size: ${(props) => props.theme.fontSizes.body1};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  text-decoration: underline;
  .gosignup {
    color: ${(props) => props.theme.color.orange};
    cursor: pointer;
  }
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  height: 54px;
  width: 100%;
`;

const VisiblePw = styled.div`
  cursor: pointer;
  position: absolute;
  width: 22px;
  height: 20px;
  right: 20px;
`;

export default Login;
