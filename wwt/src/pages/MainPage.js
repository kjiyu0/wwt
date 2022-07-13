import React, { useEffect, useState } from 'react';
import { api, days, months } from '../utils/constant';

const MainPage = () => {
    const today = new Date();
    const [day, setDay] = useState(days[today.getDay()])
    const [month, setMonth] = useState(months[today.getMonth()])
    const [year, setYear] = useState(today.getFullYear());
    const [date, setDate] = useState(today.getDate());

    const fetchWeather = (lat,lon) => {
        console.log(lat,lon)
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=seoul&appid=${api.key}&units=metric 
        `)
            .then(res=> res.json()).then(data => console.log(data))
    }  






    
    useEffect(()=>{
        // getGeo();
        fetchWeather();
    },[])
    return (
        <div style={{width:'100px', height: '100px'}}>
            ffgggggggg
        </div>
    );
};

export default MainPage;