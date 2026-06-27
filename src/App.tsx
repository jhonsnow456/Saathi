import React from 'react';
import { RecoilRoot as RecoilRootBase } from 'recoil';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from './theme';
import Layout from './sections/Layout';
import { BrowserRouter as Router } from 'react-router-dom';

// Workaround for Recoil typing
const RecoilRoot = RecoilRootBase as React.ComponentType<{children?: React.ReactNode}>;

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

export default App;
