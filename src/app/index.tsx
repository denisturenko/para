'use strict';

import React, { memo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Playground } from 'pages/playground';
import './index.css';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';

import { YMInitializer } from 'react-yandex-metrika';
import { modalsConfig, ymCounterId } from 'shared/lib/configs';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { Home } from 'pages/home';
import { Visibility, VisibilityWrapper } from 'shared/ui/visibility';
import { GuardRedirect } from 'shared/ui/guard-redirect/guard-redirect.component';
import { playgroundGuard } from 'app/guards';
import { Greetings } from 'pages/greetings';
import { urls } from 'entities/lib/config';

const Root = memo(() => {
  const [isVisiblePlaygroundContent, setIsVisiblePlaygroundContent] = useState();

  const playgroundWrapper = (
    <VisibilityWrapper isVisible={isVisiblePlaygroundContent}>
      <Playground />
    </VisibilityWrapper>
  );

  const playgroundSwitcher = (
    <GuardRedirect guard={playgroundGuard}>
      <Visibility onVisible={setIsVisiblePlaygroundContent} />
    </GuardRedirect>
  );

  return (
    <React.StrictMode>
      <YMInitializer accounts={[ymCounterId]} options={{ clickmap: true, trackLinks: true, accurateTrackBounce: true, webvisor: true }} />
      <MantineProvider defaultColorScheme="dark">
        <ModalsProvider modals={modalsConfig}>
          <Router>
            {playgroundWrapper}

            {/* game route */}
            <Switch>
              <Route path={urls.GAME}>
                <Switch>
                  <Route path={urls.GAME_GREETING}>
                    <Greetings />
                  </Route>
                  <Route>{playgroundSwitcher}</Route>
                </Switch>
              </Route>
              <Route path={urls.ROOT}>
                <Home />
              </Route>
            </Switch>
          </Router>
        </ModalsProvider>
      </MantineProvider>
    </React.StrictMode>
  );
});

Root.displayName = 'Root';

createRoot(document.getElementById('root')).render(<Root />);
