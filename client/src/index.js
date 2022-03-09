import React, { Suspense } from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { reducers } from "./reducers";
import "./index.css";
import { i18n } from "./i18next.config";
import App from "./App";

i18n();
const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDom.render(
  <Provider store={store}>
    <Suspense fallback={<></>}>
      <App />
    </Suspense>
  </Provider>,
  document.getElementById("root")
);
