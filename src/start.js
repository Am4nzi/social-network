import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";
import App from "./app";
import {Provider} from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducer';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(reduxPromise)));

let elem;
if (location.pathname === "/welcome") {
    elem = <Welcome />;
} else {
    elem = (
        <Provider store={store}>
            <App />
        </Provider>
    );
}

ReactDOM.render(
    <HelloWorld />,
    document.querySelector("main") //This selects the main element
);

function HelloWorld() {
    return <div>{elem}</div>;
}
