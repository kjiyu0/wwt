import React, { useEffect, useState } from 'react';
import { api, days, months } from '../utils/constant';

const MainPage = () => {
    const apiURL = `https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=${api.key}`
    const today = new Date();
    const [day, setDay] = useState(days[today.getDay()])
    const [month, setMonth] = useState(months[today.getMonth()])
    const [year, setYear] = useState(today.getFullYear());
    const [date, setDate] = useState(today.getDate());

    const fetchWeather = (lat,lon) => {
        console.log(lat,lon)
        //todo : 서울 lat,lon 알아보기
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=${api.key} 
        `)
            .then(res=> res.json()).then(data => console.log(data))
    }  

    const handleGeoSucc = pos => {
        console.log(pos);
        const lat = pos.coords.latitude; //경도
        const lon = pos.coords.longtitude; //위도
    }


    const handleGeoErr = err => {
        fetchWeather(126.97796919,37.566535) //서울
      }
    const getGeo = () => {
        navigator.geolocation.getCurrentPosition(handleGeoSucc, handleGeoErr);
    }
    
    useEffect(()=>{
        getGeo();
        // fetchWeather();
    },[])
    return (
        <div>
            ffgggggggg
        </div>
    );
};

export default MainPage;