import { keyframes } from "styled-components";

export const grow = keyframes`
    from {
        transform: scaleY(0);
    } to {
        transform: scaleY(1);
    }
`;

export const fade = keyframes`
    0% {
        opacity: 0;
    } 50% {
        opacity: 0;
    } 100% {
        opacity: 1;
    }
`;
