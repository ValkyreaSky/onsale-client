import React from 'react';
import styled from 'styled-components';
import { Col } from 'antd';

const Container = styled.div`
  height: 40rem;
  position: relative;
  background-color: rgb(236, 236, 236);
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 37.5em) {
    margin-bottom: 2rem;
  }
`;

const Image = styled.img`
  max-width: 100%;
  margin: 0 auto;
  display: block;
  max-height: 100%;
`;

const ImageBox = ({ ad, children }) => (
  <Col
    xs={{
      span: 24,
    }}
    lg={{
      span: 12,
    }}
  >
    <Container>
      <Image src={ad.image} alt="" />
      {children}
    </Container>
  </Col>
);

export default ImageBox;
