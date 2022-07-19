export const api = {
  key: "9078b77c7bd5e78e600c97399ad4aa4a",
  base: "https://api.openweathermap.org/data/3.0/", //반복되는거. 붙여쓰기 귀찮아서..
};

export const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const days = ["Sun", "Mon", "Tue", "Wed", "Tur", "Fri", "Sat"];

export const clothes = [
  {
    top: [
      { name: "셔츠", value: [0, 1, 2, 3] },
      { name: "블라우스", value: [0, 1, 2, 3] },
      { name: "나트", value: [0, 2, 3] },
      { name: "얇은 니트", value: [0, 2] },
      { name: "두꺼운 니트", value: [2, 3] },
      { name: "맨투맨", value: [0, 2, 3] },
      { name: "반팔 티", value: [1] },
      { name: "나시", value: [1] },
    ],
    outer: [
      { name: "얇은 가디건", value: [0, 2] },
      { name: "두꺼운 가디건", value: [2, 3] },
      { name: "패딩", value: [3] },
      { name: "트렌치 코트", value: [0, 2] },
      { name: "자켓", value: [0, 2] },
      { name: "두꺼운 코트", value: [3] },
    ],
    bottom: [
      { name: "반바지", value: [0, 1, 2] },
      { name: "면바지", value: [0, 1, 2] },
      { name: "청바지", value: [0, 2, 3] },
      { name: "슬렉스", value: [0, 1, 2, 3] },
    ],
    acc: [{ name: "두꺼운 니트", value: [3, 4] }],
  },
];

export const weatherState = [
  { name: "흐림", value: "clouds" },
  { name: "맑음", value: "clean" },
  { name: "비", value: "rain" },
  { name: "가벼운 비", value: "light rain" },
  { name: "안개", value: "mist" },
  { name: "거센 비", value: "shower" },
  { name: "천둥", value: "thunderstorm" },
  { name: "눈", value: "snow" },
];

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}

const images = importAll(require.context("../utils/img/wheater", false, /\.(png|jpe?g|svg)$/));
const length = Object.keys(images).length;
export const imageArr = new Array();
for (let i = 0; i < length; i++) {
  imageArr.push({ name: [Object.keys(images)[i]][0], value: Object.values(images)[i] });
}
