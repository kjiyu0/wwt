import SpinFC from "antd/lib/spin";
import React, { useEffect, useState } from "react";
import { Scrollbar } from "smooth-scrollbar-react";
import styled from "styled-components";
import HeaderSearchbar from "../component/HeaderSearchbar";
import MainContent from "../component/MainContent";
import { api, clothes, days, humidityState, imageArr, images, months, tempState, weatherState } from "../utils/constant";
import rain from "../utils/img/wheater/rain.png";
import nightSky from "../utils/img/wheater/sky/sky_night.jpg";
import morningSky from "../utils/img/wheater/sky/sky_morning.jpg";

const MainPage = () => {
  const today = new Date();
  const [isNight, setIsNight] = useState(today.getHours() > 20 || today.getHours() < 5 ? true : false);
  console.log(isNight);
  const [cityList, setCityList] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [city, setCity] = useState("seoul");

  const fetchWeather = async (city) => {
    const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api.key}&units=metric`)
      .then((res) => res.json())
      .then((data) => data);
    var dataObj = { ...weatherRes };

    let toString = String(weatherRes.main.feels_like);

    tempState.map((v, i) => {
      if (v.value.indexOf(Number(weatherRes.main.feels_like.toFixed())) !== -1) {
        dataObj["kor_temp_state"] = v.name;
        dataObj["season"] = v.season;
      }
    });

    humidityState.map((v, i) => {
      if (v.value.indexOf(weatherRes.main.humidity) !== -1) {
        dataObj["kor_humidity_state"] = v.name;
      }
    });

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

    dataObj["dress"] = [];
    for (const [key, value] of Object.entries(clothes[0])) {
      value.map((v, i) => {
        const random = Math.floor(Math.random() * v.value.length); //랜덤으로 표출
        if (dataObj.season === v.value[random]) {
          dataObj["dress"].push({ key: key, name: v.name }); //계절에 맞는 의상들을 담는다. object in Array
        }
      });
    }

    const removeDuplic = (data, key) => {
      return [...new Map(data.map((v) => [key(v), v])).values()]; // 상,하의,신발 등 다시 묶어줌
    };

    dataObj["dress"] = removeDuplic(dataObj["dress"], (data) => data.key);
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
    fetchWeather(city);
  }, []);
  return (
    <>
      <HeaderSearchbar fetchWeather={fetchWeather} optionList={cityList} setCityList={setCityList} setCity={setCity} city={city} />
      <MainLayout isNight={isNight}>
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
            <MainContent imgData={data?.img} data={data} />
          </div>
          <div id={"second"}></div>
        </Scrollbar>
      </MainLayout>
    </>
  );
};

export default MainPage;
const MainLayout = styled.div`
  height: 100vh;
  #first {
    height: 100%;
    background-image: ${(props) => `url(${props.isNight ? nightSky : morningSky})`};
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
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
