import React from 'react';
import { shallow } from 'enzyme';
import { Spin } from 'antd';
import Loader from './Loader';

describe('<Loader />', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<Loader />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render <Spin> comopnent', () => {
    const wrapper = shallow(<Loader />);
    expect(wrapper.find(Spin).length).toBe(1);
  });
});
