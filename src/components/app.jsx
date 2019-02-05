import '@babel/polyfill'; // webpack will transform this into specific imports.  See .babelrc presets useBuiltIns.
import { render } from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import store from 'services/configureStore';
import Logger from 'services/logger';

import Layout from 'components/layout';

const { log } = Logger(module.id);

export default function App() {
  log('rendering');
  return (
    <Provider store={store}>
      <Layout />
    </Provider>
  );
}

render(<App />, document.getElementById('root'));
