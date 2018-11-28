import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import validator from 'validator';
// Components
import { Form, Button } from 'antd';
import FormInput from 'components/common/FormInput/FormInput';

const categoryOptions = [
  {
    key: 'Jobs', text: 'Jobs', value: 1,
  },
  {
    key: 'Services', text: 'Services', value: 2,
  },
  {
    key: 'Pets', text: 'Pets', value: 3,
  },
  {
    key: 'Motors', text: 'Motors', value: 4,
  },
  {
    key: 'Electronics', text: 'Electronics', value: 5,
  },
  {
    key: 'Property', text: 'Property', value: 6,
  },
  {
    key: 'Sport & Hobby', text: 'Sport & Hobby', value: 7,
  },
  {
    key: 'Fashion', text: 'Fashion', value: 8,
  },
];

const isUsedOptions = [
  {
    key: 'Used', text: 'Used', value: 'true',
  },
  {
    key: 'New', text: 'New', value: 'false',
  },
];

const validate = ({
  title, description, category, isUsed, location, price, phone,
}) => {
  const errors = {};

  if (!title) {
    errors.title = 'This field is required';
  }

  if (title && !validator.isLength(title.trim(), {
    min: 5, max: 70,
  })) {
    errors.title = 'Title must be between 5 and 70 characters';
  }

  if (!description) {
    errors.description = 'This field is required';
  }

  if (description && !validator.isLength(description.trim(), {
    min: 20, max: 2000,
  })) {
    errors.description = 'Description must be between 20 and 2000 characters';
  }

  if (!category) {
    errors.category = 'This field is required';
  }

  if (!isUsed) {
    errors.isUsed = 'This field is required';
  }

  if (!location) {
    errors.location = 'This field is required';
  }

  if (location && !validator.isLength(location.trim(), {
    min: 2, max: 20,
  })) {
    errors.location = 'Location must be between 2 and 20 characters';
  }

  if (!price) {
    errors.price = 'This field is required';
  }

  if (price && price <= 0) {
    errors.price = 'Price can not be less or equal 0';
  }

  if (phone && !validator.isMobilePhone(phone, 'pl-PL')) {
    errors.phone = 'Phone is invalid';
  }

  return errors;
};

const CreateAdForm = ({
  handleSubmit, handleCreateAd, valid, pristine, submitting,
}) => (
  <Form onSubmit={handleSubmit(handleCreateAd)}>
    <Field
      name="title"
      component={FormInput}
      placeholder="* Title"
      disabled={submitting}
    />
    <Field
      name="description"
      component={FormInput}
      type="textarea"
      placeholder="* Description"
      disabled={submitting}
    />
    <Field
      name="category"
      component={FormInput}
      type="select"
      options={categoryOptions}
      disabled={submitting}
      placeholder="* Select category"
    />
    <Field
      name="isUsed"
      component={FormInput}
      type="select"
      options={isUsedOptions}
      disabled={submitting}
      placeholder="* Select condition"
    />
    <Field
      name="location"
      component={FormInput}
      placeholder="* Location"
      disabled={submitting}
    />
    <Field
      name="price"
      component={FormInput}
      inputType="number"
      placeholder="* Price"
      disabled={submitting}
    />
    <Field
      name="phone"
      component={FormInput}
      placeholder="Phone"
      disabled={submitting}
    />
    <Field
      name="image"
      component={FormInput}
      type="image"
      disabled={submitting}
      uploadText="Click or drag ad image to this area"
    />
    <Button
      block
      htmlType="submit"
      type="primary"
      icon="check"
      size="large"
      loading={submitting}
      disabled={!valid || pristine || submitting}
    >
      Post an ad
    </Button>
  </Form>
);

CreateAdForm.propTypes = {
  valid: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleCreateAd: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'createAdForm',
  validate,
})(CreateAdForm);
