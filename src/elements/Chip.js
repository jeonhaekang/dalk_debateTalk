import React from "react";
import styled from "styled-components";

const Chip = ({ children, value, _onClick }) => {
  const [state, setState] = React.useState(false);

  const Click = () => {
    setState(!state);
    _onClick();
  };

  return (
    <ChipBox state={state} onClick={_onClick} value={value}>
      {children}
    </ChipBox>
  );
};

const ChipBox = styled.button`
  background-color: #c4c4c4;
  height: 25px;
  border-radius: 10px;
  width: calc(100% / 3 - 10px);

  border: ${(props) => (props.state ? "2px solid black" : "none")};
  box-sizing: border-box;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Chip;
