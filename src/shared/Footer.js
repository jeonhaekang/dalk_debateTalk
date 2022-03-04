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
  position: sticky;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  padding: 25px 30px;
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