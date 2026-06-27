import { useCallback, useMemo } from 'react';

import { atom, useRecoilState } from 'recoil';
import { v1 as uuidv1 } from 'uuid';

import { notifications as notificationsDefaults } from '../../config';
import { Notification, NotificationOptions } from '../../types';

interface NotificationWithKey extends Notification {
  dismissed: boolean;
  options: NotificationOptions;
}

const notificationsState = atom<NotificationWithKey[]>({
  key: 'notificationsState',
  default: [],
});

function useNotifications(): [
  NotificationWithKey[],
  {
    push: (notification: Notification) => string;
    close: (key?: string, dismissAll?: boolean) => void;
    remove: (key: string) => void;
  }
] {
  const [notifications, setNotifications] = useRecoilState(notificationsState);

  const push = useCallback((notification: Notification): string => {
    const id = uuidv1();
    setNotifications((prev) => [
      ...prev,
      {
        ...notification,
        dismissed: false,
        options: {
          ...notificationsDefaults.options,
          ...notification.options,
          key: id,
        },
      },
    ]);

    return id;
  }, [setNotifications]);

  const close = useCallback((key?: string, dismissAll = !key): void => {
    setNotifications((prev) =>
      prev.map((notification) =>
        dismissAll || notification.options?.key === key
          ? { ...notification, dismissed: true }
          : { ...notification }
      )
    );
  }, [setNotifications]);

  const remove = useCallback((key: string): void => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.options?.key !== key)
    );
  }, [setNotifications]);

  const actions = useMemo(
    () => ({ push, close, remove }),
    [push, close, remove]
  );

  return [notifications, actions];
}

export default useNotifications;
