import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';
import axios from 'axios';
// Components
import Container from 'components/layout/Container/Container';
import { Button, notification, Divider, Card, Modal } from 'antd';
import UpdateUserForm from 'components/forms/UpdateUserForm/UpdateUserForm';
import FormTitle from 'components/common/FormTitle/FormTitle';
// Images
import settingsIcon from 'assets/navigation-icons/icon-settings.svg';
// Actions
import { authenticateUser, logoutUser } from 'store/actions/auth';
// Utils
import changePageTitle from 'utils/changePageTitle';

const { confirm } = Modal;

class SettingsPage extends Component {
  componentWillMount() {
    changePageTitle('Account settings');
  }

  handleShowProfileDeleteConfirm = () => {
    const { logoutUser, history } = this.props;
    confirm({
      title: 'Are you sure you want to delete your account?',
      content: 'This action cannot be undone!',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      async onOk() {
        try {
          await axios.delete('/users');
          logoutUser().then(() => history.push('/'));
        } catch (error) {
          console.log(error);
        }
      },
    });
  };

  handleOpenProfileUpdateNotification = () => {
    notification.success({
      message: 'Success!',
      description: 'Your profile has been updated!',
    });
  };

  handleSendUpdateUserRequest = async (values, isMultipart = false) => {
    const { authenticateUser } = this.props;
    try {
      await axios.patch('/users', values, {
        headers: {
          'content-type': isMultipart ? 'multipart/form-data' : 'application/json',
        },
      })
        .then((response) => {
          // Update user data in Redux store
          authenticateUser({
            id: response.data._id,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            email: response.data.email,
            phone: response.data.phone,
            image: response.data.image,
          });
          // After udpate redirect user to the homepage
          this.handleOpenProfileUpdateNotification();
        });
    } catch (err) {
      console.log(err);
      throw new SubmissionError(err.response.data.errors);
    }
  }

  handleUpdateUser = async (values) => {
    if (values.image && values.image.file) {
      const formData = new FormData();
      // Create multipart/form-data
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });
      return this.handleSendUpdateUserRequest(formData, true);
    }
    return this.handleSendUpdateUserRequest(values);
  }

  render() {
    const { user: { firstName, lastName, phone } } = this.props;
    return (
      <Container>
        <Card style={{
          maxWidth: 600,
          margin: '0 auto',
        }}
        >
          <FormTitle
            icon={settingsIcon}
            text="Settings"
          />
          <UpdateUserForm
            initialValues={{
              firstName,
              lastName,
              phone: phone || '',
            }}
            handleUpdateUser={this.handleUpdateUser}
          />
          <Divider />
          <Button
            block
            size="large"
            type="danger"
            onClick={this.handleShowProfileDeleteConfirm}
          >
            Delete account
          </Button>
        </Card>
      </Container>
    );
  }
}

SettingsPage.propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  authenticateUser,
  logoutUser,
})(SettingsPage);
