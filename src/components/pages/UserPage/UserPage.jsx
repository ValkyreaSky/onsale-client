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
import { asyncGetUserAds } from 'store/actions/ads';
// Utils
import openErrorModal from 'utils/openErrorModal';
import changePageTitle from 'utils/changePageTitle';

class UserPage extends Component {
  componentWillMount() {
    const { asyncGetUserAds, match: { params: { id: userId } }, history } = this.props;
    changePageTitle('User ads');
    return asyncGetUserAds(userId)
      .catch((error) => {
        // If request was invalid, redirect user to the homepage
        if (error.response && error.response.data.status === '400') return history.push('/');
        return openErrorModal();
      });
  }

  render() {
    const { loading, ads } = this.props;
    let render;

    if (loading) {
      render = <Loader />;
    } else {
      render = (
        <Aux>
          <AdListTitle text="User ads" />
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

UserPage.propTypes = {
  asyncGetUserAds: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  ads: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = state => ({
  ads: state.ads.ads,
  loading: state.ads.loading,
});

export default connect(mapStateToProps, {
  asyncGetUserAds,
})(UserPage);
