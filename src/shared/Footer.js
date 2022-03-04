import React from "react";
import styled from "styled-components";

const Footer = (props) => {
  return (
    <FixedNav>
      <Icon>
        <div>홈</div>
      </Icon>
      <Icon>
        <div>홈</div>
      </Icon>
      <Icon>
        <div>홈</div>
      </Icon>
      <Icon>
        <div>홈</div>
      </Icon>
      <Icon>
        <div>홈</div>
      </Icon>
    </FixedNav>
  );
};

const FixedNav = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  max-width: 420px;
  height: 60px;
  padding: 25px 28px;
  border-top: 2px solid #edeeef;
  background: #fff;
  display: flex;
  align-items: center;
  gap: 65px;
  z-index: 9;
`;

const Icon = styled.div`
  position: relative;
  width: calc(100% / 5);
`;

export default Footer;
