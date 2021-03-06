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

export const fadeIn = keyframes`
  0%{
    opacity: 0.3;
    transform: translateY(30%);
  }
  100%{
    opacity: 1;
  }
`;
