import React from 'react';
import styled from 'styled-components';
// Components
import { Divider } from 'antd';
import Container from 'components/layout/Container/Container';
import Category from 'components/layout/Categories/Category/Category';
// Images
import electronicsIcon from 'assets/category-icons/icon-electronics.svg';
import fashionIcon from 'assets/category-icons/icon-fashion.svg';
import jobsIcon from 'assets/category-icons/icon-jobs.svg';
import motorsIcon from 'assets/category-icons/icon-motors.svg';
import petsIcon from 'assets/category-icons/icon-pets.svg';
import servicesIcon from 'assets/category-icons/icon-services.svg';
import propertyIcon from 'assets/category-icons/icon-property.svg';
import sportAndHobbyIcon from 'assets/category-icons/icon-sport-and-hobby.svg';
// Media Queries
import media from 'utils/mediaQueries';

const CategoriesContainer = styled.div`
  display: flex;
  flex-direction: 'row';
  flex-wrap: wrap;
  justify-content: space-around;

  ${media.small`
    display: none;
  `}
`;

const TopDivider = styled(Divider)`
  margin-bottom: 1rem !important;
`;

const BottomDivider = styled(Divider)`
  margin-top: 1rem !important;
`;

const Categories = () => (
  <Container>
    <CategoriesContainer>
      <TopDivider />
      <Category link="/category/1" icon={jobsIcon} name="Jobs" />
      <Category link="/category/2" icon={servicesIcon} name="Services" />
      <Category link="/category/3" icon={petsIcon} name="Pets" />
      <Category link="/category/4" icon={motorsIcon} name="Motors" />
      <Category link="/category/5" icon={electronicsIcon} name="Electronics" />
      <Category link="/category/6" icon={propertyIcon} name="Property" />
      <Category link="/category/7" icon={sportAndHobbyIcon} name="Sport & Hobby" />
      <Category link="/category/8" icon={fashionIcon} name="Fashion" />
      <BottomDivider />
    </CategoriesContainer>
  </Container>
);

export default Categories;
