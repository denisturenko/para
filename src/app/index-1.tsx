'use strict';

import type { PropsWithChildren } from 'react';
import React, { memo, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
// import { Playground } from 'pages/playground';
import './index.css';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';

import { YMInitializer } from 'react-yandex-metrika';
import { modalsConfig, ymCounterId } from 'shared/lib/configs';

import { Route, BrowserRouter as Router, Switch, Link } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { Home } from 'pages/home';
import { Visibility, VisibilityWrapper } from 'shared/ui/visibility';

const MyApp = () => {
  const [isVisiblePlaygroundContent, setIsVisiblePlaygroundContent] = useState();

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/game/greeting">Greeting</Link>&nbsp;
              <Link to="/game">Game</Link>&nbsp;
              <Link to="/game/intro">Intro</Link>&nbsp;
              <Link to="/game/settings">Settings</Link>&nbsp;
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>

        <VisibilityWrapper isVisible={isVisiblePlaygroundContent}>
          <h2>Game APP</h2>
        </VisibilityWrapper>

        <Switch>
          <Route path="/game">
            <Switch>
              <Route path="/game/greeting">
                <h2>Greeting</h2>
              </Route>
              <Route>
                <Visibility onVisible={setIsVisiblePlaygroundContent} />
                <Switch>
                  <Route path="/game/intro">
                    <h2>Intro</h2>
                  </Route>
                  <Route path="/game/settings">
                    <h2>Settings</h2>
                  </Route>
                </Switch>
              </Route>
            </Switch>
          </Route>
          <Route path="/users">
            <h2>Users</h2>
          </Route>
          <Route path="/">
            <h2>Home</h2>
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

const Root = memo(() => (
  <React.StrictMode>
    <MyApp />
  </React.StrictMode>
));

Root.displayName = 'Root';

createRoot(document.getElementById('root')).render(<Root />);
