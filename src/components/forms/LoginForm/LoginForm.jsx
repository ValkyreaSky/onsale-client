import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import validator from 'validator';
// Components
import { Button, Form } from 'antd';
import FormInput from 'components/common/FormInput/FormInput';

const validate = ({ email, password }) => {
  const errors = {};

  if (!email) {
    errors.email = 'Email is required';
  }

  if (email && !validator.isEmail(email)) {
    errors.email = 'Email format is invalid';
  }

  if (!password) {
    errors.password = 'Password is required';
  }

  if (password && !validator.isLength(password, {
    min: 4, max: 32,
  })) {
    errors.password = 'Password must be between 4 and 32 characters';
  }

  return errors;
};

const LoginForm = ({
  handleSubmit, valid, handleLogin, submitting, pristine,
}) => (
  <Form onSubmit={handleSubmit(handleLogin)}>
    <Field
      name="email"
      component={FormInput}
      inputType="email"
      placeholder="* Email address"
      label="Email address"
      disabled={submitting}
    />
    <Field
      name="password"
      component={FormInput}
      inputType="password"
      placeholder="* Password"
      label="Password"
      disabled={submitting}
    />
    <Button
      block
      type="primary"
      icon="check"
      size="large"
      loading={submitting}
      htmlType="submit"
      disabled={!valid || submitting || pristine}
    >
      Login
    </Button>
  </Form>
);

LoginForm.propTypes = {
  valid: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'loginForm',
  validate,
})(LoginForm);
