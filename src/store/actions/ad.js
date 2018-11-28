import axios from 'axios';
import { SET_AD_LOADING, GET_AD } from 'store/actions/actionTypes';

const setAdLoading = () => ({
  type: SET_AD_LOADING,
});

const getAd = ad => ({
  type: GET_AD,
  payload: ad,
});

const asyncGetAd = adId => async (dispatch) => {
  dispatch(setAdLoading());
  return new Promise((resolve, reject) => {
    axios.get(`/ads/${adId}`)
      .then((response) => {
        dispatch(getAd(response.data));
        resolve(response.data);
      })
      .catch((error) => {
        dispatch(getAd({}));
        reject(error);
      });
  });
};

export {
  setAdLoading,
  getAd,
  asyncGetAd,
};
