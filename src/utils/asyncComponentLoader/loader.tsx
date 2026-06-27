/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Suspense, useState, useEffect, lazy, ComponentType } from 'react';

import sleep from '../../utils/sleep';

const getDelayedFallback = (
  Fallback: ComponentType<any>,
  delay: number
) => (props: any): React.ReactElement | null => {
  const [isDelayPassed, setIsDelayPassed] = useState(false);

  useEffect(() => {
    const timerId = setTimeout(() => setIsDelayPassed(true), delay);
    return () => clearTimeout(timerId);
  }, [delay]);

  return isDelayPassed ? <Fallback {...props} /> : null;
};

interface LoaderOptions {
  delay: number;
  minimumLoading: number;
}

const getLazyComponent = (
  loadComponent: () => Promise<any>,
  loaderOptions: LoaderOptions,
  FallbackFail: ComponentType<any>
) =>
  lazy(() => {
    const start = performance.now();
    return loadComponent()
      .then((moduleExports: any) => {
        const end = performance.now();
        const diff = end - start;

        const { delay, minimumLoading } = loaderOptions;

        if (diff < delay || (diff > delay && diff > delay + minimumLoading)) {
          return moduleExports;
        } else {
          return sleep(delay + minimumLoading - diff).then(() => moduleExports);
        }
      })
      .catch(() => ({ default: FallbackFail }));
  });

function asyncComponentLoader(
  loadComponent: () => Promise<any>,
  loaderOptions: LoaderOptions,
  FallbackWaiting: ComponentType<any>,
  FallbackFail: ComponentType<any>
) {
  const Fallback = loaderOptions.delay
    ? getDelayedFallback(FallbackWaiting, loaderOptions.delay)
    : FallbackWaiting;

  const LazyComponent = getLazyComponent(loadComponent, loaderOptions, FallbackFail);

  return function AsyncComponent(props: any) {
    return (
      <Suspense fallback={<Fallback {...props} />}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}

export { getDelayedFallback };
export default asyncComponentLoader;
