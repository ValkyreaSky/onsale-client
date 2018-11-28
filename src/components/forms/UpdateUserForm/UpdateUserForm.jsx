import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import validator from 'validator';
// Components
import { Button, Form } from 'antd';
import FormInput from 'components/common/FormInput/FormInput';

const validate = ({ firstName, lastName, phone }) => {
  const errors = {};

  if (!firstName) {
    errors.firstName = 'First name is required';
  }

  if (firstName && !validator.isLength(firstName, {
    min: 2, max: 15,
  })) {
    errors.firstName = 'First name must be between 2 and 15 characters';
  }

  if (!lastName) {
    errors.lastName = 'Last name is required';
  }

  if (lastName && !validator.isLength(lastName, {
    min: 2, max: 20,
  })) {
    errors.lastName = 'Last name must be between 2 and 20 characters';
  }

  if (phone && !validator.isMobilePhone(phone, 'pl-PL')) {
    errors.phone = 'Phone is invalid';
  }

  return errors;
};


const CreateAdForm = ({
  handleSubmit, handleUpdateUser, valid, pristine, submitting,
}) => (
  <Form onSubmit={handleSubmit(handleUpdateUser)}>
    <Field
      name="firstName"
      component={FormInput}
      placeholder="First name"
      label="First name"
      disabled={submitting}
    />
    <Field
      name="lastName"
      component={FormInput}
      placeholder="Last name"
      label="Last name"
      disabled={submitting}
    />
    <Field
      name="phone"
      component={FormInput}
      placeholder="Phone"
      label="Phone"
      disabled={submitting}
    />
    <Field
      name="image"
      component={FormInput}
      type="image"
      label="Image"
      disabled={submitting}
      uploadText="Click or drag new profile image to this area"
    />
    <Button
      block
      type="primary"
      icon="check"
      size="large"
      loading={submitting}
      htmlType="submit"
      disabled={!valid || pristine || submitting}
    >
      Update profile
    </Button>
  </Form>
);

CreateAdForm.propTypes = {
  valid: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleUpdateUser: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'updateUserForm',
  validate,
})(CreateAdForm);
