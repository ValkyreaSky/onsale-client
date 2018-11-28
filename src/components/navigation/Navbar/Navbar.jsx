import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
// Components
import { Button, Icon } from 'antd';
import NavDropdown from 'components/navigation/Navbar/NavDropdown/NavDropdown';
import Container from 'components/layout/Container/Container';
import Logo from 'components/common/Logo/Logo';
import Sidebar from 'components/navigation/Sidebar/Sidebar';
// Actions
import { logoutUser } from 'store/actions/auth';
// Images
import userIcon from 'assets/navigation-icons/icon-user.svg';
// Media Queries
import media from 'utils/mediaQueries';

const Nav = styled.div`
  padding: 1rem 0;
  box-shadow: 0 2px 8px #f0f1f2;
  margin-bottom: 3rem;

  ${media.small`
    padding: 0.8rem 0;
  `}
`;

const NavContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${media.small`
    justify-content: center;
  `}
`;

const NavButton = styled(Icon)`
  font-size: 1.8rem;
  display: none !important;
  position: absolute;
  left: 0;
  cursor: pointer;

  ${media.small`
    display: block !important;
  `}
`;

const NavMenu = styled.div`
  ${media.small`
    display: none;
  `}
`;

const NavList = styled.ul`
  list-style: none;
  display: flex;
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  transition: all 0.2s;
  color: inherit;

  &:hover {
    color: #e86e6e;
  }
`;

const NavItemIcon = styled.svg`
  width: 3rem;
  margin-right: 0.9rem;
  border-radius: 50%;
`;

const NavItem = styled.li`
  display: flex;
  position: relative;

  &:not(:first-child) {
    margin-left: 3rem;
  }
`;

class Navbar extends Component {
  state = {
    isSidebarOpen: false,
  }

  handleToggleSidebar = () => {
    const { isSidebarOpen } = this.state;
    this.setState({
      isSidebarOpen: !isSidebarOpen,
    });
  }

  logout = () => {
    const { history, logoutUser } = this.props;
    logoutUser().then(() => history.push('/'));
  }

  render() {
    const { isSidebarOpen } = this.state;
    const { isAuthenticated, user } = this.props;


    return (
      <div>
        <Nav>
          <Container>
            <NavContainer>
              <NavButton type="bars" theme="outlined" onClick={this.handleToggleSidebar} />
              <Logo />
              <NavMenu>
                <NavList>
                  <NavItem>
                    {/* If user is not authenticated, this menu option links to the authentication page.
                    If user is authenticated it just opens dropdown on hover. */}
                    {isAuthenticated
                      ? (
                        <NavDropdown handleLogout={this.logout} image={user.image} />
                      )
                      : (
                        <NavLink to="/auth">
                          <NavItemIcon viewBox={userIcon.viewBox}>
                            <use xlinkHref={userIcon} />
                          </NavItemIcon>
                          My Account
                        </NavLink>
                      )
                    }
                  </NavItem>
                  <NavItem>
                    <Link to={isAuthenticated ? '/create' : '/auth'}>
                      <Button size="large" type="primary" ghost>Post an ad</Button>
                    </Link>
                  </NavItem>
                </NavList>
              </NavMenu>
            </NavContainer>
          </Container>
        </Nav>
        <Sidebar
          isOpen={isSidebarOpen}
          handleLogout={this.logout}
          handleSidebarItemClick={this.handleToggleSidebar}
          isAuthenticated={isAuthenticated}
          user={user}
        />
      </div>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default withRouter(connect(mapStateToProps, {
  logoutUser,
})(Navbar));
