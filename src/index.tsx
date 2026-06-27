import * as serviceWorker from './serviceWorker';

import { getActions } from './store/sw';

import './global.css';

declare const document: Document & { ie?: boolean };

if (!document.ie) {
  Promise.all([
    import('react'),
    import('react-dom'),
    import('./App'),
  ]).then(([{ default: React }, { default: ReactDOM }, { default: App }]) => {
    ReactDOM.render(<App />, document.getElementById('root'));
  });

  serviceWorker.register({
    onSuccess: () => getActions().handleSuccess(),
    onUpdate: (reg: ServiceWorkerRegistration) => getActions().handleUpdate(reg),
  });
}
