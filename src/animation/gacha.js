import { keyframes } from "styled-components";

export const shake = keyframes`
  0%{
    transform: rotate(0deg);
  }
  10%{
    transform: rotate(5deg);
  }
  20%{
    transform: rotate(-5deg);
  }
  30%{
    transform: rotate(20deg);
  }
  40%{
    transform: rotate(-20deg);
  }
  50%{
    transform: rotate(10deg);
  }
  60%{
    transform: rotate(-10deg);
  }
  70%{
    transform: rotate(0deg);
  }
  100%{
    transform: rotate(0deg);
  }
`;

export const zoomIn = keyframes`
  from {
    transform: scale(100%);
  }
  to {
    transform: scale(3000%);
  }
`;

export const zoomOut = keyframes`
  from {
    transform: scale(3000%);
  }
  to {
    transform: scale(100%);
  }
`;
