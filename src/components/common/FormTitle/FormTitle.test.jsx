import React from 'react';
import { shallow } from 'enzyme';
import FormTitle, { Title, Icon } from './FormTitle';

describe('<FormTitle />', () => {
  const text = 'Hello';
  const icon = {
    viewBox: '0 0 489 323',
  };

  it('should match snapshot', () => {
    const wrapper = shallow(<FormTitle text={text} icon={icon} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render <Title /> component with icon and text', () => {
    const wrapper = shallow(<FormTitle text={text} icon={icon} />);
    expect(wrapper.find(Title).length).toBe(1);
    expect(wrapper.find(Icon).length).toBe(1);
    expect(wrapper.find(Title).props().children[1]).toBe(text);
  });
});
