import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
// Components
import Container from 'components/layout/Container/Container';
import { Modal } from 'antd';
import Aux from 'components/hoc/Aux/Aux';
import Loader from 'components/common/Loader/Loader';
import AdList from 'components/common/AdList/AdList';
import AdListTitle from 'components/common/AdList/AdListTitle/AdListTitle';
// Actions
import { asyncGetUserAds } from 'store/actions/ads';
// Utils
import openErrorModal from 'utils/openErrorModal';
import changePageTitle from 'utils/changePageTitle';

const { confirm } = Modal;

class MyAdsPage extends Component {
  componentWillMount() {
    changePageTitle('My ads');
    const { asyncGetUserAds, user: { id: userId } } = this.props;
    return asyncGetUserAds(userId)
      .catch(() => openErrorModal());
  }

  handleAdRemove = adId => () => {
    const { asyncGetUserAds, user: { id: userId } } = this.props;
    confirm({
      title: 'Are you sure you want to delete this ad?',
      content: 'This action cannot be undone!',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        return axios.delete(`/ads/${adId}`)
          .then(() => asyncGetUserAds(userId));
      },
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
          <AdListTitle text="Your ads" />
          <AdList withRemove handleRemove={this.handleAdRemove} ads={ads} />
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

MyAdsPage.propTypes = {
  asyncGetUserAds: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  ads: PropTypes.arrayOf(PropTypes.object).isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = state => ({
  ads: state.ads.ads,
  loading: state.ads.loading,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  asyncGetUserAds,
})(MyAdsPage);
