'use strict';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { Game } from 'pages/game';
import './index.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Game />
  </React.StrictMode>
);
