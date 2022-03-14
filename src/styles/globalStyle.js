import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

*{
  margin:0;
  padding:0;
  box-sizing:border-box;
  font-family: 'Noto Sans KR', sans-serif;
  color: #222222;

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
  height: 100vh;
  position: relative;
  font-size: 14px;
  font-weight: 300;
  
}

input[type=radio]{
  vertical-align: -1px;
}

`;
