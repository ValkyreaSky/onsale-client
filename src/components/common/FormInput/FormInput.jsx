import React from 'react';
import PropTypes from 'prop-types';
// Components
import { Form, Input, Upload, Icon, Select } from 'antd';

const FormItem = Form.Item;
const { Dragger } = Upload;
const { Option } = Select;
const { TextArea } = Input;

const FormInput = ({
  inputType, type, placeholder, disabled, input, options, meta: { touched, error }, uploadText,
}) => {
  // Custom image input change function
  const onImageChange = (data) => {
    if (data.fileList.length === 0) {
      input.onChange({});
    } else {
      input.onChange(data.fileList[0].originFileObj);
    }
  };

  let render;

  if (type === 'select') {
    render = (
      <Select
        {...input}
        value={input.value || undefined}
        disabled={disabled}
        placeholder={placeholder}
      >
        {options.map(option => (
          <Option key={option.key} value={option.value}>{option.text}</Option>
        ))}
      </Select>
    );
  }

  if (type === 'image') {
    render = (
      <Dragger
        listType="picture"
        beforeUpload={() => false}
        onChange={onImageChange}
        multiple={false}
        disabled={disabled}
      >
        <p className="ant-upload-drag-icon">
          <Icon type="inbox" />
        </p>
        <p className="ant-upload-text">{uploadText}</p>
      </Dragger>
    );
  }

  if (type === 'textarea') {
    render = (
      <TextArea
        {...input}
        rows={4}
        placeholder={placeholder}
        disabled={disabled}
      />
    );
  }

  if (type === 'input') {
    render = (
      <Input
        {...input}
        type={inputType}
        placeholder={placeholder}
        disabled={disabled}
      />
    );
  }

  return (
    <FormItem
      hasFeedback
      validateStatus={touched && !!error ? 'error' : ''}
      help={touched && !!error && `${error}`}
    >
      {render}
    </FormItem>
  );
};

FormInput.defaultProps = {
  disabled: false,
  options: [],
  type: 'input',
  inputType: 'text',
  placeholder: '',
  uploadText: 'Click or drag file to this area to upload',
};

FormInput.propTypes = {
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  inputType: PropTypes.string,
  input: PropTypes.objectOf(PropTypes.any).isRequired,
  meta: PropTypes.objectOf(PropTypes.any).isRequired,
  options: PropTypes.arrayOf(PropTypes.any),
  type: PropTypes.string,
  uploadText: PropTypes.string,
};

export default FormInput;
