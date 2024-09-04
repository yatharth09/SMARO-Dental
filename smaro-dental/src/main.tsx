import React from "react"
import {Provider} from "react-redux"
import ReactDOM from "react-dom/client"
import {PersistGate} from "redux-persist/integration/react";

import App from "./App"
import {persistor, store} from "./store/store"

import "./index.css"
import "@fontsource/inter";
import "@fontsource/inter/100.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/700.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <App/>
            </PersistGate>
        </Provider>
    </React.StrictMode>
)
