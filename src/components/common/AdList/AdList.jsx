import React from 'react';
import PropTypes from 'prop-types';
// Components
import { Row } from 'antd';
import Ad from 'components/common/AdList/Ad/Ad';
import AdListTitle from 'components/common/AdList/AdListTitle/AdListTitle';

const AdList = ({ ads, withRemove, handleRemove }) => {
  let render;

  if (ads.length === 0) {
    render = <AdListTitle small text="Sorry, we didn't find any results." />;
  } else {
    render = (
      <Row gutter={16}>
        {ads.map(ad => <Ad withRemove={withRemove} handleRemove={handleRemove} key={ad._id} ad={ad} />)}
      </Row>
    );
  }

  return render;
};

AdList.defaultProps = {
  withRemove: false,
  handleRemove: () => {},
};

AdList.propTypes = {
  withRemove: PropTypes.bool,
  handleRemove: PropTypes.func,
  ads: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default AdList;
