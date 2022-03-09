import styled from "styled-components";

const ContentContainer = ({ children, Xfooter, ...props }) => {
  if (Xfooter) {
    return <XContainer style={{ ...props }}>{children}</XContainer>;
  }
  return <Container style={{ ...props }}>{children}</Container>;
};

const XContainer = styled.div`
  height: calc(100% - 60px);
  overflow: scroll;
`;

const Container = styled.div`
  height: calc(100% - 120px);
  overflow: scroll;
`;

export default ContentContainer;
