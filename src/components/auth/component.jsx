import Logger from 'services/logger';
import PropTypes from 'prop-types';
import { PureComponent } from 'react';

const { log } = Logger(module.id);

class Auth extends PureComponent {
  componentDidMount() {
    const { authorize } = this.props;
    authorize();
  }

  render() {
    log('rendering');
    const { error } = this.props;
    if (error) {
      throw Error('Error in Auth'); // The ErrorBoundary will take over now.
    }
    return null; // It's invisible
  }
}

Auth.propTypes = {
  authorize: PropTypes.func.isRequired,
  error: PropTypes.bool,
};

Auth.defaultProps = {
  error: false,
};

export default Auth;
