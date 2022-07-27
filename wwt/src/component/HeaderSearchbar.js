import React from "react";
import { Select } from "antd";
import styled from "styled-components";

const HeaderSearchbar = ({ fetchWeather, optionList, setCityList, setCity, city }) => {
  const handleChangeCity = (e) => {
    console.log(e);
    fetchWeather(e);
  };
  return (
    <Header>
      <Select onChange={handleChangeCity} placeholder="도시명을 검색하세요. ex) Seoul (대소문자 구별 없음)" showSearch={true}>
        {optionList?.map((v, i) => (
          <Select.Option key={v.value} value={v.value}>
            {v.value}
          </Select.Option>
        ))}
      </Select>
    </Header>
  );
};

export default HeaderSearchbar;
const Header = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  transform: translate(-50%, -50%);
  top: 5rem;
  left: 50%;
  // antd select
  padding: 3rem 0;
  z-index: 1;
  .ant-select {
    /* border: solid 2px blue; */
    width: 35rem;
    /* transform: translate(100%, 0); */
    svg {
      width: 2rem;
      height: 3rem;
    }
  }
  .ant-select:not(.ant-select-customize-input) .ant-select-selector {
    /* border: solid 1px grey; */
    border-radius: 1rem;
  }
  .ant-select-single.ant-select-show-arrow .ant-select-selection-placeholder {
    font-size: 1.2rem;
    color: grey;
    text-align: center;
  }
`;
