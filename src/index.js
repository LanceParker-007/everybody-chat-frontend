import { ColorModeScript } from '@chakra-ui/react';
import React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { ChatContextProvider } from './Context/ChatProvider';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <ChatContextProvider>
    <ChakraProvider theme={theme}>
      <ColorModeScript />
      <App />
    </ChakraProvider>
  </ChatContextProvider>
);

export const server = 'http://localhost:5000';
