import styled from "styled-components";

const ContentContainer = ({ children, ...props }) => {
  return <Container style={{ ...props }}>{children}</Container>;
};

const Container = styled.div`
  height: calc(100% - 120px);
  overflow: scroll;
`;

export default ContentContainer;
