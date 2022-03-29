import React from "react";
import styled from "styled-components";

const Container = ({ children, footer, ...props }) => {
  return (
    <ContentContainer footer={footer} style={{ ...props }}>
      {children}
    </ContentContainer>
  );
};

const ContentContainer = styled.div`
  --height: ${(props) => (props.footer ? "146px" : "70px")};
  height: calc(100% - var(--height));
  width: 100%;

  overflow-y: scroll;
  overflow-x: hidden;

  display: flex;
  flex-direction: column;
`;

export default Container;
