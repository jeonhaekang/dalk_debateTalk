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
  background-color: #e7e7e7;

  border-radius: 20px;
  padding: 3px 10px;

  font-size: 14px;

  box-sizing: border-box;

  border: none;

  display: flex;
  align-items: center;
  justify-content: center;

  flex: 0 0 auto;
`;

export default Chip;
