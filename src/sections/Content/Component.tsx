import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Page from '../../components/Page';
import routes from '../../routes';

function Content() {
  return (
    <Page>
      <Switch>
        {routes.map((route) => (
          <Route {...route} key={route.path || '#'} />
        ))}
      </Switch>
    </Page>
  );
}

export default Content;
