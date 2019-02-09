import React from 'react';
import Logger from 'services/logger';
import Auth from 'components/auth';
import ErrorBoundary from 'components/errorBoundary';
import Hello from 'components/hello';
import Logout from 'components/logout';

const { log } = Logger(module.id);

function Layout() {
  log('rendering');
  return (
    <div>
      <ErrorBoundary>
        <Auth />
        <Hello />
        <div>
          <Logout />
        </div>
      </ErrorBoundary>
    </div>
  );
}

export default Layout;
