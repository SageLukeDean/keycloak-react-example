// import Logger from 'services/logger';
import { connect } from 'react-redux';
import { requestLogout as logoutAction } from 'ducks/auth';
import Logout from './component';

// const { log } = Logger(module.id);

export const mapDispatchToProps = dispatch => ({
  onClick() {
    dispatch(logoutAction());
  },
});

export default connect(
  null, // mapStateToProps,
  mapDispatchToProps
)(Logout);
