// selectors
// For use with the redux-saga select effect.
// Note that these get the full state, not just our slice of it.

// The current instance of keycloak, as known to redux.
export const selectKeycloak = state => state.auth.keycloak;

// httpClient calls should not use this selector!
// Use ./authToken instead to ensure sending a fresh token!
export const selectAuthToken = state => state.auth.keycloak.token;
