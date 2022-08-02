import React from 'react';
import styled from 'styled-components';

const SubContent = ({ data }) => {
    const sunrise = new Date(data?.sys.sunrise * 1000).toLocaleTimeString();
    const sunset = new Date(data?.sys.sunset * 1000).toLocaleTimeString();
    return <StyledMainContent>{sunrise}</StyledMainContent>;
};

export default SubContent;
const StyledMainContent = styled.div``;
