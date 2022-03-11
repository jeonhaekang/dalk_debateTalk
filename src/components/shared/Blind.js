import React from "react";
import styled from "styled-components";

const Blind = (props) => {
  const { children } = props;

  return <BlindCard>{children}</BlindCard>;
};

const BlindCard = styled.div`
  border-radius: 5px;
  
  background: rgba(#f3f4f5);
  backdrop-filter: blur(10px);

  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;

  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  z-index: 10;
`;

export default Blind;
