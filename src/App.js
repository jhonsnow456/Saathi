// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';
//css

<<<<<<< HEAD
import TestMaker from './components/testmaker/TestMaker';

import TEST_LISTENING from './data/TEST_LISTENING';
import Listening from './components/test/Listening/Listening';

import TEST_ISHIHARA from './data/TEST_ISHIHARA';
import Colorblind from './components/test/Colorblind/Colorblind';

import TEST_HANDWRITING from './data/TEST_HANDWRITING';
import Handwriting from './components/test/Handwriting/Handwriting';
=======
>>>>>>> 5f33da5f919ff817a970402dd44c795e4a85b8ab

import './index.css';
import { useState } from 'react';


// ----------------------------------------------------------------------

export default function App() {
  const [email,setEmail]=useState('');
  return (
<<<<<<< HEAD
    // <ThemeConfig>
    //   <ScrollToTop />
    //   <GlobalStyles />
    //   <BaseOptionChartStyle />
    //   <Router email={email} setEmail={setEmail}/>
    // </ThemeConfig>

    // <TestMaker details={TEST_LISTENING.details} questions={TEST_LISTENING.questions.easy} testComponent={Listening}/>
    // <TestMaker details={TEST_ISHIHARA.details}  questions={TEST_ISHIHARA.questions} testComponent={Colorblind}/>
    <TestMaker details={TEST_HANDWRITING.details}  questions={TEST_HANDWRITING.questions} testComponent={Handwriting}/>
    );
=======
    <ThemeConfig>
      <ScrollToTop />
      <GlobalStyles />
      <BaseOptionChartStyle />
      <Router email={email} setEmail={setEmail}/>
    </ThemeConfig>
  );
>>>>>>> 5f33da5f919ff817a970402dd44c795e4a85b8ab
}
