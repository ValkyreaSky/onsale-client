import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const CategoryIcon = styled.svg`
  width: 2.8rem;
  margin-right: 1rem;
  transition: all 0.2s;
`;

const CategoryContainer = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 1rem 3.5rem 1rem 0;
  transition: all 0.2s;
  color: inherit;

  &:last-of-type {
    padding-right: 0;
  }

  &:hover, &.active {
    color: #e86e6e;

    & ${CategoryIcon} {
      transform: translateY(-0.3rem);
    }
  }
`;

const Category = ({ icon, name, link }) => (
  <CategoryContainer exact to={link}>
    <CategoryIcon viewBox={icon.viewBox}>
      <use xlinkHref={icon} />
    </CategoryIcon>
    {name}
  </CategoryContainer>
);

Category.propTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  icon: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Category;
