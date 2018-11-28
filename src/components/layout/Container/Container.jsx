import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledContainer = styled.div`
  max-width: 114rem;
  padding: 0 1.5rem;
  margin: 0 auto;
`;

const Container = ({ children }) => (
  <StyledContainer>
    {children}
  </StyledContainer>
);

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
