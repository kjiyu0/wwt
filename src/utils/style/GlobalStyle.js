import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap');
  ${normalize};
  html{ font-size: 62.5%;  font-family: "Noto Sans KR", sans-serif; };
  #root{
    position: relative;
  }

html, body, div, span, applet, object,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video, button {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 62.5%;
    /* font-family: "AppleSDNeo"; */
    font-weight: 400;
    -webkit-touch-callout:none; 
    font-family: "Noto Sans KR", sans-serif; 
  }
  *,
  *::after,
  *::before {
    box-sizing: border-box;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
  }


  //outline설정해서 클릭시 뜨는 파란색 제거
  input:focus{
	outline:none;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
}

  a{
    text-decoration: none; outline: none;
  
  }
  select{
    /* 디폴트 스타일 제거 */
    -moz-appearance: none; /* chrome */
    -webkit-appearance: none; /* firefox */
    appearance: none;
    background-color: #fff ;
    padding: 8px 10px;
    width: 185px;
    border-radius: 3px;
    transition: 0.2s;
  }
  select:hover{
    background-color: #fff ;
  }
  select:active{
    background-color: #fff ;
  }
  select::-ms-expand{
   display:none;/*for IE10,11*/
  }
  button {
    cursor: pointer;
    background: inherit;
    border: none;
    padding: 0;
    margin: 0;
    transition: 0.2s;
    /* font-family: "AppleSDNeo"; */
    font-weight: 400;
    font-size: 1.4rem;
  }
  label{
        color: inherit;
    font-size: inherit;
    font-family: inherit;
    line-height: inherit;
  }
  input, textarea{
    border: none;
    padding: 8px 10px;
    border-radius: 3px;
    width: 100%;
    &::placeholder{
    }
  }
  input:focus, textarea:focus, select:focus{
        outline: none;
    }
  ul{
    list-style: none;
  }
  img{
    width: inherit;
  }
 iframe{
   position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    border: none;
    z-index: -1;
 }
 
 .scrollbar-thumb{
  background: pink  !important;
 }

`;
export default GlobalStyle;
