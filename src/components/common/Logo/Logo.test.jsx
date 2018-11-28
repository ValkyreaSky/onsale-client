import React from 'react';
import { shallow } from 'enzyme';
import Logo, { LogoBrand } from './Logo';

describe('<Logo />', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<Logo />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render <LogoBrand> comopnent with a link to the homepage', () => {
    const wrapper = shallow(<Logo />);
    expect(wrapper.find(LogoBrand).length).toBe(1);
    expect(wrapper.find(LogoBrand).props().to).toBe('/');
  });

  it('should render <LogoBrand> comopnent with a link to the homepage', () => {
    const wrapper = shallow(<Logo />);
    expect(wrapper.find(LogoBrand).props().to).toBe('/');
  });
});
