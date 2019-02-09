// import Logger from 'services/logger';
import { connect } from 'react-redux';
import { requestAuth as authorizeAction } from 'ducks/auth';
import Auth from './component';

// const { log } = Logger(module.id);

export const mapDispatchToProps = dispatch => ({
  authorize() {
    dispatch(authorizeAction());
  },
});

export default connect(
  null, // mapStateToProps,
  mapDispatchToProps
)(Auth);
