// import Logger from 'services/logger';
import { connect } from 'react-redux';
import Hello from './component';

// const { log } = Logger(module.id);

export const mapStateToProps = state => ({
  name: state.auth.keycloak && state.auth.keycloak.tokenParsed.name,
  refreshExp:
    state.auth.keycloak &&
    new Date(state.auth.keycloak.refreshTokenParsed.exp * 1000).toString(),
  token: state.auth.keycloak && state.auth.keycloak.token,
  tokenExp:
    state.auth.keycloak &&
    new Date(state.auth.keycloak.tokenParsed.exp * 1000).toString(),
});

export default connect(mapStateToProps)(Hello);
