import React, { Component } from 'react';
import styled from 'styled-components';
// Components
import { Divider } from 'antd';
import Container from 'components/layout/Container/Container';
// Media Queries
import media from 'utils/mediaQueries';

const FooterContainer = styled.footer`
  margin: 0 auto;
  max-width: 70rem;
  padding-bottom: 3rem;
  text-align: center;
  
  ${media.small`
    padding-bottom: 2rem;
    font-size: 1.5rem;
  `}
`;

class Footer extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <Container>
        <FooterContainer>
          <Divider />
          <p>Selli &copy; {new Date().getFullYear()}</p>
          <p>Design and implementation by <a href="https://github.com/appalaszynski" rel="noopener noreferrer" target="_blank">appalaszynski</a></p>
          <p>
            Icons made by <a href="http://www.freepik.com" rel="noopener noreferrer" target="_blank">Freepik</a> from <a href="https://www.flaticon.com/" rel="noopener noreferrer" target="_blank">www.flaticon.com</a> are licensed by <a href="http://creativecommons.org/licenses/by/3.0/" rel="noopener noreferrer" target="_blank">CC 3.0 BY</a>
          </p>
        </FooterContainer>
      </Container>
    );
  }
}

export default Footer;
