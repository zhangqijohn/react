import React from 'react';
import ReactDOM from 'react-dom';
import "antd/dist/antd.css";
import './index.css';
import App from '@/layouts/App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
serviceWorker.unregister();