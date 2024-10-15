'use strict';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { Playground } from 'pages/playground';
import './index.css';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { YMInitializer } from 'react-yandex-metrika';
import { ymCounterId } from 'shared/lib/configs';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <YMInitializer accounts={[ymCounterId]} options={{ clickmap: true, trackLinks: true, accurateTrackBounce: true, webvisor: true }} />
    <MantineProvider defaultColorScheme="dark">
      <Playground />
    </MantineProvider>
  </React.StrictMode>
);
