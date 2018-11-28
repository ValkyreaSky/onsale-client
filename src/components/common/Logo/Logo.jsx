import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
// Images
import logo from 'assets/navigation-icons/icon-logo.svg';

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LogoIcon = styled.svg`
  width: 3.8rem;
  margin-right: 1.3rem;
`;

const LogoBrand = styled(Link)`
  font-size: 2.2rem;
  color: inherit;
`;

class Logo extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <LogoContainer>
        <LogoIcon viewBox={logo.viewBox}>
          <use xlinkHref={logo} />
        </LogoIcon>
        <LogoBrand to="/">Selli</LogoBrand>
      </LogoContainer>
    );
  }
}

export default Logo;
export { LogoBrand };
