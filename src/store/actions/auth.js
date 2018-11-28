import axios from 'axios';
import jwtDecode from 'jwt-decode';
import setAuthToken from 'utils/setAuthToken';
import { AUTHENTICATE_USER, UNAUTHENTICATE_USER } from 'store/actions/actionTypes';
import { getFavourites } from 'store/actions/favourites';

const authenticateUser = user => ({
  type: AUTHENTICATE_USER,
  payload: user,
});

const unauthenticateUser = () => ({
  type: UNAUTHENTICATE_USER,
});

const asyncAuthenticateUser = loginData => dispatch => new Promise((resolve, reject) => {
  axios.post('/users/login', loginData)
    .then((response) => {
      // Get the token from response
      const { token } = response.data;
      // Save the token in local storage
      localStorage.setItem('token', token);
      // Add the token to Authorization header
      setAuthToken(token);
      // Decode token payload
      const decoded = jwtDecode(token);
      // Set user data in store
      dispatch(authenticateUser(decoded));
      resolve(response);
    })
    .catch((error) => {
      reject(error);
    });
});

const logoutUser = () => (dispatch) => {
  // Remove the token from the local storeage
  localStorage.removeItem('token');
  // Remove the token from Authorization header
  setAuthToken(false);
  // Remove user data from store
  dispatch(unauthenticateUser());
  // Remove favourites
  dispatch(getFavourites([]));

  return new Promise((resolve) => {
    resolve();
  });
};

export {
  authenticateUser,
  unauthenticateUser,
  asyncAuthenticateUser,
  logoutUser,
};
