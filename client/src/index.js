import React, { Suspense } from "react";
import ReactDom from "react-dom";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { reducers } from "./reducers";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { arEG } from "@material-ui/core/locale";
import "./index.css";
import App from "./App";

i18next
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ["en", "ar"],
    fallbackLng: "en",
    detection: {
      order: ["cookie", "htmlTag", "path", "localStorage"],
      caches: ["cookie", "localStorage"],
    },
    backend: {
      loadPath: "/assets/locales/{{lng}}/translation.json",
    },
  });

const loadingMarkup = (
  <div className="py-4 text-center">
    <h3>Loading..</h3>
  </div>
);

const theme = createTheme(
  {
    palette: {
      primary: { main: "#1976d2" },
    },
  }
  // arEG
);

const store = createStore(reducers, compose(applyMiddleware(thunk)));
ReactDom.render(
  <ThemeProvider theme={theme}>
    <Suspense fallback={<></>}>
      <Provider store={store}>
        <App />
      </Provider>
    </Suspense>
  </ThemeProvider>,
  document.getElementById("root")
);
