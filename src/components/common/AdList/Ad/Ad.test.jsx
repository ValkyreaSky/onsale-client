import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';
import { Card } from 'antd';
import Ad from './Ad';

const { Meta } = Card;

describe('<Ad />', () => {
  const ad = {
    _id: 1,
    title: 'Title',
    image: 'Image',
    price: 200,
  };

  it('should match snapthot', () => {
    const wrapper = shallow(<Ad ad={ad} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render <Link> component with link to ad page', () => {
    const wrapper = shallow(<Ad ad={ad} />);
    expect(wrapper.find(Link).length).toBe(1);
    expect(wrapper.find(Link).props().to).toBe(`/ad/${ad._id}`);
  });

  it('should render <Meta> component with to title and price', () => {
    const wrapper = shallow(<Ad ad={ad} />);
    expect(wrapper.find(Meta).length).toBe(1);
    expect(wrapper.find(Meta).props().title).toBe(ad.title);
    expect(wrapper.find(Meta).props().description).toBe(`$${ad.price}`);
  });
});
