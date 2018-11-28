import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import moment from 'moment';
// Components
import Container from 'components/layout/Container/Container';
import AdInfoIcons from 'components/pages/AdPage/AdInfoIcons/AdInfoIcons';
import PriceBox from 'components/pages/AdPage/PriceBox/PriceBox';
import AuthorBox from 'components/pages/AdPage/AuthorBox/AuthorBox';
import ImageBox from 'components/pages/AdPage/ImageBox/ImageBox';
import MapBox from 'components/pages/AdPage/MapBox/MapBox';
import FavouriteBox from 'components/pages/AdPage/FavouriteBox/FavouriteBox';
import { Divider, Button, Row, Col, Breadcrumb, Icon } from 'antd';
import Loader from 'components/common/Loader/Loader';
// Actions
import { asyncGetAd } from 'store/actions/ad';
import { asyncGetFavouritesAds } from 'store/actions/favourites';
// Utils
import openErrorModal from 'utils/openErrorModal';
import changePageTitle from 'utils/changePageTitle';
import getCategoryName from 'utils/getCategoryName';

const Description = styled.p`
  margin: 2rem 0 !important;
`;

class AdPage extends Component {
  state = {
    isFavouriteLoading: false,
  }

  phoneButton = React.createRef();

  componentWillMount() {
    const { match: { params: { id: adId } }, asyncGetAd, history } = this.props;
    return asyncGetAd(adId)
      .then(ad => changePageTitle(ad.title))
      .catch((error) => {
        // If request was invalid, redirect user to the homepage
        if (error.response && error.response.data.status === '400') return history.push('/');
        return openErrorModal();
      });
  }

  handleShowPhone = () => {
    const { ad } = this.props;
    this.phoneButton.current.innerHTML = ad.phone;
  }

  handleRemoveFavourite = adId => () => {
    const { asyncGetFavouritesAds } = this.props;
    this.setState({
      isFavouriteLoading: true,
    });
    axios.delete(`/favourites/${adId}`)
      .then(() => {
        asyncGetFavouritesAds().then(() => {
          this.setState({
            isFavouriteLoading: false,
          });
        });
      });
  }

  handleAddFavourite = adId => () => {
    const { asyncGetFavouritesAds } = this.props;
    this.setState({
      isFavouriteLoading: true,
    });

    axios.post(`/favourites/${adId}`)
      .then(() => {
        asyncGetFavouritesAds().then(() => {
          this.setState({
            isFavouriteLoading: false,
          });
        });
      });
  }

  render() {
    const {
      loading, ad, isAuthenticated, favourites,
    } = this.props;
    const { isFavouriteLoading } = this.state;
    let isFavourite;

    if (favourites.length === 0) {
      // If user favourites is empty, current ad is not favourite
      isFavourite = false;
    } else {
      const index = favourites.find(favourite => favourite._id === ad._id);
      if (index) isFavourite = true;
    }

    const favFunction = isFavourite ? this.handleRemoveFavourite(ad._id) : this.handleAddFavourite(ad._id);

    const render = loading || Object.keys(ad).length === 0
      ? <Loader />
      : (
        <div>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/">
                Home
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to={`/category/${ad.category}`}>
                {getCategoryName(ad.category)}
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              {ad.title}
            </Breadcrumb.Item>
          </Breadcrumb>
          <br />
          <Row gutter={48}>
            <ImageBox ad={ad}>
              {isAuthenticated && (
              <FavouriteBox
                favFunction={favFunction}
                isFavouriteLoading={isFavouriteLoading}
                isFavourite={isFavourite}
              />
              )}
            </ImageBox>
            <MapBox ad={ad} />
          </Row>

          <Divider />

          <Row gutter={48}>
            <Col
              xs={{
                span: 24,
              }}
              md={{
                span: 16,
              }}
              lg={{
                span: 18,
              }}
              style={{
                marginBottom: '3rem',
              }}
            >
              <h1>{ad.title}</h1>
              <AdInfoIcons ad={ad} />
              <Description>{ad.description}</Description>
              <br />
<br />
              <p>
Ad ID:
                {' '}
                {ad._id}
              </p>
              <p>
Created at:
                {' '}
                {moment(ad.creationDate).format('HH:mm YYYY-MM-DD')}
              </p>
            </Col>

            <Col
              xs={{
                span: 24,
              }}
              md={{
                span: 8,
              }}
              lg={{
                span: 6,
              }}
            >
              <PriceBox price={ad.price} />
              <AuthorBox ad={ad} />
              <Button
                block
                type="primary"
                size="large"
                href={`mailto:${ad.owner.email}`}
                style={{
                  marginBottom: '1rem',
                }}
              >
                Send an email
              </Button>
              {ad.phone ? (
                <Button
                  block
                  type="primary"
                  onClick={this.handleShowPhone}
                  size="large"
                >
                  <span ref={this.phoneButton}>Show phone</span>
                </Button>
              ) : null }
            </Col>
          </Row>
        </div>
      );

    return (
      <Container>
        {render}
      </Container>
    );
  }
}

AdPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  asyncGetFavouritesAds: PropTypes.func.isRequired,
  asyncGetAd: PropTypes.func.isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  ad: PropTypes.objectOf(PropTypes.any).isRequired,
  favourites: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  ad: state.ad.ad,
  loading: state.ad.loading,
  favourites: state.favourites.favourites,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  asyncGetAd,
  asyncGetFavouritesAds,
})(AdPage);
