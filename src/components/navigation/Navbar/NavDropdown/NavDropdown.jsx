import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
// Components
import { Menu, Button, Dropdown } from 'antd';
// Images
import settingsIcon from 'assets/navigation-icons/icon-settings.svg';
import myAdsIcon from 'assets/navigation-icons/icon-my-ads.svg';
import favouritesIcon from 'assets/navigation-icons/icon-favourites.svg';

const DropdownIcon = styled.svg`
  width: 2rem;
  margin-right: 1rem;
  flex-shrink: 0;
`;

const DropdownLink = styled(Link)`
  display: flex !important;
  align-items: center;
`;

const DropdownContainer = styled.div`
  display: flex !important;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const DropdownImage = styled.img`
  width: 3rem;
  margin-right: 0.9rem;
  border-radius: 50%;
`;

const NavDropdown = ({ handleLogout, image }) => {
  const menu = (
    <Menu>

      <Menu.Item key="0">
        <DropdownLink to="/my">
          <DropdownIcon viewBox={myAdsIcon.viewBox}>
            <use xlinkHref={myAdsIcon} />
          </DropdownIcon>
          My ads
        </DropdownLink>
      </Menu.Item>

      <Menu.Item key="1">
        <DropdownLink to="/favourites">
          <DropdownIcon viewBox={favouritesIcon.viewBox}>
            <use xlinkHref={favouritesIcon} />
          </DropdownIcon>
          My favourites
        </DropdownLink>
      </Menu.Item>

      <Menu.Item key="2">
        <DropdownLink to="/settings">
          <DropdownIcon viewBox={settingsIcon.viewBox}>
            <use xlinkHref={settingsIcon} />
          </DropdownIcon>
          Settings
        </DropdownLink>
      </Menu.Item>

      <Menu.Divider />

      <Menu.Item key="3">
        <Button type="primary" block onClick={handleLogout}>Logout</Button>
      </Menu.Item>

    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <DropdownContainer>
        <DropdownImage src={image} alt="" />
        My Account &#9662;
      </DropdownContainer>
    </Dropdown>
  );
};

NavDropdown.propTypes = {
  image: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default NavDropdown;
