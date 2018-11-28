import React from 'react';
import { Card } from 'antd';

const { Meta } = Card;

const PriceBox = ({ price }) => (
  <Card style={{
    textAlign: 'center',
    marginBottom: '2rem',
  }}
  >
    <Meta
      title={`$${price}`}
    />
  </Card>
);

export default PriceBox;
