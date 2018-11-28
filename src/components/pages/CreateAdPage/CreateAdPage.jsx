import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';
import axios from 'axios';
// Components
import Container from 'components/layout/Container/Container';
import { Card } from 'antd';
import CreateAdForm from 'components/forms/CreateAdForm/CreateAdForm';
import FormTitle from 'components/common/FormTitle/FormTitle';
// Images
import postAdIcon from 'assets/navigation-icons/icon-post-ad.svg';
// Utils
import changePageTitle from 'utils/changePageTitle';

class CreateAdPage extends Component {
  componentWillMount() {
    changePageTitle('Create new ad');
  }

  handleSendCreateAdRequest = async (values, isMultipart = false) => {
    const { history } = this.props;
    try {
      const { data: { _id: createdAdId } } = await axios.post('/ads', values, {
        headers: {
          'content-type': isMultipart ? 'multipart/form-data' : 'application/json',
        },
      });
      // After creation redirect user to newly created ad page
      history.push(`/ad/${createdAdId}`);
    } catch (createAdErr) {
      throw new SubmissionError(createAdErr.response.data.errors);
    }
  }

  handleCreateAd = (values) => {
    if (values.image && values.image.file) {
      const formData = new FormData();
      // Create multipart/form-data
      Object.keys(values).forEach((key) => {
        if (key === 'image') {
          formData.append(key, values[key].file);
        } else {
          formData.append(key, values[key]);
        }
      });
      return this.handleSendCreateAdRequest(formData, true);
    }
    return this.handleSendCreateAdRequest(values);
  }

  render() {
    const { user: { phone } } = this.props;

    return (
      <Container>
        <Card style={{
          maxWidth: 600,
          margin: '0 auto',
        }}
        >
          <FormTitle
            icon={postAdIcon}
            text="Post an ad"
          />
          <CreateAdForm
            initialValues={{
              phone,
            }}
            handleCreateAd={this.handleCreateAd}
          />
        </Card>
      </Container>
    );
  }
}

CreateAdPage.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps)(CreateAdPage);
