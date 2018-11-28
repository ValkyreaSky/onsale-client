import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Title = styled.h2`
  margin: 2rem 0;
  font-size: 2.2rem;
`;

const SmallTitle = styled(Title)`
  font-size: 1.7rem;
`;

const AdListTitle = ({ text, small }) => {
  if (small) {
    return <SmallTitle>{text}</SmallTitle>;
  }
  return <Title>{text}</Title>;
};

AdListTitle.defaultProps = {
  small: false,
};

AdListTitle.propTypes = {
  text: PropTypes.string.isRequired,
  small: PropTypes.bool,
};

export { Title, SmallTitle };
export default AdListTitle;
