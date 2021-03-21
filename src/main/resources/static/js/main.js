'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import App from 'pages/App';
import { Provider } from 'react-redux'
import store from 'redux/store'
import {BrowserRouter as Router} from "react-router-dom";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

Sentry.init({
    dsn: "https://3d018aa1e81b47389f4a3347c9a8e574@o492791.ingest.sentry.io/5560686",
    autoSessionTracking: true,
    integrations: [
        new Integrations.BrowserTracing(),
    ],
    tracesSampleRate: 1.0,
});

Sentry.configureScope(scope =>
    scope.setUser({
        id: profile && profile.id,
        username: profile && profile.name
    })
)

let domContainer = document.querySelector('#react');
ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>, domContainer
);

