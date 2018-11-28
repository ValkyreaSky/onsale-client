import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
// Components
import Container from 'components/layout/Container/Container';
import Aux from 'components/hoc/Aux/Aux';
import Loader from 'components/common/Loader/Loader';
import AdList from 'components/common/AdList/AdList';
import AdListTitle from 'components/common/AdList/AdListTitle/AdListTitle';
// Actions
import { asyncSearchAds } from 'store/actions/ads';
// Utils
import openErrorModal from 'utils/openErrorModal';
import changePageTitle from 'utils/changePageTitle';

const changeSearchFormInput = (field, payload) => ({
  type: '@@redux-form/CHANGE',
  meta: {
    form: 'searchForm',
    field,
    touch: false,
    persistentSubmitErrors: false,
  },
  payload,
});

class SearchPage extends Component {
  componentWillMount() {
    const { asyncSearchAds, changeSearchFormInput, location: { search } } = this.props;
    changePageTitle('Found ads');
    const urlParams = new URLSearchParams(search);
    const title = urlParams.get('title');
    const location = urlParams.get('location');
    changeSearchFormInput('title', title || '');
    changeSearchFormInput('location', location || '');
    return asyncSearchAds(search)
      .catch(() => openErrorModal());
  }

  componentWillReceiveProps(nextProps) {
    const { location: { search }, asyncSearchAds } = this.props;
    const nextSearch = nextProps.location.search;
    // If user is on the search page and click again 'Search" button (with the same parameters)
    // component should not send new request
    if (search !== nextSearch) {
      asyncSearchAds(nextSearch)
        .catch(() => openErrorModal());
    }
  }

  componentWillUnmount() {
    // Reset search form when component is going to unmount
    const { reset } = this.props;
    reset('searchForm');
  }

  render() {
    const { loading, ads } = this.props;
    let render;

    if (loading) {
      render = <Loader />;
    } else {
      render = (
        <Aux>
          <AdListTitle text="Found ads" />
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

SearchPage.propTypes = {
  asyncSearchAds: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  changeSearchFormInput: PropTypes.func.isRequired,
  ads: PropTypes.arrayOf(PropTypes.object).isRequired,
  reset: PropTypes.func.isRequired,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = state => ({
  ads: state.ads.ads,
  loading: state.ads.loading,
});

export default connect(mapStateToProps, {
  asyncSearchAds,
  reset,
  changeSearchFormInput,
})(SearchPage);
