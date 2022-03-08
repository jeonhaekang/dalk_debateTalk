import React from "react";
import styled from "styled-components";

const Chip = ({ children, value, _onClick }) => {
  return (
    <ChipBox onClick={_onClick} value={value}>
      {children}
    </ChipBox>
  );
};

const ChipBox = styled.div`
  background-color: #c4c4c4;
  height: 20px;
  border-radius: 10px;
  width: 50px;

  font-size: 14px;

  box-sizing: border-box;

  border: none;

  display: flex;
  align-items: center;
  justify-content: center;

  flex: 0 0 auto;
`;

export default Chip;
