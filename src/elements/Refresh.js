import styled from "styled-components";
import { ReactComponent as Reset } from "../image/shared/reset.svg";

const Refresh = ({ onClick }) => {
  console.log("refresh");
  
  return (
    <ResetButton onClick={onClick}>
      <Reset />
    </ResetButton>
  );
};

const ResetButton = styled.button`
  z-index: 1;
  background-color: #e1e1e1;
  width: 32px;
  height: 32px;
  border-radius: 16px;
  border: none;

  cursor: pointer;

  transition: 0.1s;

  &:active {
    transform: rotate(-180deg);
  }
`;

export default Refresh;
