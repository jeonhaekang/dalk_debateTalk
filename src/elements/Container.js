import styled from "styled-components";

const ContentContainer = ({ children, Xfooter, ...props }) => {
  if (Xfooter) {
    return <XContainer style={{ ...props }}>{children}</XContainer>;
  }
  return <Container style={{ ...props }}>{children}</Container>;
};

const XContainer = styled.div`
  height: calc(100% - 70px);
  overflow-x: hidden;
  overflow-y: scroll;

  background-color: white;
`;

const Container = styled.div`
  height: calc(100% - 146px);
  overflow-x: hidden;
  overflow-y: scroll;
  background-color: white;
`;

export default ContentContainer;
