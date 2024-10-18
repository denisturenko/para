'use strict';

import React, { memo } from 'react';
import { createRoot } from 'react-dom/client';
import { Playground } from 'pages/playground';
import './index.css';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';

import { YMInitializer } from 'react-yandex-metrika';
import { modalsConfig, ymCounterId } from 'shared/lib/configs';

const Root = memo(() => (
  <React.StrictMode>
    <YMInitializer accounts={[ymCounterId]} options={{ clickmap: true, trackLinks: true, accurateTrackBounce: true, webvisor: true }} />
    <MantineProvider defaultColorScheme="dark">
      <ModalsProvider modals={modalsConfig}>
        <Playground />
      </ModalsProvider>
    </MantineProvider>
  </React.StrictMode>
));

Root.displayName = 'Root';

createRoot(document.getElementById('root')).render(<Root />);
