import React from "react";
import styled from "styled-components";

const ContentContainer = React.forwardRef(
  ({ children, Xfooter, ...props }, ref) => {
    if (Xfooter) {
      return (
        <XContainer ref={ref} style={{ ...props }}>
          {children}
        </XContainer>
      );
    }
    return (
      <Container ref={ref} style={{ ...props }}>
        {children}
      </Container>
    );
  }
);

const XContainer = styled.div`
  height: calc(var(--vh) * 100 - 70px);
  overflow-y: scroll;
`;

const Container = styled.div`
  height: calc(var(--vh) * 100 - 146px);
  overflow-y: scroll;
`;

export default ContentContainer;
