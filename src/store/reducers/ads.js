import { SET_ADS_LOADING, GET_ADS } from 'store/actions/actionTypes';
import createReducer from 'utils/createReducer';

const initialState = {
  loading: true,
  ads: [],
};

const setAdsLoading = state => ({
  ...state,
  loading: true,
});

const getAds = (state, { payload }) => ({
  loading: false,
  ads: payload,
});

export default createReducer(initialState, {
  [SET_ADS_LOADING]: setAdsLoading,
  [GET_ADS]: getAds,
});
