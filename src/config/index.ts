import { Config, ThemeMode } from '../types';
import isMobile from '../utils/isMobile';

/* set your data here - move these to environment variables in production */
const email = process.env.REACT_APP_AUTHOR_EMAIL || 'support@saathi.app';
const domain = process.env.REACT_APP_DOMAIN || 'saathi.app';
/* ***************** */

const repository = process.env.REACT_APP_REPOSITORY || 'https://github.com/jhonsnow456/Saathi';

const messages = {
  app: {
    crash: {
      title: 'Oops... Something went wrong. You can:',
      options: {
        email: `contact support at ${email}`,
        reset: 'Press here to reset the application',
      },
    },
  },
  loader: {
    fail: 'Hmmmmm, there is something wrong with this component loading process... Maybe trying later would be the best idea',
  },
  images: {
    failed: 'Something went wrong during image loading :(',
  },
  404: 'Hey there? What are you looking for?',
};

const copyright = {
  title: 'Copyright © ',
  link: domain,
};

const themes = {
  light: {
    palette: {
      type: 'light' as const,
      background: {
        default: '#fafafa',
        paper: '#fff',
      },
      primary: {
        light: '#7986cb',
        main: '#3f51b5',
        dark: '#303f9f',
        contrastText: '#fff',
      },
    },
  },

  dark: {
    palette: {
      type: 'dark' as const,
      background: {
        default: '#111',
        paper: '#171717',
      },
      primary: {
        light: '#7986cb',
        main: '#333',
        dark: '#303f9f',
        contrastText: '#fff',
      },
    },
  },
};

const cancelationMessage = 'Operation is manually canceled';

const dateFormat = 'MMMM DD, YYYY';

const title = 'Saathi - Learning Disability Analyser';

const themePair: [ThemeMode, ThemeMode] = ['dark', 'light'];

const notifications = {
  options: {
    anchorOrigin: {
      vertical: 'bottom' as const,
      horizontal: 'left' as const,
    },
    autoHideDuration: 3000,
  },
  maxSnack: isMobile ? 3 : 4,
};

const loader = {
  // no more blinking in your app
  delay: 300, // if your asynchronous process is finished during 300 milliseconds you will not see the loader at all
  minimumLoading: 700, // but if it appears, it will stay for at least 700 milliseconds
};

const giphy404 = 'https://giphy.com/embed/8L0Pky6C83SzkzU55a';

const config: Config = {
  messages,
  cancelationMessage,
  dateFormat,
  copyright,
  email,
  domain,
  repository,
  loader,
  title,
  themePair,
  notifications,
  giphy404,
  themes,
};

export {
  messages,
  cancelationMessage,
  dateFormat,
  copyright,
  email,
  domain,
  repository,
  loader,
  title,
  themePair,
  notifications,
  giphy404,
  themes,
  config,
};
