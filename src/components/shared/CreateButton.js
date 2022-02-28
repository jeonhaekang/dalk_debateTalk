import React from "react";
import styled from "styled-components";

const CreateButton = (props) => {
  const { _onClick } = props;
  return <Button onClick={_onClick}>+</Button>;
};

const Button = styled.button`
  --size: 60px;
  width: var(--size);
  height: var(--size);
  background-color: gray;

  border-radius: var(--size);
  border: 0;

  font-size: 40px;

  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  bottom: 10px;
  right: 10px;
`;

export default CreateButton;
