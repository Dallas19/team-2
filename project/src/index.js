import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ExternalApp from './ExternalApp';
import * as serviceWorker from './serviceWorker';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

ReactDOM.render(
    <Router>
        <div> 
            <Route path='/internal' component={App} />
            <Route path='/external' component={ExternalApp} />
        </div>
    </Router>
,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
