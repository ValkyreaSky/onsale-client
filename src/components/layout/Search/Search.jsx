import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
// Components
import Container from 'components/layout/Container/Container';
import SearchForm from 'components/forms/SearchForm/SearchForm';

class Search extends Component {
  handleSearch = (values) => {
    const { history } = this.props;
    // Create search query
    const query = Object.keys(values).map(field => `${field}=${values[field]}`);
    // Redirect user to the search page with query in the URL
    history.push(`/search?${query.join('&')}`);
  }

  render() {
    return (
      <Container>
        <SearchForm handleSearch={this.handleSearch} />
      </Container>
    );
  }
}

Search.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withRouter(Search);
