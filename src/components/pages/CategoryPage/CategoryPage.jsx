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
import { asyncGetCategoryAds } from 'store/actions/ads';
// Data
import getCategoryName from 'utils/getCategoryName';
// Utils
import openErrorModal from 'utils/openErrorModal';
import changePageTitle from 'utils/changePageTitle';

class CategoryPage extends Component {
  componentWillMount() {
    const { asyncGetCategoryAds, match: { params: { id: categoryId } }, history } = this.props;
    // If category does not exists. redirect user to the homepage
    if (!getCategoryName(categoryId)) return history.push('/');
    changePageTitle(`${getCategoryName(categoryId)} ads`);
    return asyncGetCategoryAds(categoryId)
      .catch(() => openErrorModal());
  }

  componentDidUpdate({ match: { params: { id: previousCaregoryId } } }) {
    const { asyncGetCategoryAds, match: { params: { id: newCategoryId } } } = this.props;
    // If user is on the category page and click again on the same category link
    // component should not send new request
    if (newCategoryId !== previousCaregoryId) {
      changePageTitle(`${getCategoryName(newCategoryId)} ads`);
      asyncGetCategoryAds(newCategoryId)
        .catch(() => openErrorModal());
    }
  }

  render() {
    const { loading, ads, match: { params: { id: categoryId } } } = this.props;
    const categoryName = getCategoryName(categoryId);
    let render;

    if (loading) {
      render = <Loader />;
    } else {
      render = (
        <Aux>
          <AdListTitle text={`${categoryName} Ads`} />
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

CategoryPage.propTypes = {
  asyncGetCategoryAds: PropTypes.func.isRequired,
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
  asyncGetCategoryAds,
})(CategoryPage);
