import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store from './store'
import App from './components/app'
import './styles/style.less'

//console.log(store)
const app = (
    <Provider store={store}>
        <App>Loading</App>
    </Provider>
)
ReactDOM.render(app, document.getElementById('root'));
