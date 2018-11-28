import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
// Components
import Aux from 'components/hoc/Aux/Aux';
import ScrollToTop from 'components/hoc/ScrollToTop/ScrollToTop';
import PrivateRoute from 'components/hoc/PrivateRoute/PrivateRoute';
import Navbar from 'components/navigation/Navbar/Navbar';
import Categories from 'components/layout/Categories/Categories';
import Search from 'components/layout/Search/Search';
import Footer from 'components/layout/Footer/Footer';
import HomePage from 'components/pages/HomePage/HomePage';
import AdPage from 'components/pages/AdPage/AdPage';
import CategoryPage from 'components/pages/CategoryPage/CategoryPage';
import MyAdsPage from 'components/pages/MyAdsPage/MyAdsPage';
import SearchPage from 'components/pages/SearchPage/SearchPage';
import MyFavouritesPage from 'components/pages/MyFavouritesPage/MyFavouritesPage';
import UserPage from 'components/pages/UserPage/UserPage';
import AuthPage from 'components/pages/AuthPage/AuthPage';
import SettingsPage from 'components/pages/SettingsPage/SettingsPage';
import CreateAdPage from 'components/pages/CreateAdPage/CreateAdPage';
// Actions
import { authenticateUser } from 'store/actions/auth';
// Store
import store from 'store/configureStore';
// Utils
import setAuthToken from 'utils/setAuthToken';

if (localStorage.token) {
  const { token } = localStorage;
  setAuthToken(token);
  const decodedToken = jwtDecode(token);
  store.dispatch(authenticateUser(decodedToken));
}

const routesWithSearchAndCategories = () => (
  <Aux>
    <Search />
    <Categories />
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/search" exact component={SearchPage} />
      <Route path="/category/:id" exact component={CategoryPage} />
      <Route path="/user/:id" exact component={UserPage} />
      <Redirect to="/" />
    </Switch>
  </Aux>
);

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <ScrollToTop>
        <Navbar />
        <Switch>
          <Route path="/auth" component={AuthPage} />
          <Route path="/ad/:id" exact component={AdPage} />
          <PrivateRoute path="/create" exact component={CreateAdPage} />
          <PrivateRoute path="/my" exact component={MyAdsPage} />
          <PrivateRoute path="/favourites" exact component={MyFavouritesPage} />
          <PrivateRoute path="/settings" exact component={SettingsPage} />
          <Route
            exact
            path="/(.+)?"
            render={routesWithSearchAndCategories}
          />
        </Switch>
        <Footer />
      </ScrollToTop>
    </BrowserRouter>
  </Provider>
);

export default App;
