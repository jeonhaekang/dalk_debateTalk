import { keyframes } from "styled-components";

export const fadeIn = keyframes`
from {
  opacity: 0;
}
to {
  opacity: 1;
}
`;

export const fadeOut = keyframes`
from {
  opacity: 1;
}
to {
  opacity: 0;
}
`;

export const slideIn = keyframes`
  from {
    transform: translateY(30%);
  }
  to {
    transform: translateY(0%);
  }
`;
