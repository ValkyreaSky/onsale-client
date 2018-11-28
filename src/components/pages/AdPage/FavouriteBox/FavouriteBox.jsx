import React from 'react';
import styled from 'styled-components';
import { Icon } from 'antd';

const Container = styled.div`
  cursor: pointer;
  background-color: white;
  border: 1px solid #e8e8e8;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.8rem;
  border-radius: 0.2rem;
  justify-content: center;
  position: absolute;
  top: 1rem;
  left: 1rem;
  transition: all 0.2s;
  width: 7.8rem;

  &:hover {
    transform: translateY(-0.2rem);
  }
`;

const FavouriteBox = ({ favFunction, isFavouriteLoading, isFavourite }) => {
  let icon;

  if (isFavouriteLoading) {
    icon = (
      <Icon
        type="loading"
        style={{
          fontSize: '32px',
        }}
        theme="outlined"
      />
    );
  } else if (isFavourite) {
    icon = (
      <Icon
        type="star"
        style={{
          fontSize: '32px',
          color: '#e8e800',
        }}
        theme="filled"
        twoToneColor="#e8e800"
      />
    );
  } else {
    icon = (
      <Icon
        type="star"
        style={{
          fontSize: '32px',
          color: '#e8e800',
        }}
        theme="outlined"
      />
    );
  }

  const text = isFavourite ? 'Remove' : 'Favourite';

  return (
    <Container onClick={favFunction}>
      {icon}
      <p>{text}</p>
    </Container>
  );
};

export default FavouriteBox;
