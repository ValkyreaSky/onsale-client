import { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class ScrollToTop extends Component {
  componentDidUpdate({ location: prevLocation }) {
    const { location: currentLocation } = this.props;

    if (currentLocation !== prevLocation) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    const { children } = this.props;
    return children;
  }
}

ScrollToTop.propTypes = {
  location: PropTypes.objectOf(PropTypes.any).isRequired,
  children: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default withRouter(ScrollToTop);
