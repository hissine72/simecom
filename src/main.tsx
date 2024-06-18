// import React from 'react'
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import Approuter from "./routes/Approuter";
import { Provider } from "react-redux";
import { store, persistor } from "./store/index";

import { PersistGate } from "redux-persist/integration/react";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}></PersistGate>{" "}
    <GoogleOAuthProvider clientId="567754707571-s1gi5ss3h4rbe2bad4tglvs7tc6ojstm.apps.googleusercontent.com">
      {<Approuter />}
    </GoogleOAuthProvider>{" "}
  </Provider>
);
