'use strict';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { Playground } from 'pages/playground';
import './index.css';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MantineProvider defaultColorScheme="dark">
      <Playground />
    </MantineProvider>
  </React.StrictMode>
);
