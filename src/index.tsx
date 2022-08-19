import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { setupStore } from "./components/core/redux/store";
import { HashRouter as Router } from "react-router-dom";

import { App } from "./components/App/App";

import "./components/assests/styles/index.scss";

const store = setupStore();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
);
