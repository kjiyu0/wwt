import SpinFC from 'antd/lib/spin';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Scrollbar } from 'smooth-scrollbar-react';
import styled from 'styled-components';
import HeaderSearchbar from '../component/HeaderSearchbar';
import MainContent from '../component/MainContent';
import {
    api,
    clothes,
    days,
    humidityState,
    imageArr,
    images,
    months,
    tempState,
    weatherState,
} from '../utils/constant';
import rain from '../utils/img/wheater/rain.png';
import nightSky from '../utils/img/wheater/sky/sky_night.jpg';
import morningSky from '../utils/img/wheater/sky/sky_morning.jpg';
import sunrise from '../utils/img/wheater/sky/sunrise.jpg';
import sunset from '../utils/img/wheater/sky/sunset.jpg';
import Moment from 'react-moment';
import SubContent from '../component/SubContent';

const MainPage = () => {
    const today = new Date();
    const momentSetting = moment().format('YYYY-MM-DD');
    const [isNight, setIsNight] = useState(
        today.getHours() > 20 || today.getHours() < 5 ? true : false,
    );
    const [cityList, setCityList] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState();
    const [hourlyData, setHourlyData] = useState();
    const [city, setCity] = useState('seoul');
    const [utc, setUtc] = useState();
    const [scroll, setScroll] = useState();

    console.log(window.localStorage);

    const [region, setRegion] = useState('Asia');

    function getWorldTime(tzOffset) {
        // 24시간제
        var now = new Date();
        var tz =
            now.getTime() +
            now.getTimezoneOffset() * 60000 +
            tzOffset * 3600000;
        now.setTime(tz);

        var s =
            leadingZeros(now.getFullYear(), 4) +
            '-' +
            leadingZeros(now.getMonth() + 1, 2) +
            '-' +
            leadingZeros(now.getDate(), 2) +
            ' ' +
            leadingZeros(now.getHours(), 2) +
            ':' +
            leadingZeros(now.getMinutes(), 2) +
            ':' +
            leadingZeros(now.getSeconds(), 2);

        return s;
    }
    function leadingZeros(n, digits) {
        var zero = '';
        n = n.toString();

        if (n.length < digits) {
            for (let i = 0; i < digits - n.length; i++) zero += '0';
        }
        return zero + n;
    }

    const fetchWeather = async (city) => {
        const weatherRes = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api.key}&units=metric`,
        )
            .then((res) => res.json())
            .then((data) => data);
        var dataObj = { ...weatherRes };

        const regionDetail = await fetch(
            // `http://worldtimeapi.org/api/timezone/Europe`,
            // `http://worldtimeapi.org/api/timezone/America/Argentina/Salta`,
            // `http://dataservice.accuweather.com/locations/v1/adminareas/KR`,
            // `https://restcountries.com/v3.1/name/korea`,
            `https://restcountries.com/v2/alpha/${dataObj.sys.country}`,
            // `https://restcountries.com/v2/capital/batna`,
        ).then((res) => res.json());
        dataObj['country'] = regionDetail.name;

        tempState.map((v, i) => {
            if (
                v.value.indexOf(
                    Number(weatherRes.main.feels_like.toFixed()),
                ) !== -1
            ) {
                dataObj['kor_temp_state'] = v.name;
                dataObj['season'] = v.season;
            }
        }); //기온별 상태 데이터 추가

        humidityState.map((v, i) => {
            if (v.value.indexOf(weatherRes.main.humidity) !== -1) {
                dataObj['kor_humidity_state'] = v.name;
            }
        }); //습도별 상태 데이터 추가

        weatherState.map((v, i) => {
            if (dataObj.weather[0].description.indexOf(v.value) !== -1) {
                dataObj['kor_state'] = v.name;
            }
        }); //날씨 상태 데이터 추가

        imageArr.map((v, i) => {
            let pngPop = v.name.replaceAll('.png', '');
            if (weatherRes.weather[0].description.indexOf(pngPop) !== -1) {
                dataObj['img'] = v;
            }
        }); //img추가

        dataObj['dress'] = [];
        for (const [key, value] of Object.entries(clothes[0])) {
            value.map((v, i) => {
                const random = Math.floor(Math.random() * v.value.length); //랜덤으로 표출
                if (dataObj.season === v.value[random]) {
                    dataObj['dress'].push({ key: key, name: v.name }); //계절에 맞는 의상들을 담는다. object in Array
                }
            });
        } //의상 추가

        const removeDuplic = (data, key) => {
            return [...new Map(data.map((v) => [key(v), v])).values()]; // 상,하의,신발 등 다시 묶어줌
        }; //중복제거

        dataObj['dress'] = removeDuplic(dataObj['dress'], (data) => data.key);
        setData(dataObj);

        const houlyRes = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${api.key}`,
        ).then((res) => res.json());

        //filter. api호출 때 앞뒤로 -10hour 씩 나오는데, 현재 날씨부터 해주고 싶음. 따로 배열 해서 넣어주러임
        let hourlyListData = (data) => new Date(data.dt_txt);
        const hourlyListArr = new Array();
        houlyRes.list.map((v, i) => {
            weatherState.map((value, index) => {
                if (v.weather[0].description.indexOf(value.value) !== -1) {
                    v['kor_state'] = value.name;
                }
            });
            imageArr.map((val, ind) => {
                let pngPop = val.name.replaceAll('.png', '');
                if (v.weather[0].description.indexOf(pngPop) !== -1) {
                    v['img'] = val;
                }
            });
            if (moment(today) < moment(hourlyListData(v))) {
                hourlyListArr.push(v);
            }
        });

        setHourlyData(hourlyListArr);

        //----------------------------//
        //city list API
        const res = await fetch(
            'https://countriesnow.space/api/v0.1/countries/population/cities',
        )
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
    }, [city]);

    return (
        <>
            <HeaderSearchbar
                fetchWeather={fetchWeather}
                optionList={cityList}
                setCityList={setCityList}
                setCity={setCity}
                city={city}
            />

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

                <div id={'first'}>
                    <MainContent
                        imgData={data?.img}
                        data={data}
                        hourlyData={hourlyData}
                        utc={utc}
                    />
                </div>

                <div id={'second'}>
                    <SubContent data={data} isNight={isNight} />
                </div>
            </MainLayout>
        </>
    );
};

export default MainPage;
const MainLayout = styled.div`
    height: 100vh;
    border: solid 2px blue;
    overflow: hidden !important;
    #first {
        height: 100%;
        background-image: ${(props) =>
            `url(${props.isNight ? nightSky : morningSky})`};
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
    }
    #second {
        height: 100vh;
        background-image: ${(props) =>
            `url(${props.isNight ? sunrise : sunset})`};
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        position: relative;
        top: 100vh;
        left: 0;
        width: 100%;
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
