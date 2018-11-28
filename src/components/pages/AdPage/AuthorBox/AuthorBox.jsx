import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';
// Components
import { Card, Avatar } from 'antd';

const { Meta } = Card;

const Description = styled.span`
  white-space: nowrap;
`;

const AuthorBox = ({ ad }) => (
  <Link to={`/user/${ad.owner._id}`}>
    <Card
      hoverable
      style={{
        marginBottom: '2rem',
      }}
    >
      <Meta
        avatar={<Avatar src={ad.owner.image} />}
        title={ad.owner.firstName}
        description={<span>Selli user from <Description>{moment(ad.owner.registerDate).format('YYYY-MM-DD')}</Description></span>}
      />
    </Card>
  </Link>
);

export default AuthorBox;
