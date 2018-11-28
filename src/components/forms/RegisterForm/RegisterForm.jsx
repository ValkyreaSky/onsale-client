import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import validator from 'validator';
// Components
import { Button, Form } from 'antd';
import FormInput from 'components/common/FormInput/FormInput';

const validate = ({
  firstName, lastName, email, password, passwordConfirmation,
}) => {
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

  if (!passwordConfirmation) {
    errors.passwordConfirmation = 'Password confirmation is required';
  }

  if (password && passwordConfirmation && (password !== passwordConfirmation)) {
    errors.passwordConfirmation = 'Passwords must be the same';
  }

  return errors;
};

const RegisterForm = ({
  handleSubmit, valid, handleRegister, submitting, pristine,
}) => (
  <Form onSubmit={handleSubmit(handleRegister)}>
    <Field
      name="firstName"
      component={FormInput}
      placeholder="* First name"
      label="First name"
      disabled={submitting}
    />
    <Field
      name="lastName"
      component={FormInput}
      placeholder="* Last name"
      label="Last name"
      disabled={submitting}
    />
    <Field
      name="email"
      component={FormInput}
      placeholder="* Email address"
      label="Email address"
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
      name="password"
      component={FormInput}
      inputType="password"
      placeholder="* Password"
      label="Password"
      disabled={submitting}
    />
    <Field
      name="passwordConfirmation"
      component={FormInput}
      inputType="password"
      placeholder="* Password confirmation"
      label="Password confirmation"
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
      Register
    </Button>
  </Form>
);

RegisterForm.propTypes = {
  valid: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleRegister: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'registerForm',
  validate,
})(RegisterForm);
