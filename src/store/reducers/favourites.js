import { SET_FAVOURITES_LOADING, GET_FAVOURITES } from 'store/actions/actionTypes';
import createReducer from 'utils/createReducer';

const initialState = {
  loading: true,
  favourites: [],
};

const setFavouritesLoading = state => ({
  ...state,
  loading: true,
});

const getFavourites = (state, { payload }) => ({
  loading: false,
  favourites: payload,
});

export default createReducer(initialState, {
  [SET_FAVOURITES_LOADING]: setFavouritesLoading,
  [GET_FAVOURITES]: getFavourites,
});
