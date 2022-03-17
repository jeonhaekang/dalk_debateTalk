import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

*{
  margin:0;
  padding:0;
  box-sizing:border-box;
  /* font-family: 'Roboto', sans-serif; */
  /* font-family: 'Noto Sans', sans-serif; */
  font-family: 'Noto Sans KR', sans-serif;
  color: #333333;

  &:focus,&:hover,&:active{
  outline:none 
  }

  /* 스크롤바 제거 */
  &::-webkit-scrollbar {
    display: none;
  }
}

ul {
  list-style: none;
}
a {
  text-decoration: none;
}

body{
  position: relative;
  font-size: 14px;
  overflow: hidden;
  font-weight: 300;
  letter-spacing: -0.25px;
}

input[type=radio]{
  vertical-align: -1px;
}

input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

`;
