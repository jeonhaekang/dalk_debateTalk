import React, { useState } from "react";
import styled from "styled-components";
import { history } from "../redux/configStore";

import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { actionCreators as alertAction } from "../redux/modules/alert";

import Text from "../elements/Text";
import FlexGrid from "../elements/FlexGrid";

import check from "../image/login/check.svg";

import Modal from "../components/shared/Modal";
import MemberPolicy from "../components/shared/MemberPolicy";
import { getCookie } from "../shared/Cookie";
import apis from "../shared/apis";

const Signup = (props) => {
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
  //약관 체크
  const [useCheck, setUseCheck] = useState(false);

  //약관보기 모달
  const [createModalState, setCreateModalState] = useState(false);

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
  const [idVal, setIdVal] = useState(false);
  const [nicknameVal, setNicknameVal] = useState(false);

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
  };

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
  };

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

  // 올바르게 되었으면 체크표시
  const useBtnEvent = () => {
    if (useCheck === false) {
      setUseCheck(true);
    } else {
      setUseCheck(false);
    }
  };

  //아이디 닉네임 중복검사
  const handleIdVal = () => {
    apis
      .idValidate(username)
      .then((res) => {
        setIdVal(true);
        dispatch(
          alertAction.open({
            message: "사용가능한 아이디입니다",
          })
        );
      })
      .catch((err) => {
        dispatch(
          alertAction.open({
            message: "이미 사용중인 아이디입니다",
          })
        );
      });
  };

  const handleNicknameVal = () => {
    apis
      .nicknameValidate(nickname)
      .then((res) => {
        setNicknameVal(true);
        dispatch(
          alertAction.open({
            message: "사용가능한 닉네임입니다",
          })
        );
      })
      .catch((err) => {
        dispatch(
          alertAction.open({
            message: "이미 사용중인 닉네임입니다",
          })
        );
      });
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
      dispatch(
        alertAction.open({
          message: "빈칸을 모두 채워주세요!",
        })
      );
      return;
    } else if (
      isUsername === false ||
      isNickname === false ||
      isPassword === false ||
      isPasswordCheck === false
    ) {
      dispatch(
        alertAction.open({
          message: "올바르게 가입했는지 다시 한번 확인해주세요!",
        })
      );
      return;
    } else if (useCheck === false) {
      dispatch(
        alertAction.open({
          message: "이용약관에 동의해주세요!",
        })
      );
      return;
    } else if (idVal === false) {
      dispatch(
        alertAction.open({
          message: "아이디 중복검사를 해주세요!",
        })
      );
      return;
    } else if (nicknameVal === false) {
      dispatch(
        alertAction.open({
          message: "닉네임 중복검사를 해주세요!",
        })
      );
      return;
    } else {
      dispatch(
        userActions.signUpDB(username, password, nickname, passwordCheck)
      );
    }
  };

  return (
    <>
      <FlexGrid center is_column height="100%" padding="16px" overflow="scroll">
        <FlexGrid is_column center gap="20px">
          {/* 아이디 입력 */}
          <FlexGrid is_column gap="8px">
            <FlexGrid is_flex>
              <Text size="body1" weight="medium">
                아이디 입력
              </Text>
              <ValBtn onClick={handleIdVal}>중복검사</ValBtn>
            </FlexGrid>
            <InputContainer>
              <LoginInput
                defaultValue={username}
                onChange={onChangeUsername}
              ></LoginInput>
              {isUsername === true && <CheckImg src={check} alt="check" />}
            </InputContainer>
            {username.length > 0 && !isUsername && (
              <Validation>아이디는 5자리 이상으로 해주세요.</Validation>
            )}
          </FlexGrid>

          {/* 닉네임 입력 */}
          <FlexGrid is_column gap="8px">
            <FlexGrid is_flex>
              <Text size="body1" weight="medium">
                닉네임 입력
              </Text>
              <ValBtn onClick={handleNicknameVal}>중복검사</ValBtn>
            </FlexGrid>
            <InputContainer>
              <LoginInput
                defaultValue={nickname}
                onChange={onChangeNickname}
              ></LoginInput>
              {isNickname === true && <CheckImg src={check} alt="check" />}
            </InputContainer>
            {nickname.length > 0 && !isNickname && (
              <Validation>
                닉네임은 2자리 이상 8자리 이하로 해주세요.
              </Validation>
            )}
          </FlexGrid>

          {/* 패스워드 입력 */}
          <FlexGrid is_column gap="8px">
            <Text size="body1" weight="medium">
              패스워드 입력
            </Text>
            <InputContainer>
              <LoginInput
                type="password"
                defaultValue={password}
                onChange={onChangePassword}
              ></LoginInput>
              {isPassword === true && <CheckImg src={check} alt="check" />}
            </InputContainer>
            {password.length > 0 && !isPassword && (
              <Validation>
                8자 이상의 영문과 숫자조합을 입력해주세요.
              </Validation>
            )}
          </FlexGrid>

          {/* 패스워드 재확인 */}
          <FlexGrid is_column gap="8px">
            <Text size="body1" weight="medium">
              패스워드 재확인
            </Text>
            <InputContainer>
              <LoginInput
                type="password"
                defaultValue={passwordCheck}
                onChange={onChangePasswordCheck}
              ></LoginInput>
              {isPasswordCheck === true && <CheckImg src={check} alt="check" />}
            </InputContainer>
            {passwordCheck.length > 0 && !isPasswordCheck && (
              <Validation>비밀번호가 다릅니다.</Validation>
            )}
          </FlexGrid>

          <FlexGrid center gap="4px">
            <input
              type="checkbox"
              checked={useCheck}
              onChange={useBtnEvent}
              style={{ margin: "2px 0 0 3px" }}
            />
            <label>
              이용약관 동의 <Text weight="medium">(필수)</Text>{" "}
            </label>
            <Text
              color="orange"
              onClick={() => setCreateModalState(true)}
              cursor="pointer"
            >
              약관보기
            </Text>
          </FlexGrid>

          <Text>
            이미 계정이 있으신가요?{" "}
            <Text
              color="orange"
              weight="medium"
              cursor="pointer"
              onClick={() => {
                history.push("/login");
              }}
            >
              로그인
            </Text>
          </Text>
        </FlexGrid>
        <SignupBox onClick={clickSignUp}>가입하기</SignupBox>
      </FlexGrid>

      {createModalState && (
        <Modal
          modalState={createModalState}
          setModalState={setCreateModalState}
        >
          <MemberPolicy
            createModalState={createModalState}
            setCreateModalState={setCreateModalState}
          />
        </Modal>
      )}
    </>
  );
};

const LoginInput = styled.input`
  width: 100%;
  height: 60px;
  border: none;
  border-radius: 10px;
  background-color: #f1f1f1;
  padding: 16px;
  font-size: 16px;
`;

const Validation = styled.p`
  margin-top: 5px;
  font-size: 12px;
`;

const SignupBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.color.orange};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  font-size: 24px;
  width: 100%;
  border: none;
  color: #fff;
  position: absolute;
  bottom: 0;
  left: 0;
  height: 74px;
  cursor: pointer;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  height: 54px;
  width: 100%;
`;

const CheckImg = styled.img`
  width: 20px;
  height: 20px;
  position: absolute;
  right: 20px;
`;

const ValBtn = styled.button`
  background-color: ${(props) => props.theme.color.orange};
  padding: 2px 6px;
  border-radius: 10px;
  border: none;
  font-size: 10px;
  color: #fff;
  cursor: pointer;
`

export default Signup;
