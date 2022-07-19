import React from "react";
import styled from "styled-components";

const MainContent = ({ imgData }) => {
  return (
    <StyledMainContent>
      <div id="left-box">
        <img src={imgData?.value} />
      </div>
      <div id="right-box"></div>
    </StyledMainContent>
  );
};

export default MainContent;
const StyledMainContent = styled.div`
  display: flex;
  height: 100%;
  #left-box {
    width: 50%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 100%;
    img {
      transform: translate(-2.5rem, -7.5rem) scale(1.5);
    }
  }
`;
