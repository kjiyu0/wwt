import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { days, humidityState, months, tempState } from "../utils/constant";

const MainContent = ({ imgData, data }) => {
  const [today, setToday] = useState(new Date());
  // console.log(tempState);

  useEffect(() => {
    // moment가 있지만.. 최대한 안써보려고 interval로 함
    const id = setInterval(() => {
      setToday(new Date());
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <StyledMainContent>
      <div id="left-box">
        <img src={imgData?.value} alt="날씨 아이콘" />
      </div>
      <div id="right-box">
        <h1>{data?.name}</h1> {/* 도시 이름 */}
        <h2>
          {today.getFullYear()}년 {today.getMonth() + 1}월 {today.getDate()}일 {today.getHours()}:{today.getMinutes()}:{today.getSeconds()}
        </h2>
        <div clasName="wrap">
          <h1>{data?.main.temp}°C</h1>
          <h2>체감온도:{data?.main.feels_like}</h2>
          <h2>최고:{data?.main.temp_max}</h2>
          <h2>최저:{data?.main.temp_min}</h2>
        </div>
        <div className="wrap">
          <h2>
            "{data?.kor_temp_state}. {data?.kor_humidity_state}. "
          </h2>
        </div>
      </div>
    </StyledMainContent>
  );
};

export default MainContent;
const StyledMainContent = styled.div`
  display: flex;
  height: 100%;
  > div {
    border: solid 2px red;
    width: 50%;
  }
  #left-box {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 100%;
    img {
      transform: translate(-2.5rem, -7.5rem) scale(1.5);
    }
  }
`;
