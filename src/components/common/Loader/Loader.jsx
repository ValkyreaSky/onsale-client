import React from 'react';
import styled from 'styled-components';
// Components
import { Spin } from 'antd';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20rem; 
`;

const Loader = () => (
  <Container>
    <Spin size="large" />
  </Container>
);

export default Loader;
