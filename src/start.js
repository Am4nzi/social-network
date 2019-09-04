import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from '../components/welcome';


let elem;
if (location.pathname === '/welcome') {
    elem = <Welcome />;
    //if user is on /welcome route, tha tmeans user is NOT logged in.
    //and we should render the Registration route.
} else {
    elem = <p>my logo</p>;
    // if else runs, that means user IS logged in. For now we will just render an image.
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
