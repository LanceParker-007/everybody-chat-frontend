import { ColorModeScript } from '@chakra-ui/react';
import React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { ChatContextProvider } from './Context/ChatProvider';
import { BrowserRouter as Router } from 'react-router-dom';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <Router>
    <ChatContextProvider>
      <ChakraProvider theme={theme}>
        <ColorModeScript />
        <App />
      </ChakraProvider>
    </ChatContextProvider>
  </Router>
);

export const server = 'http://localhost:5000';
