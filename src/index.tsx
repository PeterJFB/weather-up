import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";

const WeatherUpTheme = extendTheme({
  semanticTokens: {
    colors: {
      error: "red.500",
      success: "green.500",
      primary: {
        default: "blue.500",
        _dark: "blue.400",
      },
      secondary: {
        default: "blue.50",
        _dark: "blue.50",
      },
    },
  },
  fonts: {
    // heading: `'Lato', sans-serif`,
    // body: `'Lato', sans-serif`,
    // heading: `'Nunito', sans-serif`,
    // body: `'Nunito', sans-serif`,
    heading: `'Spline Sans Mono', monospace`,
    body: `'Spline Sans Mono', monospace`,
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={WeatherUpTheme}>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
navigator.serviceWorker.register("./worker.js");
