import React, { lazy } from 'react';
import { RouteProps } from 'react-router';

const asyncComponentLoader = (
  loadComponent: () => Promise<{ default: React.ComponentType<unknown> }>
) =>
  lazy(() =>
    loadComponent().then((module) => ({
      default: module.default as React.ComponentType<unknown>,
    }))
  );

interface RouteConfig extends RouteProps {
  exact?: boolean;
  path: string;
}

const routes: RouteConfig[] = [
  {
    exact: true,
    component: asyncComponentLoader(() => import('../pages/Welcome')),
    path: '/',
  },
  {
    exact: true,
    component: asyncComponentLoader(() => import('../pages/Page1')),
    path: '/page-1',
  },
  {
    exact: true,
    component: asyncComponentLoader(() => import('../pages/Page2')),
    path: '/page-2',
  },
  {
    exact: true,
    component: asyncComponentLoader(() => import('../pages/Page3')),
    path: '/page-3',
  },
  {
    exact: true,
    component: asyncComponentLoader(() => import('../pages/Page4')),
    path: '/page-4',
  },
];

export default routes;
