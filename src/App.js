// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';
//css
import './index.css';
import { useState } from 'react';

// ----------------------------------------------------------------------

export default function App() {
  const [email,setEmail]=useState('');
  return (
    <ThemeConfig>
      <ScrollToTop />
      <GlobalStyles />
      <BaseOptionChartStyle />
      <Router email={email} setEmail={setEmail}/>
    </ThemeConfig>
  );
}
