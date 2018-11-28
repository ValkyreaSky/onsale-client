import { Modal } from 'antd';

export default () => Modal.error({
  title: 'An Unexpected Error Occurred',
  content: 'We apologize for this. We’re working quickly to fix it as soon as possible.',
});
