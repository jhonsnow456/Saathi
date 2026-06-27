/* eslint-disable @typescript-eslint/no-explicit-any */
import resetApp from '../../../utils/resetApp';

interface SWState {
  registration: ServiceWorkerRegistration | null;
}

// Using any for state-local since it doesn't have types
const state = (window as any).__STATE_LOCAL__ || {};
const getSW = () => state as SWState;
const setSW = (newState: Partial<SWState>) => {
  Object.assign(state, newState);
};

function update(): void {
  const sw = getSW();
  const registrationWaiting = sw.registration?.waiting;

  if (registrationWaiting) {
    registrationWaiting.postMessage({ type: 'SKIP_WAITING' });
    registrationWaiting.onstatechange = function (e: Event) {
      const target = e.target as ServiceWorker;
      if (target.state === 'activated') {
        resetApp();
      }
    };
  }
}

function storeRegistration(registration: ServiceWorkerRegistration): void {
  setSW({ registration });
}

const effects = { update, storeRegistration };

export default effects;
