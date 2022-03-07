import styled from "styled-components";

const ContentContainer = ({ children }) => {
  return <Container>{children}</Container>;
};

const Container = styled.div`
  height: calc(100% - 140px);
  overflow: scroll;
`;

export default ContentContainer;
