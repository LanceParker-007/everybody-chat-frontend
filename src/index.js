import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { ChakraBaseProvider } from "@chakra-ui/react";

export const server = "http://localhost:5000";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <ChakraBaseProvider>
        <App />
      </ChakraBaseProvider>
    </Router>
  </React.StrictMode>
);
