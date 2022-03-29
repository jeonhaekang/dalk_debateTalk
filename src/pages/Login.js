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
import { getCookie } from "../shared/Cookie";

const Login = () => {
  React.useEffect(() => {
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

  const dispatch = useDispatch();

  // 유저ID, PW 상태관리
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //로그인 onchange
  const onChangeUsername = (e) => {
    const currentUsername = e.target.value;
    setUsername(currentUsername);
  };

  //패스워드 onchange
  const onChangePassword = (e) => {
    const currentPassword = e.target.value;
    setPassword(currentPassword);
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

        <FlexGrid is_column gap="20px">
          <FlexGrid is_column gap="8px">
            <LoginInput
              type="text"
              placeholder={"아이디 입력"}
              onKeyDown={handleKeyDown}
              onChange={onChangeUsername}
            ></LoginInput>
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
          </FlexGrid>

          {(password === "") ? (
            <LoginBtn ok={false} onClick={handleLogin}>
              시작하기
            </LoginBtn>
          ) : (
            <LoginBtn ok={true} onClick={handleLogin}>
              시작하기
            </LoginBtn>
          )}
        </FlexGrid>

        <Grid padding="20px 0px">
          <Signuptext
            onClick={() => {
              history.push("/signup");
            }}
          >
            아직 회원이 아니신가요? 지금 <span className="gosignup">가입</span>
            하세요
          </Signuptext>
        </Grid>

        <Text onClick={() => history.push("/")} cursor="pointer">
          한번 둘러볼래요
        </Text>
      </FlexGrid>
    </>
  );
};

const LoginInput = styled.input`
  width: 100%;
  height: 60px;
  border: none;
  border-radius: 10px;
  background-color: #f1f1f1;
  padding: 25px;
  font-size: 16px;
  ::placeholder {
    color: #333333;
    font-size: 16px;
    font-weight: ${(props) => props.theme.fontWeight.light};
  }
`;

const LoginBtn = styled.button`
  background-color: ${(props) =>
    props.ok ? props.theme.color.orange : "#CBCBCB"};
  border: none;
  border-radius: 10px;
  color: #fff;
  width: 100%;
  height: 60px;
  font-size: 24px;
  font-weight: ${(props) => props.theme.fontWeight.medium};
  cursor: pointer;
  pointer-events: ${(props) => (props.ok ? null : "none")};
`;

const Signuptext = styled.div`
  font-size: ${(props) => props.theme.fontSizes.body1};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  text-decoration: underline;
  cursor: pointer;
  .gosignup {
    color: ${(props) => props.theme.color.orange};
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
