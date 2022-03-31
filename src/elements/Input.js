import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ReactComponent as Check } from "../image/login/check.svg";
import FlexGrid from "./FlexGrid";

const Input = (props) => {
  const { message, focusMessage, setFormData, state, type } = props;
  const [focus, setFocus] = useState(false);
  const [info, setInfo] = useState(message);
  const [data, setData] = useState("");

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const inputRef = useRef();

  const check = (e) => {
    if (e.type === "focus") {
      setFocus(true);
      setInfo(focusMessage);
    } else if (e.type === "blur" && data === "") {
      setFocus(false);
      setInfo(message);
    }
  };

  const onChagneInput = (e) => {
    setData(e.target.value);
  };

  const boxFocus = () => {
    inputRef.current.focus();
  };

  return (
    <Container onClick={boxFocus}>
      <Label focus={focus}>{info}</Label>
      <InputContainer>
        <InputBox
          type={type}
          onChange={onChagneInput}
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
  background-color: #eee;
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
  background-color: #eee;
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
