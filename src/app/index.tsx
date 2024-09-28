'use strict';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { Playground } from 'pages/playground';
import './index.css';

import { ConfigProvider, theme } from 'antd';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#173D71',
          colorPrimaryBorder: '#173D71',
          handleActiveColor: 'red',
        },

        // 1. Use dark algorithm
        algorithm: theme.darkAlgorithm,

        // 2. Combine dark algorithm and compact algorithm
        // algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
      }}
    >
      <Playground />
    </ConfigProvider>
  </React.StrictMode>
);
