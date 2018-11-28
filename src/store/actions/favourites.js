import axios from 'axios';
import { SET_FAVOURITES_LOADING, GET_FAVOURITES } from 'store/actions/actionTypes';

const setFavouritesLoading = () => ({
  type: SET_FAVOURITES_LOADING,
});

const getFavourites = favourites => ({
  type: GET_FAVOURITES,
  payload: favourites,
});

const asyncGetFavouritesAds = () => (dispatch) => {
  dispatch(setFavouritesLoading());
  return new Promise((resolve, reject) => {
    axios.get('/favourites')
      .then((response) => {
        dispatch(getFavourites(response.data));
        resolve(response.data);
      })
      .catch((error) => {
        dispatch(getFavourites([]));
        reject(error);
      });
  });
};

export {
  setFavouritesLoading,
  getFavourites,
  asyncGetFavouritesAds,
};
