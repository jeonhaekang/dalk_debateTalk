import React from "react";
import styled from "styled-components";

const ContentContainer = React.forwardRef(
  ({ children, Xfooter, ...props }, ref) => {
    return (
      <Container ref={ref} style={{ ...props }}>
        {children}
      </Container>
    );
  }
);

const Container = styled.div`
  margin-bottom: 76px;
  background-color: white;
`;

export default ContentContainer;
