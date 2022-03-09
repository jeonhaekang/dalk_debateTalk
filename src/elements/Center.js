import styled from "styled-components";

const Center = ({ children, ...props }) => {
  return <CenterBox style={{ ...props }}>{children}</CenterBox>;
};

const CenterBox = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export default Center;
