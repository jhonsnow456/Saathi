import React from 'react';
import { RecoilRoot as RecoilRootBase } from 'recoil';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from './theme';

import { withErrorHandler } from './errorHandling';
import AppErrorBoundaryFallback from './errorHandling/Fallbacks/App/Component';
import Layout from './sections/Layout';

import { BrowserRouter as Router } from 'react-router-dom';

// RecoilRoot with proper typing
const RecoilRoot = RecoilRootBase as React.ComponentType<{ children?: React.ReactNode }>;

function App() {
  return (
    <RecoilRoot>
      <ThemeProvider>
        <CssBaseline />
        <Router>
          <Layout />
        </Router>
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default withErrorHandler(App, AppErrorBoundaryFallback);
