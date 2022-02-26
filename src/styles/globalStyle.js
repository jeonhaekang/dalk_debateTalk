import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

*{
  margin:0;
  padding:0;
  box-sizing:border-box;
  //font-family: 'Pretendard', sans-serif;

  &:focus,&:hover,&:active{
  outline:none 
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
   
  /* 스크롤바 제거 */
  &::-webkit-scrollbar {
    display: none;
  }
}

`;
