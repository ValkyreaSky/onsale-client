import React from 'react';
import { shallow } from 'enzyme';
import AdListTitle, { Title, SmallTitle } from './AdListTitle';

describe('<AdListTitle />', () => {
  const text = 'Hello';

  it('should match snapthot', () => {
    const wrapper = shallow(<AdListTitle text={text} />);
    expect(wrapper).toMatchSnapshot();
  });


  it('should render <Title> component when "small" prop is false', () => {
    const wrapper = shallow(<AdListTitle text={text} />);
    expect(wrapper.find(Title).length).toBe(1);
    expect(wrapper.find(SmallTitle).length).toBe(0);
    expect(wrapper.find(Title).props().children).toBe(text);
  });

  it('should render <SmallTitle> when "small" prop is true', () => {
    const wrapper = shallow(<AdListTitle small text={text} />);
    expect(wrapper.find(SmallTitle).length).toBe(1);
    expect(wrapper.find(Title).length).toBe(0);
    expect(wrapper.find(SmallTitle).props().children).toBe(text);
  });
});
