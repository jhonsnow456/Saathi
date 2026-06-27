/* eslint-disable @typescript-eslint/no-explicit-any */
import { atom, useRecoilState } from 'recoil';

import noop from '../../utils/noop';
import effects from './effects';

interface SWState {
  isInitialized: boolean;
  isUpdated: boolean;
  registration: ServiceWorkerRegistration | null;
}

interface SWActions {
  handleSuccess: () => void;
  handleUpdate: (registration: ServiceWorkerRegistration) => void;
  update: () => void;
}

// Global state for service worker actions
const swActions: Omit<SWActions, 'update'> = {
  handleSuccess: noop,
  handleUpdate: noop,
};

function getActions() {
  return swActions;
}

const swState = atom<SWState>({
  key: 'swState',
  default: {
    isInitialized: false,
    isUpdated: false,
    registration: null,
  },
});

function useSW(): [SWState, SWActions] {
  const [sw, setSW] = useRecoilState(swState);

  function handleSuccess(): void {
    setSW((currentState) => ({ ...currentState, isInitialized: true }));
    swActions.handleSuccess();
  }

  function handleUpdate(registration: ServiceWorkerRegistration): void {
    setSW((currentState) => ({ ...currentState, isUpdated: true }));
    swActions.handleUpdate(registration);
    effects.storeRegistration(registration);
  }

  function update(): void {
    effects.update();
  }

  return [sw, { handleSuccess, handleUpdate, update }];
}

export { getActions };
export default useSW;
