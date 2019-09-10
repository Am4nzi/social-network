import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from './welcome';
import App from './app';


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
