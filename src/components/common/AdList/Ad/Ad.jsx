import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
// Components
import { Card, Icon, Col } from 'antd';

const { Meta } = Card;

const AdContainer = styled(Card)`
  margin-bottom: 2rem !important;
`;

const AdImageContainer = styled.div`
  height: 15rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e8e8e8;
  color: red;
`;

const AdImage = styled.img`
  display: block;
  width: auto;
  max-width: 100%;
  height: auto;
  max-height: 15rem;
`;

const Ad = ({
  ad: {
    _id, title, image, price,
  }, withRemove, handleRemove,
}) => {
  const imageResized = image.replace(/\/upload\//, '/upload/h_150/');

  return (
    <Col
      xs={{
        span: 24,
      }}
      sm={{
        span: 12,
      }}
      md={{
        span: 6,
      }}
      lg={{
        span: 4,
      }}
    >
      <AdContainer
        hoverable
        actions={withRemove && [<Icon type="delete" onClick={handleRemove(_id)} theme="twoTone" twoToneColor="red" />, <Icon type="edit" />]}
        cover={(
          <Link to={`/ad/${_id}`}>
            <AdImageContainer>
              <AdImage data-src={imageResized} src="https://res.cloudinary.com/selli/image/upload/h_150/placeholder.png" alt={title} className="lazyload" />
            </AdImageContainer>
          </Link>
        )}
      >
        <Link to={`/ad/${_id}`}>
          <Meta
            title={title}
            description={`$${price}`}
          />
        </Link>
      </AdContainer>
    </Col>
  );
};

Ad.defaultProps = {
  withRemove: false,
  handleRemove: () => {},
};

Ad.propTypes = {
  ad: PropTypes.objectOf(PropTypes.any).isRequired,
  withRemove: PropTypes.bool,
  handleRemove: PropTypes.func,
};

export default Ad;
