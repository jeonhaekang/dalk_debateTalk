import React, { useRef, useState } from "react";
import styled from "styled-components";
import { ReactComponent as Check } from "../image/login/check.svg";

const Input = (props) => {
  const { message, focusMessage, formData, setFormData, state, type } = props;
  const [focus, setFocus] = useState(false); // Input focus여부
  const [info, setInfo] = useState(message); // 알림 메세지

  // focus, blur상황에 실행 ---------------------------------------------------------------
  const check = (e) => {
    if (e.type === "focus") {
      setFocus(true);
      setInfo(focusMessage);
    } else if (e.type === "blur" && formData === "") {
      setFocus(false);
      setInfo(message);
    }
  };

  // Input창 포커스를 위한 코드 ---------------------------------------------------------------
  const inputRef = useRef();

  const boxFocus = () => {
    inputRef.current.focus();
  };

  // -----------------------------------------------------------------------------------
  return (
    <Container onClick={boxFocus}>
      <Label focus={focus}>{info}</Label>
      <InputContainer>
        <InputBox
          type={type}
          onChange={(e) => setFormData(e.target.value)}
          onFocus={check}
          onBlur={check}
          ref={inputRef}
        />
      </InputContainer>

      {state === 1 && <Check />}
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;
  padding: 12px;
  border-radius: 10px;
  background-color: #f1f1f1;
  position: relative;
  cursor: text;
`;

const InputContainer = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: flex-end;
`;

const InputBox = styled.input`
  font-size: 16px;
  width: 100%;

  box-sizing: border-box;
  border: none;
  background-color: #f1f1f1;
`;

const Label = styled.label`
  position: absolute;
  top: 50%;
  font-size: 16px;
  transform-origin: left;
  transform: ${(props) =>
    props.focus ? "translateY(-130%) scale(0.7)" : "translateY(-50%)"};

  transition: 0.2s;
  cursor: text;
`;
export default Input;
