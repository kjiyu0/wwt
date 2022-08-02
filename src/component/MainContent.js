import React, { useEffect, useState } from 'react';
import { Scrollbar } from 'smooth-scrollbar-react';
import styled from 'styled-components';
import { days, humidityState, months, tempState } from '../utils/constant';
import theme from '../utils/theme';

const MainContent = ({ imgData, data, hourlyData }) => {
    const [today, setToday] = useState(new Date());
    let hourlyListData = (data) => new Date(data?.dt_txt).getHours();
    let hourlyListDataDay = (
        data, // n월 n일
    ) =>
        `${new Date(data?.dt_txt).getMonth() + 1}월 ${new Date(
            data?.dt_txt,
        ).getDate()}일`;
    console.log(hourlyData);

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
                    <h2 id="country">{data?.country}</h2>
                    <h1>{data?.name}</h1> {/* 도시 이름 */}
                    <h2 id="now">
                        {today.getFullYear()}년 {today.getMonth() + 1}월{' '}
                        {today.getDate()}일 {today.getHours()}:
                        {today.getMinutes()}:{today.getSeconds()}
                    </h2>
                    <div>
                        <div>
                            <h1 id="temp">{data?.main.temp}°C</h1>
                            <h2 id="feel-likes">
                                체감온도: {data?.main.feels_like}°C
                            </h2>
                        </div>
                        <div>
                            <h2 id="max-temp">최고: {data?.main.temp_max}°C</h2>
                            <h2 id="min-temp">최저: {data?.main.temp_min}°C</h2>
                        </div>
                    </div>
                    <h2 id="weather-comment">
                        "{data?.kor_temp_state}. {data?.kor_humidity_state}."
                    </h2>
                    <h2>{data?.kor_state}</h2>
                </div>
                <div className="right-box-content">
                    <h2>지금 날씨에는...</h2>
                    <div id="dress-box">
                        {data?.dress.map((v) => (
                            <p>{v.name}</p>
                        ))}
                    </div>
                </div>
                <div id="scroll-wrap">
                    <Scrollbar alwaysShowTracks={true}>
                        {hourlyData &&
                            hourlyData.map((v, i) => (
                                <div id="hourly-data-container">
                                    <h6>
                                        {hourlyListDataDay(v)}{' '}
                                        {hourlyListData(v)}:00
                                    </h6>
                                    <h5>{v.kor_state}</h5>
                                    <img src={v.img.value} alt="날씨 아이콘" />
                                </div>
                            ))}
                    </Scrollbar>
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
        position: relative;
        #temp {
            font-weight: 700;
        }
        #now {
            color: ${theme.colors.gray_4};
            transform: translate(0, -0.75rem);
        }
        #country {
            width: 100rem;
            transform: translate(0.5rem, 2.25rem);
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
            transform: translate(0rem, -2.5rem);
            width: 30rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 0;
            height: 2rem;

            h2 {
                font-size: 3rem;
                height: 4rem;
            }
            #dress-box {
                transform: translate(0, 2rem);
                height: 0;
                p {
                    font-size: 1.8rem;
                    color: white;
                }
            }
        }
    }
    #hourly-data-container {
        height: 10rem;
        width: 10rem;
        margin: 0.5rem 0;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        background: rgba(255, 255, 255, 0.4);
        /* width: 10rem; */
        /* display: flex; */
        /* position: absolute; */

        h6,
        h5 {
            color: white;
        }
        h5 {
            font-size: 1.4rem;
        }
        h6 {
            font-size: 1.2rem;
        }
    }
    #scroll-wrap {
        transform: translate(-5rem, 0);
        width: 12rem;
        display: flex;
    }
    .scroll-content {
        height: 55vh !important;
        width: 10rem;
        position: relative;
        padding-right: 2rem;
        /* display: flex; */
        img {
            width: 5rem;
        }
    }
    .scrollbar-track-y {
        margin-left: 1rem;
        background: rgba(255, 255, 255, 0.23);
        border-radius: 10rem;
    }
    .scrollbar-thumb {
        background: rgba(255, 255, 255, 0.48) !important;
        /* height: 1rem !important; */
    }

    /* -----------------------반응형----------------- */
    @media all and (max-width: 1200px) {
        display: block;
        #left-box,
        #right-box {
            height: 50%;
            justify-content: center;
            width: 100%;
        }

        #left-box {
            transform: translate(0, 20rem);
            img {
                width: 40rem;
                /* transform: translate(0, 5rem); */
            }
        }

        #right-box {
            transform: translate(0, -20rem);
        }
        #scroll-wrap {
            transform: translate(-5rem, -50%);
            position: absolute;
            top: 20rem;
            left: 85%;
        }
    }

    @media all and (max-width: 600px) {
        #right-box {
            .right-box-content {
                position: absolute;
                left: 0;
                top: -10rem;
            }
            .right-box-content:nth-child(2) {
                /* transform: translate(0, 5rem); */
                width: 100vw;
                position: absolute;
                top: 45rem;
                left: 1.5rem;
            }
        }
        #scroll-wrap {
            transform: translate(-5rem, -50%);
            position: absolute;
            top: 35rem;
            left: 85%;
        }

        #left-box {
            transform: translate(10.5rem, 2.5rem);
            img {
                width: 20rem;
                /* transform: translate(0, 5rem); */
            }
        }
    }
`;
