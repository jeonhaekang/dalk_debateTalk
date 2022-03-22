import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./shared/App";
import reportWebVitals from "./reportWebVitals";

// router
import { BrowserRouter } from "react-router-dom";

// store
import { Provider } from "react-redux";
import store from "./redux/configStore";
import { ThemeProvider } from "styled-components";

// theme
import theme from "./styles/theme";

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div className="container">
          <div className="wrap" id="globalPortal">
            <App />
          </div>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
