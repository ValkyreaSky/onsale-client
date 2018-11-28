import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Components
import Container from 'components/layout/Container/Container';
import Aux from 'components/hoc/Aux/Aux';
import Loader from 'components/common/Loader/Loader';
import AdList from 'components/common/AdList/AdList';
import AdListTitle from 'components/common/AdList/AdListTitle/AdListTitle';
// Actions
import { asyncGetLastAds } from 'store/actions/ads';
// Utils
import openErrorModal from 'utils/openErrorModal';
import changePageTitle from 'utils/changePageTitle';

class HomePage extends Component {
  componentWillMount() {
    const { asyncGetLastAds } = this.props;
    changePageTitle();
    return asyncGetLastAds()
      .catch(() => openErrorModal());
  }

  render() {
    const { loading, ads } = this.props;
    let render;

    if (loading) {
      render = <Loader />;
    } else {
      render = (
        <Aux>
          <AdListTitle text="Last posted ads" />
          <AdList ads={ads} />
        </Aux>
      );
    }

    return (
      <Container>
        {render}
      </Container>
    );
  }
}

HomePage.propTypes = {
  asyncGetLastAds: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  ads: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  ads: state.ads.ads,
  loading: state.ads.loading,
});

export default connect(mapStateToProps, {
  asyncGetLastAds,
})(HomePage);
