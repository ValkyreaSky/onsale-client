import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
// Components
import Container from 'components/layout/Container/Container';
import Aux from 'components/hoc/Aux/Aux';
import Loader from 'components/common/Loader/Loader';
import AdList from 'components/common/AdList/AdList';
import AdListTitle from 'components/common/AdList/AdListTitle/AdListTitle';
// Actions
import { asyncGetFavouritesAds } from 'store/actions/favourites';
// Utils
import openErrorModal from 'utils/openErrorModal';
import changePageTitle from 'utils/changePageTitle';

class MyFavouritesPage extends Component {
  componentWillMount() {
    const { asyncGetFavouritesAds } = this.props;
    changePageTitle('My favourites');
    return asyncGetFavouritesAds()
      .catch(() => openErrorModal());
  }

  handleAdRemove = adId => () => {
    const { asyncGetFavouritesAds } = this.props;
    return axios.delete(`/favourites/${adId}`)
      .then(() => asyncGetFavouritesAds());
  }

  render() {
    const { loading, ads } = this.props;
    let render;

    if (loading) {
      render = <Loader />;
    } else {
      render = (
        <Aux>
          <AdListTitle text="Your favourites" />
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

MyFavouritesPage.propTypes = {
  asyncGetFavouritesAds: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  ads: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  ads: state.favourites.favourites,
  loading: state.favourites.loading,
});

export default connect(mapStateToProps, {
  asyncGetFavouritesAds,
})(MyFavouritesPage);
