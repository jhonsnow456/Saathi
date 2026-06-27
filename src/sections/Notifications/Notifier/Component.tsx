import { useEffect, useRef } from 'react';
import { useSnackbar } from 'notistack';

import useNotifications from '../../../store/notifications';

function Notifier() {
  const [notifications, actions] = useNotifications();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const displayed = useRef<string[]>([]);

  const storeDisplayed = (key: string) => {
    displayed.current = [...displayed.current, key];
  };

  const removeDisplayed = (key: string) => {
    displayed.current = [...displayed.current.filter((_key) => key !== _key)];
  };

  useEffect(() => {
    notifications.forEach(({ message, options, dismissed }) => {
      if (dismissed) {
        closeSnackbar(options?.key);
        return;
      }

      if (displayed.current.includes(options?.key || '')) return;

      enqueueSnackbar(message, {
        ...options,
        onExited: () => {
          if (options?.key) {
            actions.remove(options.key);
            removeDisplayed(options.key);
          }
        },
      });

      if (options?.key) {
        storeDisplayed(options.key);
      }
    });
  }, [notifications, actions, enqueueSnackbar, closeSnackbar]);

  return null;
}

export default Notifier;
