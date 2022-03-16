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

  width: 45px;
  height: 24px;

  border-radius: 20px;

  font-size: ${(props) => props.theme.fontSizes.body2};

  display: flex;
  align-items: center;
  justify-content: center;

  flex: 0 0 auto;
`;

export default Chip;
