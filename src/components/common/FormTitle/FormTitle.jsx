import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Title = styled.span`
  text-align: center;
  margin-bottom: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.2rem;
`;

const Icon = styled.svg`
  width: 2.8rem;
  margin-right: 1rem;
`;

const FormTitle = ({ text, icon }) => (
  <Title>
    <Icon viewBox={icon.viewBox}>
      <use xlinkHref={icon} />
    </Icon>
    {text}
  </Title>
);

FormTitle.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default FormTitle;
export { Title, Icon };
