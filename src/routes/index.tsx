import React, { lazy, Suspense } from 'react';
import { RouteProps } from 'react-router';
import Loading from '../components/Loading';

const asyncComponentLoader = (loadComponent) => {
  const LazyComponent = lazy(loadComponent);
  return (props) => (
    <Suspense fallback={<Loading />}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

interface RouteConfig extends RouteProps {
  exact?: boolean;
  path: string;
}

const routes = [
  { exact: true, component: asyncComponentLoader(() => import('../pages/Welcome')), path: '/' },
  { exact: true, component: asyncComponentLoader(() => import('../pages/Page1')), path: '/page-1' },
  { exact: true, component: asyncComponentLoader(() => import('../pages/Page2')), path: '/page-2' },
  { exact: true, component: asyncComponentLoader(() => import('../pages/Page3')), path: '/page-3' },
  { exact: true, component: asyncComponentLoader(() => import('../pages/Page4')), path: '/page-4' },
];

export default routes;
