import React from 'react';
import Logger from 'services/logger';
import Auth from 'components/auth';
import ErrorBoundary from 'components/errorBoundary';

const { log } = Logger(module.id);

function Layout() {
  log('rendering');
  return (
    <div>
      <ErrorBoundary>
        <Auth />
        Hi
      </ErrorBoundary>
    </div>
  );
}

export default Layout;
