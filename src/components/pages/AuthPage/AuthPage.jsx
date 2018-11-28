import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SubmissionError, reset } from 'redux-form';
import axios from 'axios';
// Components
import Container from 'components/layout/Container/Container';
import { Tabs, Card, Alert, Divider, List, Icon } from 'antd';
import LoginForm from 'components/forms/LoginForm/LoginForm';
import RegisterForm from 'components/forms/RegisterForm/RegisterForm';
// Icons
import favouritesIcon from 'assets/navigation-icons/icon-favourites.svg';
import postAdIcon from 'assets/navigation-icons/icon-post-ad.svg';
import myAdsIcon from 'assets/navigation-icons/icon-my-ads.svg';
// Actions
import { asyncAuthenticateUser } from 'store/actions/auth';
// Utils
import openErrorModal from 'utils/openErrorModal';
import changePageTitle from 'utils/changePageTitle';

const { TabPane } = Tabs;

class AuthPage extends Component {
  state = {
    // Track if user successfully registered to show proper message above login form
    registerSuccess: false,
    activeTab: 'login',
  }

  componentWillMount() {
    const { history, isAuthenticated } = this.props;
    // If user is already logged in redirect use to the homepage
    if (isAuthenticated) {
      history.push('/');
    }
    changePageTitle('Login or create an account');
  }

  handleLogin = (values) => {
    const { history, asyncAuthenticateUser } = this.props;
    return asyncAuthenticateUser(values)
      .then(() => {
        history.push('/');
      })
      .catch((loginErr) => {
        if (loginErr.response) throw new SubmissionError(loginErr.response.data.errors);
        return openErrorModal();
      });
  }

  handleRegister = async (values) => {
    try {
      await axios.post('/users/register', values);
      return this.setState({
        registerSuccess: true,
        activeTab: 'login',
      });
    } catch (registerErr) {
      if (registerErr.response) throw new SubmissionError(registerErr.response.data.errors);
      return openErrorModal();
    }
  }

  handleTabChange = (key) => {
    const { reset } = this.props;
    this.setState({
      registerSuccess: false,
      activeTab: key,
    });
    reset('registerForm');
    reset('loginForm');
  }

  render() {
    const { registerSuccess, activeTab } = this.state;

    const registerAlert = (
      <Alert
        message="You have been succesfuly registered, please login."
        type="success"
        showIcon
      />
    );

    return (
      <Container>

        <Card style={{
          maxWidth: '43rem', margin: '0 auto',
        }}
        >
          {registerSuccess && registerAlert}

          <Tabs
            size="large"
            defaultActiveKey="login"
            activeKey={activeTab}
            tabBarStyle={{
              display: 'flex', justifyContent: 'center',
            }}
            onChange={this.handleTabChange}
          >
            <TabPane tab="Login" key="login">
              <LoginForm handleLogin={this.handleLogin} />
            </TabPane>

            <TabPane tab="Register" key="register">
              <RegisterForm handleRegister={this.handleRegister} />
            </TabPane>
          </Tabs>

          <Divider />

          <List itemLayout="horizontal">
            <List.Item>
              <List.Item.Meta
                avatar={(
                  <Icon component={() => (
                    <svg width="2rem" viewBox={myAdsIcon.viewBox}>
                      <use xlinkHref={myAdsIcon} />
                    </svg>
                  )}
                  />
                  )}
                title="Join the biggest worldwide classifed ads site."
              />
            </List.Item>
            <List.Item>
              <List.Item.Meta
                avatar={(
                  <Icon component={() => (
                    <svg width="2rem" viewBox={postAdIcon.viewBox}>
                      <use xlinkHref={postAdIcon} />
                    </svg>
                  )}
                  />
                  )}
                title="Create and manage your ads."
              />
            </List.Item>
            <List.Item>
              <List.Item.Meta
                avatar={(
                  <Icon component={() => (
                    <svg width="2rem" viewBox={favouritesIcon.viewBox}>
                      <use xlinkHref={favouritesIcon} />
                    </svg>
                  )}
                  />
                  )}
                title="Save your favourite ads to access them whenever you want!"
              />
            </List.Item>
          </List>
        </Card>

      </Container>
    );
  }
}

AuthPage.propTypes = {
  asyncAuthenticateUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  asyncAuthenticateUser,
  reset,
})(AuthPage);
