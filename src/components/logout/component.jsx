import Logger from 'services/logger';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

const { log } = Logger(module.id);

class Logout extends PureComponent {
  render() {
    log('rendering');
    const { error, onClick } = this.props;
    if (error) {
      throw Error('Error in Logout'); // The ErrorBoundary will take over now.
    }
    return (
      <button type="button" onClick={onClick}>
        Log out
      </button>
    );
  }
}

Logout.propTypes = {
  onClick: PropTypes.func.isRequired,
  error: PropTypes.bool,
};

Logout.defaultProps = {
  error: false,
};

export default Logout;
