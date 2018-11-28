import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// Components
import { Divider, Drawer, Avatar, Button } from 'antd';
import Aux from 'components/hoc/Aux/Aux';
import SidebarItem from 'components/navigation/Sidebar/SidebarItem/SidebarItem';
// Images
import electronicsIcon from 'assets/category-icons/icon-electronics.svg';
import fashionIcon from 'assets/category-icons/icon-fashion.svg';
import jobsIcon from 'assets/category-icons/icon-jobs.svg';
import motorsIcon from 'assets/category-icons/icon-motors.svg';
import petsIcon from 'assets/category-icons/icon-pets.svg';
import servicesIcon from 'assets/category-icons/icon-services.svg';
import propertyIcon from 'assets/category-icons/icon-property.svg';
import sportAndHobbyIcon from 'assets/category-icons/icon-sport-and-hobby.svg';
import settingsIcon from 'assets/navigation-icons/icon-settings.svg';
import myAdsIcon from 'assets/navigation-icons/icon-my-ads.svg';
import favouritesIcon from 'assets/navigation-icons/icon-favourites.svg';
import postAdIcon from 'assets/navigation-icons/icon-post-ad.svg';

const Sidebar = ({
  isOpen, handleSidebarItemClick, handleLogout, isAuthenticated, user,
}) => {
  const handleLogoutItemClick = () => {
    handleLogout();
    handleSidebarItemClick();
  };

  const drawerTitle = isAuthenticated
    ? (
      <p>
        <Avatar
          src={user.image}
          style={{
            marginRight: '1rem',
          }}
        />
        {user.firstName} {user.lastName}
      </p>
    ) : (
      null
    );

  return (
    <Drawer
      title={drawerTitle}
      closable={false}
      placement="left"
      onClose={handleSidebarItemClick}
      visible={isOpen}
    >
      <SidebarItem
        icon={jobsIcon}
        href="/category/1"
        onClick={handleSidebarItemClick}
        text="Jobs"
      />

      <SidebarItem
        icon={servicesIcon}
        href="/category/2"
        onClick={handleSidebarItemClick}
        text="Services"
      />

      <SidebarItem
        icon={petsIcon}
        href="/category/3"
        onClick={handleSidebarItemClick}
        text="Pets"
      />

      <SidebarItem
        icon={motorsIcon}
        href="/category/4"
        onClick={handleSidebarItemClick}
        text="Motors"
      />

      <SidebarItem
        icon={electronicsIcon}
        href="/category/5"
        onClick={handleSidebarItemClick}
        text="Electronics"
      />

      <SidebarItem
        icon={propertyIcon}
        href="/category/6"
        onClick={handleSidebarItemClick}
        text="Property"
      />

      <SidebarItem
        icon={sportAndHobbyIcon}
        href="/category/7"
        onClick={handleSidebarItemClick}
        text="Sport & Hobby"
      />

      <SidebarItem
        icon={fashionIcon}
        href="/category/8"
        onClick={handleSidebarItemClick}
        text="Fashion"
      />

      <Divider />
      {isAuthenticated ? (
        <Aux>
          <SidebarItem
            icon={postAdIcon}
            href="/create"
            onClick={handleSidebarItemClick}
            text="Post an add"
          />

          <SidebarItem
            icon={myAdsIcon}
            href="/my"
            onClick={handleSidebarItemClick}
            text="My ads"
          />

          <SidebarItem
            icon={favouritesIcon}
            href="/favourites"
            onClick={handleSidebarItemClick}
            text="My favourites"
          />

          <SidebarItem
            icon={settingsIcon}
            href="/settings"
            onClick={handleSidebarItemClick}
            text="Settings"
          />

          <Divider />

          <Button onClick={handleLogoutItemClick} type="primary" block>Logout</Button>
        </Aux>
      ) : (
        <Link to="/auth">
          <Button
            type="primary"
            block
            onClick={handleSidebarItemClick}
          >
            Login
          </Button>
        </Link>
      )}
    </Drawer>
  );
};

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleSidebarItemClick: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Sidebar;
