import React from 'react';
import ReactDOM from 'react-dom';
import "antd/dist/antd.css";
import './index.css';
import App from '@/layouts/App';
import * as serviceWorker from './serviceWorker';
import store from '@/store'
import 'mobx-react-lite/batchingForReactDom'
import {Provider} from 'mobx-react'

async function init() {
    store.User.login({
        id: '123',
        name: '张三',
    })
    store.Setting.appName = '冰川业务中台'
}

init().then(function () {
    ReactDOM.render(
        <Provider {...store}>
            <App />
        </Provider>,
        document.getElementById('root'),
    )
})
serviceWorker.unregister();
