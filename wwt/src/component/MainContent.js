import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { days, humidityState, months, tempState } from "../utils/constant";
import theme from "../utils/theme";

const MainContent = ({ imgData, data }) => {
  const [today, setToday] = useState(new Date());

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
        <div className="right-box-content">
          <h1>{data?.name}</h1> {/* 도시 이름 */}
          <h2 id="now">
            {today.getFullYear()}년 {today.getMonth() + 1}월 {today.getDate()}일 {today.getHours()}:{today.getMinutes()}:{today.getSeconds()}
          </h2>
          <div>
            <div>
              <h1 id="temp">{data?.main.temp}°C</h1>
              <h2 id="feel-likes">체감온도:{data?.main.feels_like}</h2>
            </div>
            <div>
              <h2 id="max-temp">최고:{data?.main.temp_max}</h2>
              <h2 id="min-temp">최저:{data?.main.temp_min}</h2>
            </div>
          </div>
          <h2 id="weather-comment">
            "{data?.kor_temp_state}. {data?.kor_humidity_state}."
          </h2>
        </div>
        <div className="right-box-content">
          <h2>지금 날씨에는...</h2>
          <div id="dress-box">
            {data?.dress.map((v) => (
              <p>{v.name}</p>
            ))}
          </div>
        </div>
      </div>
    </StyledMainContent>
  );
};

export default MainContent;
const StyledMainContent = styled.div`
  @keyframes moving {
    0% {
      transform: rotate(-5deg) translate(0, 1rem);
    }
    50% {
      transform: rotate(10deg) translate(0, 0rem);
    }
    100% {
      transform: rotate(-5deg) translate(0, 1rem);
    }
  }
  display: flex;
  height: 100%;
  > div {
  }
  #left-box {
    width: 45%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 100%;
    img {
      animation: moving 3s infinite;
      width: 60rem;
    }
  }
  #right-box {
    width: 55%;
    display: flex;
    align-items: center;
    padding-left: 2.5rem;
    #temp {
      font-weight: 700;
    }
    #now {
      color: ${theme.colors.gray_4};
      transform: translate(0, -0.75rem);
    }
    > div {
      h1 {
        color: white;
        width: 100rem;
        /* border: solid 2px red; */
        word-wrap: normal;
        font-size: 7rem;
      }
      h2 {
        font-size: 2rem;
        color: white;
      }
      > div {
        > div {
          margin: 1rem 0;
          #max-temp,
          #min-temp {
            line-height: 2rem;
          }
        }
      }
    }
    .right-box-content {
      /* background-color: rgba(255, 255, 255, 0.2); */
      width: 30rem;
      padding: 2rem;
      padding-bottom: 7.5rem;
      /* height: 45rem; */
    }

    .right-box-content:nth-child(2) {
      transform: translate(0rem, 5rem);
      width: 30rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-left: 5rem;
      height: 48rem;

      h2 {
        font-size: 3rem;
      }
      #dress-box {
        margin-top: 2rem;
        p {
          font-size: 1.8rem;
          color: white;
        }
      }
    }
  }
`;
