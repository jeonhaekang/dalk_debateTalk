import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { history } from "../redux/configStore";

import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { actionCreators as alertAction } from "../redux/modules/alert";

import { Text, Input, FlexGrid } from "../elements/Index.js";

import Modal from "../components/shared/Modal";
import MemberPolicy from "../components/shared/MemberPolicy";
import apis from "../shared/apis";

import _ from "lodash";

const Signup = () => {
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
  const [usernameVal, setUsernameVal] = useState(null);
  const [nicknameVal, setNicknameVal] = useState(null);
  const [passwordVal, setPasswordVal] = useState(null);
  const [passCheckVal, setPassCheckVal] = useState(null);

  // 아이디 유효성 검사 및 중복 검사 -------------------------------------------------------------
  const usernameCheckDB = useCallback(
    _.debounce((username) => {
      const result = /^[A-za-z0-9]{5,15}/g.test(username);
      if (result) {
        apis
          .idValidate(username)
          .then(() => setUsernameVal(1))
          .catch(() => setUsernameVal(-1));
      } else {
        setUsernameVal(0);
      }
    }, 1000),
    []
  );

  useEffect(() => {
    if (username === "") {
      return;
    }
    setUsernameVal(null);
    usernameCheckDB(username);
  }, [username]);

  // 닉네임 유효성 검사 및 중복 검사 -------------------------------------------------------------
  const nicknameCheckDB = useCallback(
    _.debounce((nickname) => {
      const result = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]{2,8}$/.test(nickname);
      if (result) {
        apis
          .nicknameValidate(nickname)
          .then(() => setNicknameVal(1))
          .catch(() => setNicknameVal(-1));
      } else {
        setNicknameVal(0);
      }
    }, 500),
    []
  );

  useEffect(() => {
    if (nickname === "") {
      return;
    }
    setNicknameVal(null);
    nicknameCheckDB(nickname);
  }, [nickname]);

  // 비밀번호 유효성 검사 ---------------------------------------------------------------------
  useEffect(() => {
    if (password === "") {
      return;
    }
    const result = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
    if (result) {
      setPasswordVal(1);
    } else {
      setPasswordVal(0);
    }
  }, [password]);

  // 비밀번호 재입력 검사 ---------------------------------------------------------------------
  useEffect(() => {
    if (passwordCheck === "") {
      return;
    }
    if (password === passwordCheck) {
      setPassCheckVal(1);
    } else {
      setPassCheckVal(0);
    }
  }, [password, passwordCheck]);

  // 올바르게 되었으면 체크표시
  const useBtnEvent = () => {
    if (useCheck === false) {
      setUseCheck(true);
    } else {
      setUseCheck(false);
    }
  };

  //회원가입 하면 자동로그인하게 만들기
  //signDB redux에 자동으로 로그인되게 함
  const clickSignUp = () => {
    if (
      !usernameVal ||
      !nicknameVal ||
      !passwordVal ||
      !passCheckVal ||
      !useCheck
    ) {
      dispatch(alertAction.open({ message: "입력 정보를 확인해 주세요." }));
      return;
    }
    dispatch(userActions.signUpDB(username, password, nickname, passwordCheck));
  };

  return (
    <>
      <FlexGrid center is_column height="100%" padding="16px" overflow="scroll">
        <FlexGrid is_column center gap="20px">
          {/* 아이디 입력 */}
          <FlexGrid is_column gap="0">
            <Input
              type="text"
              message="아이디"
              focusMessage="아이디는 5자리 이상으로 해주세요"
              formData={username}
              setFormData={setUsername}
              state={usernameVal}
              autoComplete="off"
            />
            {usernameVal === -1 && (
              <Text color="alert">중복된 아이디 입니다.</Text>
            )}
            {usernameVal === 0 && (
              <Text color="alert">사용할 수 없는 아이디 입니다.</Text>
            )}
          </FlexGrid>
          <FlexGrid is_column gap="0">
            <Input
              type="text"
              message="닉네임"
              focusMessage="닉네임은 2자리 이상 8자리 이하로 해주세요"
              formData={nickname}
              setFormData={setNickname}
              state={nicknameVal}
              autoComplete="off"
            />
            {nicknameVal === -1 && (
              <Text color="alert">중복된 닉네임 입니다.</Text>
            )}
            {nicknameVal === 0 && (
              <Text color="alert">사용할 수 없는 닉네임 입니다.</Text>
            )}
          </FlexGrid>
          <FlexGrid is_column gap="0">
            <Input
              type="password"
              message="패스워드 입력"
              focusMessage="8자 이상의 영문, 숫자 조합을 입력해주세요"
              formData={password}
              setFormData={setPassword}
              state={passwordVal}
              autoComplete="off"
            />
            {passwordVal === 0 && (
              <Text color="alert">사용할 수 없는 비밀번호 입니다.</Text>
            )}
          </FlexGrid>
          <FlexGrid is_column gap="0">
            <Input
              type="password"
              message="패스워드 재입력"
              focusMessage="패스워드 재입력"
              formData={passwordCheck}
              setFormData={setPasswordCheck}
              state={passCheckVal}
              autoComplete="off"
            />
            {passCheckVal === 0 && (
              <Text color="alert">패스워드가 다릅니다.</Text>
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
              이용약관 동의 <Text weight="medium">(필수)</Text>
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
            이미 계정이 있으신가요?
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
        {usernameVal && nicknameVal && passwordVal && passCheckVal ? (
          <SignupBox ok={true} onClick={clickSignUp}>
            가입하기
          </SignupBox>
        ) : (
          <SignupBox ok={false} onClick={clickSignUp}>
            가입하기
          </SignupBox>
        )}
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

const SignupBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.ok ? props.theme.color.orange : "#CBCBCB"};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  font-size: 24px;

  pointer-events: ${(props) => (props.ok ? null : "none")};

  border: none;
  color: #fff;
  position: fixed;
  width: 100%;
  max-width: 430px;
  bottom: 0;
  height: 74px;
  cursor: pointer;
`;

export default Signup;
