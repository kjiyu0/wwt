import SpinFC from "antd/lib/spin";
import React, { useEffect, useState } from "react";
import { Scrollbar } from "smooth-scrollbar-react";
import styled from "styled-components";
import HeaderSearchbar from "../component/HeaderSearchbar";
import MainContent from "../component/MainContent";
import { api, days, imageArr, images, months, weatherState } from "../utils/constant";
import rain from "../utils/img/wheater/rain.png";

const MainPage = () => {
  const today = new Date();
  const [day, setDay] = useState(days[today.getDay()]);
  const [month, setMonth] = useState(months[today.getMonth()]);
  const [year, setYear] = useState(today.getFullYear());
  const [date, setDate] = useState(today.getDate());
  const [cityList, setCityList] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  const fetchWeather = async (lat, lon) => {
    const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=seoul&appid=${api.key}&units=metric`)
      .then((res) => res.json())
      .then((data) => data);
    var dataObj = { ...weatherRes };

    weatherState.map((v, i) => {
      if (dataObj.weather[0].description.indexOf(v.value) !== -1) {
        dataObj["kor_state"] = v.name;
      }
    });
    imageArr.map((v, i) => {
      let pngPop = v.name.replaceAll(".png", "");
      if (weatherRes.weather[0].description.indexOf(pngPop) !== -1) {
        dataObj["img"] = v;
      }
    });

    setData(dataObj);

    const res = await fetch("https://countriesnow.space/api/v0.1/countries/population/cities")
      .then((res) => res.json())
      .then((r) => r.data);

    res.map((v, i) => {
      v.value = v.city;
    });
    setCityList(res);

    setIsLoading(false);
  };

  console.log(data);

  useEffect(() => {
    // getGeo();
    fetchWeather();
  }, []);
  return (
    <MainLayout>
      {isLoading && (
        <div className="loading-wrap">
          <SpinFC />
          <p>
            도시 데이터를 받아오고 있습니다. <br />
            잠시만 기다려주세요.
          </p>
        </div>
      )}
      <Scrollbar
        onScroll={(e) => {
          window.localStorage.setItem("offset_y", e.offset.y);
        }}
      >
        <div id={"first"}>
          <HeaderSearchbar optionList={cityList} setCityList={setCityList} />
          <MainContent imgData={data?.img} />
        </div>
        <div id={"second"}></div>
      </Scrollbar>
    </MainLayout>
  );
};

export default MainPage;
const MainLayout = styled.div`
  height: 100vh;
  #first {
    height: 100%;
  }
  #second {
    height: 100%;
  }
  .scroll-content {
    height: 100vh;
    > div {
      height: 100%;
    }
  }
  .loading-wrap {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    backdrop-filter: blur(3px);
    z-index: 1;
    .ant-spin-spinning,
    p {
      transform: translate(-50%, -50%);
      top: 50%;
      left: 50%;
      position: absolute;
      .ant-spin-dot {
        height: 4rem;
        width: 2rem;
      }
      .ant-spin-dot-item {
        width: 40px;
        height: 40px;
      }
    }
    p {
      top: 60%;
      text-align: center;
    }
  }
`;
