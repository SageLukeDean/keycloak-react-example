import Logger from 'services/logger';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

const { log } = Logger(module.id);

class Hello extends PureComponent {
  render() {
    log('rendering');
    const { name, refreshExp, token, tokenExp } = this.props;
    return (
      <React.Fragment>
        <p>
          {'Hello '}
          {name}
        </p>
        <p>
          {'Your access token is: '}
          <code>{token}</code>
        </p>
        <p>
          {'It expires at '}
          {tokenExp}
        </p>
        <p>
          {'You can use your refreshToken to get a new one until '}
          {refreshExp}
        </p>
      </React.Fragment>
    );
  }
}

Hello.propTypes = {
  name: PropTypes.string,
  refreshExp: PropTypes.string,
  token: PropTypes.string,
  tokenExp: PropTypes.string,
};

Hello.defaultProps = {
  name: '',
  refreshExp: '',
  token: '',
  tokenExp: '',
};

export default Hello;
