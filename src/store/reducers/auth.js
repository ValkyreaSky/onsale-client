import { AUTHENTICATE_USER, UNAUTHENTICATE_USER } from 'store/actions/actionTypes';
import createReducer from 'utils/createReducer';

const initialState = {
  isAuthenticated: false,
  user: {},
};

const authenticateUser = (state, { payload }) => ({
  ...state,
  isAuthenticated: true,
  user: payload,
});

const unauthenticateUser = state => ({
  ...state,
  isAuthenticated: false,
  user: {},
});

export default createReducer(initialState, {
  [AUTHENTICATE_USER]: authenticateUser,
  [UNAUTHENTICATE_USER]: unauthenticateUser,
});
