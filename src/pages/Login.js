import React, { useState } from "react";
import { history } from "../redux/configStore";
import Grid from "../elements/Grid";
import Input from "../elements/Input";
import Text from "../elements/Text";
import Button from "../elements/Button"

const Login = (props) => {

  // 유저ID, PW 상태관리
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const onChangeId = (e) => {
    const currentId = e.target.value;
    setId(currentId);
  }

  const onChangePassword = (e) => {
    const currentPassword = e.target.value;
    setPassword(currentPassword);
  }

  //로그인 버튼
  const handleLogin = () => {
    if (id === "" || password === "") {
      alert("아이디 또는 비밀번호를 채워주세요!")
    } else {
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
      <div>
        <Grid>로그인페이지</Grid>
        <Grid>
          <Text>ID</Text>
          <input
            type="text"
            placeholder={"아이디를 입력하세요"}
            onKeyDown={handleKeyDown}
            onChange={onChangeId}
          >
          </input>
        </Grid>
        <Grid>
          <Text>PW</Text>
          <input
            type="text"
            placeholder={"비밀번호를 입력하세요"}
            onKeyDown={handleKeyDown}
            onChange={onChangePassword}
          >
          </input>
        </Grid>
        
        <button 
        cursor="pointer"
        onClick={handleLogin}
        >로그인하기
        </button>

        <Grid>
          <Text>DALK 회원이 아니신가요?</Text>
          <div
            onClick={() => {
              history.push("/signup");
            }}
          >
            회원가입
          </div>
        </Grid>
      </div>
    </Grid>
  )
};

Login.defaultProps = {};

export default Login;
