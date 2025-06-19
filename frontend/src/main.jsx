import React from 'react';
import ReactDOM from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css'; 
import App from './App.jsx';
import { PortfolioProvider } from './context/PortfolioContext.jsx';
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import { theme } from './theme'; 


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MantineProvider 
      theme={theme} 
      defaultColorScheme='dark'
    >
      <Notifications />
      <PortfolioProvider>
        <App />
      </PortfolioProvider>
    </MantineProvider>
  </React.StrictMode>,
);