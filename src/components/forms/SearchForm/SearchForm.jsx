import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
// Components
import { Form, Button, Row, Col } from 'antd';
import FormInput from 'components/common/FormInput/FormInput';

const FormItem = Form.Item;

const validate = ({ maxPrice, minPrice }) => {
  const errors = {};

  if (minPrice < 0) {
    errors.minPrice = 'Price can not be less than 0';
  }
  if (maxPrice < 0) {
    errors.maxPrice = 'Price can not be less than 0';
  }

  return errors;
};

const SearchForm = ({
  handleSubmit, valid, pristine, handleSearch,
}) => (
  <Form
    // layout="inline"
    onSubmit={handleSubmit(handleSearch)}
  >
    <Row gutter={4}>
      <Col
        xs={{
          span: 24,
        }}
        lg={{
          span: 8,
        }}
      >
        <Field
          name="title"
          component={FormInput}
          placeholder="Title"
          label="Title"
          style={{
            width: '100%',
          }}
        />
      </Col>
      <Col
        xs={{
          span: 10,
        }}
        lg={{
          span: 8,
        }}
      >
        <Field
          name="location"
          component={FormInput}
          placeholder="Location"
          label="Location"
        />
      </Col>
      <Col
        xs={{
          span: 7,
        }}
        lg={{
          span: 4,
        }}
      >
        <FormItem>
          <Button
            block
            htmlType="submit"
            type="primary"
            icon="search"
            disabled={!valid || pristine}
          >
        Find
          </Button>
        </FormItem>
      </Col>
      <Col
        xs={{
          span: 7,
        }}
        lg={{
          span: 4,
        }}
      >
        <Link to="/advanced">
          <FormItem>
            <Button
              block
              type="dashed"
              icon="setting"
            >
              More
            </Button>
          </FormItem>
        </Link>
      </Col>
    </Row>
  </Form>
);

SearchForm.propTypes = {
  valid: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'searchForm',
  validate,
})(SearchForm);
