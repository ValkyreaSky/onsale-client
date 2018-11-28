import React from 'react';
import { shallow } from 'enzyme';
import AdList from './AdList';
import Ad from './Ad/Ad';
import AdListTitle from './AdListTitle/AdListTitle';

describe('<AdListTitle />', () => {
  let wrapperWithAds; let
    wrapperWithoutAds;

  const ads = [
    {
      _id: 1,
    },
    {
      _id: 2,
    },
  ];

  beforeAll(() => {
    wrapperWithAds = shallow(<AdList ads={ads} />);
    wrapperWithoutAds = shallow(<AdList ads={[]} />);
  });

  it('should match snapthot', () => {
    expect(wrapperWithAds).toMatchSnapshot();
    expect(wrapperWithoutAds).toMatchSnapshot();
  });

  it('should render <Ad> components when "ads" prop is not empty', () => {
    expect(wrapperWithAds.find(Ad).length).toBe(2);
  });

  it('should not render <Ad> components when "ads" prop is empty', () => {
    expect(wrapperWithoutAds.find(Ad).length).toBe(0);
  });

  it('should render <AdListTitle> component when "ads" prop is empty', () => {
    expect(wrapperWithoutAds.find(AdListTitle).length).toBe(1);
  });
});
