import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from '../components/welcome';
import Login from '../components/login';
import Hello from '../components/hello';
import { App } from '../components/app';

let elem;
if (location.pathname === '/welcome') {
    elem = <Welcome />;
} else {
    elem = <App />;
}

//This is the only place we need to call ReactDom.render
ReactDOM.render(
    <HelloWorld />, //This is the component
    document.querySelector('main') //This is selecting the main element
);

function HelloWorld() {
    return (
        <div>{elem}</div>

    );
}
