import { SET_AD_LOADING, GET_AD } from 'store/actions/actionTypes';
import createReducer from 'utils/createReducer';

const initialState = {
  loading: true,
  ad: {},
};

const setAdLoading = state => ({
  ...state,
  loading: true,
});

const getAd = (state, { payload }) => ({
  loading: false,
  ad: payload,
});

export default createReducer(initialState, {
  [SET_AD_LOADING]: setAdLoading,
  [GET_AD]: getAd,
});
