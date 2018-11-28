import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Icon, Divider } from 'antd';
import Aux from 'components/hoc/Aux/Aux';
import getCategoryName from 'utils/getCategoryName';

const Foo = styled.span`
  white-space: nowrap;
`;

const AdInfoIcons = ({ ad }) => (
  <Aux>
    <Foo>
      <Icon
        type="shopping"
        style={{
          marginRight: 8,
        }}
      />
      Condition: 
{' '}
{ad.isUsed ? 'Used' : 'New'}
    </Foo>
    {/* <Divider type="vertical" /> */}
    {/* <Foo> */}
    {/* <Icon
        type="folder"
        style={{
          marginRight: 8,
        }}
      />
      Category: <Link to={`/category/${ad.category}`}>{getCategoryName(ad.category)}</Link> */}
    {/* </Foo> */}
    <Divider type="vertical" />
    <Foo>
      <Icon
        type="home"
        style={{
          marginRight: 8,
        }}
      />
      Location: 
{' '}
<Link to={`/search/?location=${ad.location}`}>{ad.location}</Link>
    </Foo>
    <Divider type="vertical" />
    <Foo>
      <Icon
        type="eye"
        style={{
          marginRight: 8,
        }}
      />
      Views: 
{' '}
{ad.views}
    </Foo>
  </Aux>
);

export default AdInfoIcons;
