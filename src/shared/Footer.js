import React from "react";
import styled from "styled-components";

const Footer = ({ setCreateModalState }) => {
  return (
    <FixedNav>
      <Icon>홈</Icon>
      <Icon>검색</Icon>
      <Icon onClick={() => setCreateModalState(true)}>생성</Icon>
      <Icon>결과</Icon>
      <Icon>마이</Icon>
    </FixedNav>
  );
};

const FixedNav = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60px;
  border-top: 1px solid #c4c4c4;
  background-color: #f0f0f0;
  z-index: 998;

  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const Icon = styled.button`
  height: 40px;
  width: 40px;
  border: 1px solid black;
  white-space: nowrap;

  background-color: #c4c4c4;
  border: none;
  border-radius: 10px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Footer;
