import { keyframes } from "styled-components";

export const loading = keyframes`
    0%{
        transform: translateX(0);
    }
    50%{
        transform: translateX(1000%);
    }
    100%{
        transform: translateX(1000%);
    }
`;
