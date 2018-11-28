import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const SidebarItemContainer = styled.div`
  margin-bottom: 2rem;
  cursor: pointer;
`;

const Icon = styled.svg`
  width: 2rem;
  margin-right: 1rem;
`;

const SidebarItemLink = styled(NavLink)`
  text-decoration: none;
  color: initial;
  display: flex;
  align-items: center;
  transition: all 0.2s;

  &.active, &:hover {
    color: #e86e6e;
  }
`;

const SidebarItem = ({
  icon, href, text, onClick,
}) => (
  <SidebarItemContainer>
    <SidebarItemLink onClick={onClick} to={href} exact>
      <Icon viewBox={icon.viewBox}>
        <use xlinkHref={icon} />
      </Icon>
      {text}
    </SidebarItemLink>
  </SidebarItemContainer>
);

SidebarItem.propTypes = {
  icon: PropTypes.objectOf(PropTypes.any).isRequired,
  href: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default SidebarItem;
