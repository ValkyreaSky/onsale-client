import axios from 'axios';
import { SET_ADS_LOADING, GET_ADS } from 'store/actions/actionTypes';

const setAdsLoading = () => ({
  type: SET_ADS_LOADING,
});

const getAds = ads => ({
  type: GET_ADS,
  payload: ads,
});

const asyncGetLastAds = () => (dispatch) => {
  dispatch(setAdsLoading());
  return new Promise((resolve, reject) => {
    axios.get('/ads/last')
      .then((response) => {
        dispatch(getAds(response.data));
        resolve(response.data);
      })
      .catch((error) => {
        dispatch(getAds([]));
        reject(error);
      });
  });
};

const asyncGetCategoryAds = caregoryId => (dispatch) => {
  dispatch(setAdsLoading());
  return new Promise((resolve, reject) => {
    axios.get(`/ads/category/${caregoryId}`)
      .then((response) => {
        dispatch(getAds(response.data));
        resolve(response.data);
      })
      .catch((error) => {
        dispatch(getAds([]));
        reject(error);
      });
  });
};

const asyncSearchAds = query => (dispatch) => {
  dispatch(setAdsLoading());
  return new Promise((resolve, reject) => {
    axios.get(`/ads${query}`)
      .then((response) => {
        dispatch(getAds(response.data));
        resolve(response.data);
      })
      .catch((error) => {
        dispatch(getAds([]));
        reject(error);
      });
  });
};

const asyncGetUserAds = userId => (dispatch) => {
  dispatch(setAdsLoading());
  return new Promise((resolve, reject) => {
    axios.get(`/ads/user/${userId}`)
      .then((response) => {
        dispatch(getAds(response.data));
        resolve(response.data);
      })
      .catch((error) => {
        dispatch(getAds([]));
        reject(error);
      });
  });
};

export {
  setAdsLoading,
  getAds,
  asyncGetLastAds,
  asyncGetCategoryAds,
  asyncGetUserAds,
  asyncSearchAds,
};
