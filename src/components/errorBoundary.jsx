import PropTypes from 'prop-types';
import React from 'react';
import Logger from 'services/logger';

const { log } = Logger(module.id);

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      errorMessage: error.message,
    };
  }

  componentDidCatch(error, info) {
    log(error, info);
  }

  render() {
    const { children } = this.props;
    const { hasError, errorMessage } = this.state;

    if (hasError) {
      return (
        <h1>
          <div>Something went wrong</div>
          <div>{`Details: ${errorMessage}`}</div>
        </h1>
      );
    }

    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node,
};

ErrorBoundary.defaultProps = {
  children: '',
};

export default ErrorBoundary;
